'use client';

import { useEffect, useState, useRef } from 'react';
import imageCompression from 'browser-image-compression';
import { Sparkles } from 'lucide-react';

import { LetterComposer } from '@/components/form/letter-composer';
import { SuccessCard } from '@/components/success-card';
import { SealingOverlay } from '@/components/form/sealing-overlay';
import ReusableForm from '../reuse/ReusableForm';
import { CapsuleError } from '../capsule/capsule-error';
import { SealButton } from '../capsule/seal-button';

import {
  encryptLetterContent,
  PUBLIC_VAULT_KEY,
} from '@/lib/crypto';

import { calculateDeliveryDate } from '@/lib/utils';
import { uploadFiles } from '@/lib/uploadthing';

import { AudienceSwitcher } from './audience-switcher';
import { PrivacySetting } from './privacy-settings';
import { DeliverySettings } from './delivery-settings';
import { MediaUploader } from '../capsule/media-uploader';

import { useUser } from '@/providers/user.provider';
import { useSealLetter } from '@/hooks/use-letter';

/* =========================================================
   Lemon Squeezy Types
========================================================= */

declare global {
  interface Window {
    LemonSqueezy?: {
      Url: {
        Open: (url: string) => void;
        Close: () => void;
      };
      Setup: (options?: {
        eventHandler?: (event: {
          event: string;
          data?: any;
        }) => void;
      }) => void;
    };
  }
}

/* =========================================================
   Component
========================================================= */

