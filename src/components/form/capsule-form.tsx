// components/capsule-form.tsx
'use client';

import { useState } from 'react';
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

declare global {
  interface Window {
    createLemonSqueezyCheckout?: (options: {
      url: string;
      events?: {
        onPaymentSuccess?: () => void;
      };
    }) => void;
  }
}

export function CapsuleForm() {
  const { user } = useUser();
  const currentUser = user?._id;

  // ==========================================
  // STATE
  // ==========================================

  const [audience, setAudience] = useState<'self' | 'someone_else'>('self');
  const [visibility, setVisibility] = useState<'private' | 'public_anonymous'>('private');
  const [authorName, setAuthorName] = useState('');
  const [content, setContent] = useState('');
  const [email, setEmail] = useState('');
  const [duration, setDuration] = useState('1_year');
  const [customDate, setCustomDate] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

  // পেমেন্ট স্টেট
  const [isPaid, setIsPaid] = useState(false);

  const [isSealing, setIsSealing] = useState(false);
  const [isSealed, setIsSealed] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { sealLetter } = useSealLetter();

  // ==========================================
  // LOGIC: কাস্টম ও প্রিসেট মিলিয়ে ২ বছরের বেশি কি না যাচাই
  // ==========================================
  const isOverTwoYears = (): boolean => {
    if (duration === '3_years' || duration === '5_years' || duration === '10_years') {
      return true;
    }

    if (duration === 'custom' && customDate) {
      const selectedTime = new Date(`${customDate}T00:00:00.000Z`).getTime();
      const twoYearsInMs = 2 * 365.25 * 24 * 60 * 60 * 1000;
      const twoYearsFromNow = Date.now() + twoYearsInMs;

      return selectedTime > twoYearsFromNow;
    }

    return false;
  };

  const requiresPayment = isOverTwoYears();

  // ==========================================
  // FORM VALIDATION
  // ==========================================

  const isDateValid =
    duration !== 'custom' || customDate.trim().length > 0;

  // ইনপুট ভ্যালিডেশন (পেমেন্ট সাবমিট বাটনের ক্লিকে ট্রিগার হবে)
  const isFormValid =
    content.trim().length > 0 &&
    email.trim().length > 0 &&
    isDateValid;

  // ==========================================
  // SEAL EXECUTION (COMPRESSION + UPLOAD + DB)
  // ==========================================

  const executeSealingProcess = async () => {
    setIsSealing(true);
    setErrorMessage(null);

    try {
      // 1. COMPRESS IMAGES IN BROWSER
      const compressionOptions = {
        maxSizeMB: 0.4,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      const preparedFiles = await Promise.all(
        attachedFiles.map(async (file) => {
          if (file.type.startsWith('image/')) {
            try {
              const compressedBlob = await imageCompression(file, compressionOptions);
              return new File([compressedBlob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              });
            } catch (err) {
              console.warn('Image compression fallback:', err);
              return file;
            }
          }
          return file;
        })
      );

      // 2. UPLOAD & CATEGORIZE FILES
      const images: string[] = [];
      const audio: string[] = [];
      const videos: string[] = [];
      const files: string[] = [];

      if (preparedFiles.length > 0) {
        const uploadRes = await uploadFiles('letterAttachment', {
          files: preparedFiles,
        });

        uploadRes.forEach((uploaded: { url: string }, index: number) => {
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
        });
      }

      // 3. ENCRYPT LETTER CONTENT
      const encryptionKey =
        visibility === 'public_anonymous'
          ? PUBLIC_VAULT_KEY
          : email.trim();

      const encryptedBase64 = await encryptLetterContent(
        content,
        encryptionKey
      );

      // 4. CALCULATE DELIVERY DATE
      let deliverAt: string;

      if (duration === 'custom') {
        const target = new Date(customDate);
        const now = new Date();
        target.setHours(now.getHours(), now.getMinutes(), now.getSeconds());
        deliverAt = target.toISOString();
      } else {
        deliverAt = calculateDeliveryDate(duration);
      }

      // 5. SUBMIT TO BACKEND
      const saveSealLetter = await sealLetter({
        userId: currentUser,
        recipientEmail: email.trim(),
        encryptedContent: encryptedBase64,
        deliverAt,
        audience,
        visibility,
        authorName: authorName.trim() || 'Anonymous',
        images,
        audio,
        videos,
        files,
      });

      console.log('Letter Sealed Successfully:', saveSealLetter);

      // 6. SHOW SUCCESS CARD
      setTimeout(() => {
        setIsSealing(false);
        setIsSealed(true);
      }, 1200);

    } catch (error: any) {
      console.error('Failed to seal capsule:', error);
      setErrorMessage(
        error?.message || 'Error uploading files or connecting to vault.'
      );
      setIsSealing(false);
    }
  };

  // ==========================================
  // FORM SUBMIT HANDLER (PAYMENT CHECK)
  // ==========================================

  const handleSeal = async () => {
    if (!isFormValid || isSealing) return;

    // যদি ২ বছরের বেশি মেয়াদ হয় এবং পেমেন্ট না করা থাকে
    if (requiresPayment && !isPaid) {
      const checkoutUrl = 'https://unseal.lemonsqueezy.com/checkout/buy/18fdd167-2832-4644-bfa4-84e386db32fe?embed=1';

      if (typeof window !== 'undefined' && window.createLemonSqueezyCheckout) {
        window.createLemonSqueezyCheckout({
          url: checkoutUrl,
          events: {
            onPaymentSuccess: async () => {
              setIsPaid(true);
              await executeSealingProcess();
            },
          },
        });
      } else {
        // ফলব্যাক: নতুন উইন্ডোতে পেমেন্ট ওপেন
        window.open(checkoutUrl.replace('?embed=1', ''), '_blank');
      }
      return;
    }

    // ফ্রি হলে সরাসরি সিল হবে
    await executeSealingProcess();
  };

  // ==========================================
  // RESET FORM
  // ==========================================

  const resetForm = () => {
    setIsSealed(false);
    setContent('');
    setAuthorName('');
    setEmail('');
    setCustomDate('');
    setAttachedFiles([]);
    setErrorMessage(null);
    setIsPaid(false);

    setAudience('self');
    setVisibility('private');
    setDuration('1_year');
  };

  // ==========================================
  // SUCCESS CARD
  // ==========================================

  if (isSealed) {
    return (
      <div className="w-full">
        <SuccessCard
          email={email}
          filesCount={attachedFiles.length}
          onReset={resetForm}
        />
      </div>
    );
  }

  // ==========================================
  // MAIN FORM
  // ==========================================

  return (
    <div
      className={`relative w-full rounded-2xl border border-white/10 bg-[#0c0d12]/70 backdrop-blur-xl shadow-2xl shadow-black/90 ring-1 ring-red-500/10 overflow-hidden transition-all duration-500 ${isSealing
          ? 'h-96 p-4 flex items-center justify-center'
          : 'p-4 sm:p-5 space-y-4'
        }`}
    >
      {/* SEALING OVERLAY */}
      <SealingOverlay isVisible={isSealing} />

      {/* FORM CONTENT */}
      <div className={isSealing ? 'hidden' : 'space-y-5'}>
        {/* ERROR MESSAGE */}
        <CapsuleError message={errorMessage} />

        {/* AUDIENCE SWITCHER */}
        <AudienceSwitcher
          audience={audience}
          onChange={setAudience}
        />

        {/* REUSABLE FORM */}
        <ReusableForm onSubmit={handleSeal} className="space-y-4">
          {/* LETTER COMPOSER */}
          <LetterComposer
            content={content}
            setContent={setContent}
            audience={audience}
          />

          {/* DELIVERY SETTINGS */}
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

          {/* FILE UPLOADER */}
          <MediaUploader
            attachedFiles={attachedFiles}
            onFilesChange={setAttachedFiles}
            isLongTerm={requiresPayment}
          />

          {/* PRIVACY SETTING */}
          <PrivacySetting
            visibility={visibility}
            authorName={authorName}
            onVisibilityChange={setVisibility}
            onAuthorNameChange={setAuthorName}
          />

          {/* ২ বছরের বেশি হলে ইনফরমেশন নোটিশ */}
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
                  Long-term automated scheduling requires a one-time maintenance pass ($2.99), charged during sealing.
                </p>
              </div>
            </div>
          )}

          {/* SEAL BUTTON */}
          <div onClick={() => !isSealing && handleSeal()}>
            <SealButton
              disabled={isSealing}
              isValid={isFormValid}
            />
          </div>
        </ReusableForm>
      </div>
    </div>
  );
}