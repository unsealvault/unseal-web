// components/capsule-form.tsx
'use client';

import { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { LetterComposer } from '@/components/form/letter-composer';
import { SuccessCard } from '@/components/success-card';
import { SealingOverlay } from '@/components/form/sealing-overlay';
import ReusableForm from './reuse/ReusableForm';
import { CapsuleError } from './capsule/capsule-error';
import { SealButton } from './capsule/seal-button';

import {
  encryptLetterContent,
  PUBLIC_VAULT_KEY,
} from '@/lib/crypto';

import { calculateDeliveryDate } from '@/lib/utils';
import { submitSealedLetter } from '@/lib/letter-api';
import { uploadFiles } from '@/lib/uploadthing';
import { AudienceSwitcher } from './form/audience-switcher';
import { PrivacySetting } from './form/privacy-settings';
import { DeliverySettings } from './form/delivery-settings';
import { MediaUploader } from './capsule/media-uploader';

export function CapsuleForm() {
  // ==========================================
  // STATE
  // ==========================================

  const [audience, setAudience] = useState<
    'self' | 'someone_else'
  >('self');

  const [visibility, setVisibility] = useState<
    'private' | 'public_anonymous'
  >('private');

  const [authorName, setAuthorName] = useState('');
  const [content, setContent] = useState('');
  const [email, setEmail] = useState('');
  const [duration, setDuration] = useState('1_year');
  const [customDate, setCustomDate] = useState('');

  const [attachedFiles, setAttachedFiles] = useState<File[]>(
    []
  );

  const [isSealing, setIsSealing] = useState(false);
  const [isSealed, setIsSealed] = useState(false);
  const [errorMessage, setErrorMessage] = useState<
    string | null
  >(null);

  // ==========================================
  // FORM VALIDATION
  // ==========================================

  const isDateValid =
    duration !== 'custom' ||
    customDate.trim().length > 0;

  const isFormValid =
    content.trim().length > 0 &&
    email.trim().length > 0 &&
    isDateValid;

  // ==========================================
  // SEAL LETTER
  // ==========================================

  const handleSeal = async () => {
    if (!isFormValid) {
      return;
    }

    setIsSealing(true);
    setErrorMessage(null);

    try {
      // ======================================
      // 1. UPLOAD & CATEGORIZE FILES
      // ======================================

      const images: string[] = [];
      const audio: string[] = [];
      const videos: string[] = [];
      const files: string[] = [];

      if (attachedFiles.length > 0) {
        const uploadRes = await uploadFiles(
          'letterAttachment',
          {
            files: attachedFiles,
          }
        );

        // আপলোড হওয়া ফাইলগুলোর অরিজিনাল টাইপ মিলিয়ে নির্দিষ্ট ক্যাটাগরিতে ভাগ করা
        uploadRes.forEach((uploaded: { url: string; name?: string }, index: number) => {
          const originalFile = attachedFiles[index];
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

      // ======================================
      // 2. ENCRYPT LETTER CONTENT
      // ======================================

      const encryptionKey =
        visibility === 'public_anonymous'
          ? PUBLIC_VAULT_KEY
          : email.trim();

      const encryptedBase64 =
        await encryptLetterContent(
          content,
          encryptionKey
        );

      // ======================================
      // 3. CALCULATE DELIVERY DATE
      // ======================================

      let deliverAt: string;

      if (duration === 'custom') {
        deliverAt = new Date(
          `${customDate}T00:00:00.000Z`
        ).toISOString();
      } else {
        deliverAt =
          calculateDeliveryDate(duration);
      }

      // ======================================
      // 4. SUBMIT TO BACKEND (DATABASE)
      // ======================================

      const saveSealLetter = await submitSealedLetter({
        recipientEmail: email.trim(),
        encryptedContent: encryptedBase64,
        deliverAt,
        audience,
        visibility,
        authorName: authorName.trim() || 'Anonymous',
        // নতুন ৪টি ক্যাটাগরি ফিল্ড
        images,
        audio,
        videos,
        files,
      });

      console.log('Seal Letter:', saveSealLetter);

      // ======================================
      // 5. SHOW SUCCESS
      // ======================================

      setTimeout(() => {
        setIsSealing(false);
        setIsSealed(true);
      }, 1400);
    } catch (error: any) {
      console.error(
        'Failed to seal capsule:',
        error
      );

      setErrorMessage(
        error?.message ||
        'Error uploading files or connecting to vault.'
      );

      setIsSealing(false);
    }
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

    // Reset options
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

          {/* FILE UPLOADER */}
          <MediaUploader
            attachedFiles={attachedFiles}
            onFilesChange={setAttachedFiles}
          />

          {/* PRIVACY SETTING */}
          <PrivacySetting
            visibility={visibility}
            authorName={authorName}
            onVisibilityChange={setVisibility}
            onAuthorNameChange={setAuthorName}
          />

          {/* DELIVERY SETTINGS */}
          <DeliverySettings
            audience={audience}
            duration={duration}
            email={email}
            customDate={customDate}
            onDurationChange={setDuration}
            onEmailChange={setEmail}
            onCustomDateChange={setCustomDate}
          />

          {/* SEAL BUTTON */}
          <SealButton
            disabled={isSealing || !isFormValid}
            isValid={isFormValid}
          />
        </ReusableForm>
      </div>
    </div>
  );
}