export function CapsuleForm() {
  const { user } = useUser();
  const currentUser = user?._id;

  /* =========================================================
     STATE
  ========================================================= */

  const [audience, setAudience] = useState<'self' | 'someone_else'>('self');
  const [visibility, setVisibility] = useState<'private' | 'public_anonymous'>('private');
  const [authorName, setAuthorName] = useState('');
  const [content, setContent] = useState('');
  const [email, setEmail] = useState('');
  const [duration, setDuration] = useState('1_year');
  const [customDate, setCustomDate] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

  // Payment state
  const [isPaid, setIsPaid] = useState(false);
  const [isSealing, setIsSealing] = useState(false);
  const [isSealed, setIsSealed] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { sealLetter } = useSealLetter();

  /* =========================================================
     REF: লেটেস্ট স্টেট ধরে রাখার জন্য (Lemon Squeezy ফিক্স)
  ========================================================= */

  const formDataRef = useRef({
    email,
    content,
    audience,
    duration,
    customDate,
    visibility,
    authorName,
    attachedFiles,
    user,
  });

  useEffect(() => {
    formDataRef.current = {
      email,
      content,
      audience,
      duration,
      customDate,
      visibility,
      authorName,
      attachedFiles,
      user,
    };
  }, [
    email,
    content,
    audience,
    duration,
    customDate,
    visibility,
    authorName,
    attachedFiles,
    user,
  ]);

  /* =========================================================
     ইউজার লগইন থাকলে 'self' অডিয়েন্সে ডিফল্ট ইমেইল বসানো
  ========================================================= */

  useEffect(() => {
    if (audience === 'self' && user?.email && !email) {
      setEmail(user.email);
    }
  }, [audience, user?.email, email]);

  /* =========================================================
     LEMON SQUEEZY CHECKOUT URL
  ========================================================= */

  const checkoutUrl =
    'https://unseal.lemonsqueezy.com/checkout/buy/18fdd167-2832-4644-bfa4-84e386db32fe?embed=1';

  /* =========================================================
     CHECK LEMON SQUEEZY SCRIPT
  ========================================================= */

  useEffect(() => {
    const checkLemonSqueezy = () => {
      if (window.LemonSqueezy) {
        console.log('🍋 Lemon Squeezy loaded');
        return true;
      }

      console.warn('⏳ Lemon Squeezy is not loaded yet');
      return false;
    };

    checkLemonSqueezy();
  }, []);

  /* =========================================================
     LEMON SQUEEZY EVENT HANDLER
  ========================================================= */

  useEffect(() => {
    if (!window.LemonSqueezy) {
      console.warn(
        '🍋 Lemon Squeezy is not available when event handler was initialized.',
      );
      return;
    }

    console.log('🍋 Setting up Lemon Squeezy event handler');

    window.LemonSqueezy.Setup({
      eventHandler: async (event) => {
        console.log('🍋 Lemon Squeezy Event:', event);

        /* -----------------------------------------------
           PAYMENT SUCCESS
        ------------------------------------------------ */

        if (event.event === 'Checkout.Success') {
          console.log('✅ Lemon Squeezy payment successful');
          console.log('Payment data:', event.data);

          setIsPaid(true);

          // লেটেস্ট স্টেট সহ সিলিং এক্সিকিউট করা হবে
          await executeSealingProcess();

          if (window.LemonSqueezy?.Url?.Close) {
            window.LemonSqueezy.Url.Close();
          }
        }

        /* -----------------------------------------------
           CHECKOUT CLOSED
        ------------------------------------------------ */

        if (event.event === 'Checkout.Closed') {
          console.log('ℹ️ Lemon Squeezy checkout closed');
        }

        /* -----------------------------------------------
           CHECKOUT ERROR
        ------------------------------------------------ */

        if (event.event === 'Checkout.Error') {
          console.error(
            '❌ Lemon Squeezy checkout error:',
            event.data,
          );

          setErrorMessage(
            'Payment could not be completed. Please try again.',
          );
        }
      },
    });

    return () => {
      console.log('🍋 Lemon Squeezy event handler cleanup');
    };
  }, []);

  /* =========================================================
     LOGIC: CHECK IF DELIVERY DATE IS MORE THAN 2 YEARS
  ========================================================= */

  const isOverTwoYears = (): boolean => {
    if (
      duration === '3_years' ||
      duration === '5_years' ||
      duration === '10_years'
    ) {
      return true;
    }

    if (duration === 'custom' && customDate) {
      const selectedTime = new Date(
        `${customDate}T00:00:00.000Z`,
      ).getTime();

      const twoYearsInMs = 2 * 365.25 * 24 * 60 * 60 * 1000;
      const twoYearsFromNow = Date.now() + twoYearsInMs;

      return selectedTime > twoYearsFromNow;
    }

    return false;
  };

  const requiresPayment = isOverTwoYears();

  /* =========================================================
     FORM VALIDATION
  ========================================================= */

  const effectiveEmail = (email.trim() || (audience === 'self' ? user?.email : '') || '').trim();
  const isDateValid = duration !== 'custom' || customDate.trim().length > 0;

  const isFormValid =
    content.trim().length > 0 &&
    effectiveEmail.length > 0 &&
    isDateValid;

  /* =========================================================
     SEAL EXECUTION
  ========================================================= */

  const executeSealingProcess = async () => {
    console.log('🔐 Starting sealing process...');

    // useRef থেকে লেটেস্ট ডাটা নেওয়া হচ্ছে
    const {
      email: currentEmail,
      content: currentContent,
      audience: currentAudience,
      duration: currentDuration,
      customDate: currentCustomDate,
      visibility: currentVisibility,
      authorName: currentAuthorName,
      attachedFiles: currentFiles,
      user: currentUserData,
    } = formDataRef.current;

    setIsSealing(true);
    setErrorMessage(null);

    try {
      // ইউজার টাইপ করলে সেই ইমেইল অগ্রাধিকার পাবে, খালি থাকলে লগইন ইউজারের ইমেইল যাবে
      const finalEmail = (
        currentEmail.trim() ||
        (currentAudience === 'self' ? currentUserData?.email || '' : '')
      ).trim();

      if (!finalEmail) {
        throw new Error('Recipient email is required.');
      }

      /* -----------------------------------------------
         1. COMPRESS IMAGES
      ------------------------------------------------ */

      console.log('📦 Preparing files...');

      const compressionOptions = {
        maxSizeMB: 0.4,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      const preparedFiles = await Promise.all(
        currentFiles.map(async (file) => {
          if (file.type.startsWith('image/')) {
            try {
              const compressedBlob = await imageCompression(
                file,
                compressionOptions,
              );

              return new File(
                [compressedBlob],
                file.name,
                {
                  type: file.type,
                  lastModified: Date.now(),
                },
              );
            } catch (err) {
              console.warn(
                '⚠️ Image compression fallback:',
                err,
              );

              return file;
            }
          }

          return file;
        }),
      );

      /* -----------------------------------------------
         2. UPLOAD FILES
      ------------------------------------------------ */

      const images: string[] = [];
      const audio: string[] = [];
      const videos: string[] = [];
      const files: string[] = [];

      if (preparedFiles.length > 0) {
        console.log(
          `📤 Uploading ${preparedFiles.length} file(s)...`,
        );

        const uploadRes = await uploadFiles('letterAttachment', {
          files: preparedFiles,
        });

        uploadRes.forEach(
          (uploaded: { url: string }, index: number) => {
            const originalFile = preparedFiles[index];
            const fileType = originalFile?.type || '';

            if (fileType.startsWith('image/')) {
              images.push(uploaded.url);
            } else if (fileType.startsWith('audio/')) {
              audio.push(uploaded.url);
            } else if (fileType.startsWith('video/')) {
              videos.push(uploaded.url);
            } else {
              files.push(uploaded.url);
            }
          },
        );

        console.log('✅ Files uploaded');
      }

      /* -----------------------------------------------
         3. ENCRYPT LETTER
      ------------------------------------------------ */

      console.log('🔐 Encrypting letter...');

      const encryptionKey =
        currentVisibility === 'public_anonymous'
          ? PUBLIC_VAULT_KEY
          : finalEmail;

      const encryptedBase64 = await encryptLetterContent(
        currentContent,
        encryptionKey,
      );

      /* -----------------------------------------------
         4. CALCULATE DELIVERY DATE
      ------------------------------------------------ */

      let deliverAt: string;

      if (currentDuration === 'custom') {
        const target = new Date(currentCustomDate);
        const now = new Date();

        target.setHours(
          now.getHours(),
          now.getMinutes(),
          now.getSeconds(),
        );

        deliverAt = target.toISOString();
      } else {
        deliverAt = calculateDeliveryDate(currentDuration);
      }

      console.log('📅 Delivery date:', deliverAt);

      /* -----------------------------------------------
         5. SAVE TO BACKEND
      ------------------------------------------------ */

      console.log('🚀 SEAL LETTER PAYLOAD:', {
        userId: currentUserData?._id,
        recipientEmail: finalEmail,
        encryptedContentLength: encryptedBase64?.length,
        deliverAt,
        audience: currentAudience,
        visibility: currentVisibility,
        authorName: currentAuthorName.trim() || 'Anonymous',
        images,
        audio,
        videos,
        files,
      });

      const saveSealLetter = await sealLetter({
        userId: currentUserData?._id,
        recipientEmail: finalEmail,
        encryptedContent: encryptedBase64,
        deliverAt,
        audience: currentAudience,
        visibility: currentVisibility,
        authorName: currentAuthorName.trim() || 'Anonymous',
        images,
        audio,
        videos,
        files,
      });

      if (!saveSealLetter) {
        throw new Error('Failed to seal letter on the server.');
      }

      console.log(
        '✅ Letter Sealed Successfully:',
        saveSealLetter,
      );

      /* -----------------------------------------------
         6. SHOW SUCCESS CARD
      ------------------------------------------------ */

      setTimeout(() => {
        setIsSealing(false);
        setIsSealed(true);
      }, 1200);
    } catch (error: any) {
      console.error(
        '❌ Failed to seal capsule:',
        error,
      );

      setErrorMessage(
        error?.message ||
          'Error uploading files or connecting to vault.',
      );

      setIsSealing(false);
    }
  };

  /* =========================================================
     FORM SUBMIT HANDLER
  ========================================================= */

  const handleSeal = async () => {
    console.log('=================================');
    console.log('🔵 SEAL BUTTON CLICKED');
    console.log('=================================');

    console.log('isFormValid:', isFormValid);
    console.log('requiresPayment:', requiresPayment);
    console.log('isPaid:', isPaid);
    console.log('LemonSqueezy:', window.LemonSqueezy);

    if (!isFormValid || isSealing) {
      console.warn(
        '❌ Seal blocked: form invalid or sealing already in progress.',
      );
      return;
    }

    /* =====================================================
       PAYMENT REQUIRED
    ===================================================== */

    if (requiresPayment && !isPaid) {
      console.log('💳 Payment required before sealing.');

      if (
        typeof window === 'undefined' ||
        !window.LemonSqueezy?.Url?.Open
      ) {
        console.error('❌ Lemon Squeezy is not loaded.');

        setErrorMessage(
          'Payment checkout is still loading. Please wait a moment and try again.',
        );
        return;
      }

      console.log('🟢 Opening Lemon Squeezy checkout...');
      console.log('Checkout URL:', checkoutUrl);

      try {
        window.LemonSqueezy.Url.Open(checkoutUrl);
        console.log('✅ Lemon Squeezy checkout open command executed.');
      } catch (error) {
        console.error(
          '❌ Failed to open Lemon Squeezy checkout:',
          error,
        );

        setErrorMessage(
          'Unable to open payment checkout. Please try again.',
        );
      }

      return;
    }

    /* =====================================================
       FREE SEALING
    ===================================================== */

    console.log('🆓 No payment required. Starting sealing...');
    await executeSealingProcess();
  };

  /* =========================================================
     RESET FORM
  ========================================================= */

  const resetForm = () => {
    setIsSealed(false);
    setContent('');
    setAuthorName('');
    setEmail(user?.email || '');
    setCustomDate('');
    setAttachedFiles([]);
    setErrorMessage(null);
    setIsPaid(false);

    setAudience('self');
    setVisibility('private');
    setDuration('1_year');
  };

  /* =========================================================
     SUCCESS CARD
  ========================================================= */

  if (isSealed) {
    return (
      <div className="w-full">
        <SuccessCard
          email={(email.trim() || user?.email || '').trim()}
          filesCount={attachedFiles.length}
          onReset={resetForm}
        />
      </div>
    );
  }

  /* =========================================================
     MAIN FORM
  ========================================================= */

  return (
    <div
      className={`relative w-full rounded-2xl border border-white/10 bg-[#0c0d12]/70 backdrop-blur-xl shadow-2xl shadow-black/90 ring-1 ring-red-500/10 overflow-hidden transition-all duration-500 ${
        isSealing
          ? 'h-96 p-4 flex items-center justify-center'
          : 'p-4 sm:p-5 space-y-4'
      }`}
    >
      {/* SEALING OVERLAY */}
      <SealingOverlay isVisible={isSealing} />

      {/* FORM CONTENT */}
      <div className={isSealing ? 'hidden' : 'space-y-5'}>
        <CapsuleError message={errorMessage} />

        {/* AUDIENCE SWITCHER */}
        <AudienceSwitcher
          audience={audience}
          onChange={(newAudience) => {
            setAudience(newAudience);
            if (newAudience === 'self' && user?.email) {
              setEmail(user.email);
            }
          }}
        />

        <ReusableForm onSubmit={handleSeal} className="space-y-4">
          <LetterComposer
            content={content}
            setContent={setContent}
            audience={audience}
          />

          <DeliverySettings
            audience={audience}
            duration={duration}
            email={email}
            customDate={customDate}
            onDurationChange={(val) => {
              setDuration(val);
              setIsPaid(false);
            }}
            onEmailChange={setEmail}
            onCustomDateChange={(val) => {
              setCustomDate(val);
              setIsPaid(false);
            }}
          />

          <MediaUploader
            attachedFiles={attachedFiles}
            onFilesChange={setAttachedFiles}
            isLongTerm={requiresPayment}
          />

          <PrivacySetting
            visibility={visibility}
            authorName={authorName}
            onVisibilityChange={setVisibility}
            onAuthorNameChange={setAuthorName}
          />

          {requiresPayment && (
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 sm:p-4.5 flex items-start gap-3.5 text-left animate-in fade-in duration-300">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0 mt-0.5">
                <Sparkles className="size-4" />
              </div>

              <div className="space-y-0.5">
                <div className="text-xs font-semibold text-amber-200 font-mono tracking-wide">
                  Extended Vault Storage (2+ Years Milestone)
                </div>

                <p className="text-xs sm:text-[13px] text-amber-300/80 leading-relaxed">
                  Long-term automated scheduling requires a one-time maintenance
                  pass ($2.99), charged during sealing.
                </p>
              </div>
            </div>
          )}

          <div onClick={() => !isSealing && handleSeal()}>
            <SealButton disabled={isSealing} isValid={isFormValid} />
          </div>
        </ReusableForm>
      </div>
    </div>
  );
}