// components/capsule-form.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowRight,
  User,
  Heart,
  Lock,
  Globe,
  UserCircle2,
  Calendar,
} from 'lucide-react';
import { LetterComposer } from '@/components/letter-composer';
import { FileUploader } from '@/components/file-uploader';
import { SuccessCard } from '@/components/success-card';
import { SealingOverlay } from '@/components/sealing-overlay';

import { encryptLetterContent, PUBLIC_VAULT_KEY } from '@/lib/crypto';
import { calculateDeliveryDate } from '@/lib/utils';
import { submitSealedLetter } from '@/lib/letter-api';
import { uploadFiles } from '@/lib/uploadthing';
import imageCompression from 'browser-image-compression';

export function CapsuleForm() {
  const [audience, setAudience] = useState<'self' | 'someone_else'>('self');
  const [visibility, setVisibility] = useState<'private' | 'public_anonymous'>('private');
  const [authorName, setAuthorName] = useState('');
  const [content, setContent] = useState('');
  const [email, setEmail] = useState('');
  const [duration, setDuration] = useState('1_year');
  const [customDate, setCustomDate] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [isSealing, setIsSealing] = useState(false);
  const [isSealed, setIsSealed] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isDateValid = duration !== 'custom' || customDate.trim().length > 0;
  const isFormValid = content.trim().length > 0 && email.trim().length > 0 && isDateValid;

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const rawFiles = Array.from(e.target.files);
    if (attachedFiles.length + rawFiles.length > 5) {
      alert('You can attach a maximum of 5 files per letter.');
      return;
    }

    // ইমেজ কম্প্রেশন অপশন
    const options = {
      maxSizeMB: 0.3, // সর্বোচ্চ ৩০০ কিলোবাইটে নামিয়ে আনবে
      maxWidthOrHeight: 1600, // রেটিনা বা ফোনের স্ক্রিনের জন্য পারফেক্ট সাইজ
      useWebWorker: true,
    };


    try {
      const processedFiles = await Promise.all(
        rawFiles.map(async (file) => {
          // শুধু ইমেজ ফাইল হলে দ্রুত কম্প্রেস করবে
          if (file.type.startsWith('image/')) {
            const compressed = await imageCompression(file, options);
            return new File([compressed], file.name, { type: file.type });
          }
          return file; // অডিও বা পিডিএফ হলে যেমন আছে তেমনই থাকবে
        })
      );

      setAttachedFiles((prev) => [...prev, ...processedFiles]);
    } catch (error) {
      console.error('Image compression error:', error);
      setAttachedFiles((prev) => [...prev, ...rawFiles]);
    }
  };

  const removeFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSeal = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSealing(true);
    setErrorMessage(null);

    try {
      // ১. ফাইল থাকলে ক্লাউডে আপলোড করা
      let uploadedMediaUrls: string[] = [];

      if (attachedFiles.length > 0) {
        const uploadRes = await uploadFiles("letterAttachment", {
          files: attachedFiles,
        });
        uploadedMediaUrls = uploadRes.map((f: { url: any; }) => f.url);
      }

      // ২. ব্রাউজারে জিরো-নলেজ AES-GCM-256 এনক্রিপশন
      const encryptionKey =
        visibility === 'public_anonymous' ? PUBLIC_VAULT_KEY : email.trim();
      const encryptedBase64 = await encryptLetterContent(content, encryptionKey);

      // ৩. ডেলিভারি ডেট নির্ধারণ
      let deliverAt: string;
      if (duration === 'custom') {
        deliverAt = new Date(`${customDate}T00:00:00.000Z`).toISOString();
      } else {
        deliverAt = calculateDeliveryDate(duration);
      }

      // ৪. ব্যাকএন্ডে সাবমিট (mediaUrls সহ)
      await submitSealedLetter({
        recipientEmail: email.trim(),
        encryptedContent: encryptedBase64,
        deliverAt,
        audience,
        visibility,
        authorName: authorName.trim() || 'Anonymous',
        mediaUrls: uploadedMediaUrls, // আসল ক্লাউড লিঙ্ক
      });

      setTimeout(() => {
        setIsSealing(false);
        setIsSealed(true);
      }, 1400);

    } catch (error: any) {
      console.error('Failed to seal capsule:', error);
      setErrorMessage(error.message || 'Error uploading files or connecting to vault.');
      setIsSealing(false);
    }
  };

  const resetForm = () => {
    setIsSealed(false);
    setContent('');
    setAuthorName('');
    setEmail('');
    setCustomDate('');
    setAttachedFiles([]);
    setErrorMessage(null);
  };

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

  return (
    <div
      className={`relative w-full rounded-2xl border border-white/10 bg-[#0c0d12]/70 backdrop-blur-xl shadow-2xl shadow-black/90 ring-1 ring-red-500/10 overflow-hidden transition-all duration-500 ${isSealing
          ? 'h-96 p-4 flex items-center justify-center'
          : 'p-6 sm:p-8 space-y-5'
        }`}
    >
      {/* অ্যানিমেশন ওভারলে */}
      <SealingOverlay isVisible={isSealing} />

      {/* সিল হওয়ার সময়ে ফর্ম কন্টেন্ট অদৃশ্য থাকবে যাতে ফ্রেমটি সুন্দরভাবে সংকুচিত হতে পারে */}
      <div className={isSealing ? 'hidden' : 'space-y-5'}>
        {/* Audience Switcher */}
        <div className="flex p-1 bg-white/5 rounded-lg border border-white/10">
          <button
            type="button"
            onClick={() => setAudience('self')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-md transition-all cursor-pointer ${audience === 'self'
                ? 'bg-white/10 text-white shadow-xs'
                : 'text-white/50 hover:text-white'
              }`}
          >
            <User className={`w-3.5 h-3.5 ${audience === 'self' ? 'text-red-500' : ''}`} />
            <span>To Future Self</span>
          </button>
          <button
            type="button"
            onClick={() => setAudience('someone_else')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-md transition-all cursor-pointer ${audience === 'someone_else'
                ? 'bg-white/10 text-white shadow-xs'
                : 'text-white/50 hover:text-white'
              }`}
          >
            <Heart
              className={`w-3.5 h-3.5 ${audience === 'someone_else' ? 'text-red-500 fill-red-500/20' : 'text-white/50'
                }`}
            />
            <span>To Someone Else</span>
          </button>
        </div>

        {errorMessage && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg font-mono">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSeal} className="space-y-4">
          <LetterComposer content={content} setContent={setContent} audience={audience} />

          <FileUploader
            attachedFiles={attachedFiles}
            onFileSelect={handleFileSelect}
            onRemoveFile={removeFile}
          />

          {/* Privacy Setting */}
          <div className="space-y-2">
            <label className="text-[11px] font-mono uppercase tracking-wider text-white/50">
              Privacy Setting
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setVisibility('private')}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg border text-xs font-medium transition-all cursor-pointer ${visibility === 'private'
                    ? 'border-red-600 bg-red-950/30 text-white font-semibold'
                    : 'border-white/10 bg-white/5 text-white/60 hover:text-white'
                  }`}
              >
                <Lock className={`w-3.5 h-3.5 ${visibility === 'private' ? 'text-red-500' : 'text-white/50'}`} />
                <span>Private</span>
              </button>

              <button
                type="button"
                onClick={() => setVisibility('public_anonymous')}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg border text-xs font-medium transition-all cursor-pointer ${visibility === 'public_anonymous'
                    ? 'border-red-600 bg-red-950/30 text-white font-semibold'
                    : 'border-white/10 bg-white/5 text-white/60 hover:text-white'
                  }`}
              >
                <Globe className={`w-3.5 h-3.5 ${visibility === 'public_anonymous' ? 'text-red-500' : 'text-white/50'}`} />
                <span>Public</span>
              </button>
            </div>

            {visibility === 'public_anonymous' && (
              <div className="pt-1.5 space-y-1.5 animate-in fade-in duration-200">
                <div className="relative">
                  <Input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Display Name or Pen Name (blank for Anonymous)"
                    className="h-9 bg-white/5 border-white/10 text-xs text-white placeholder:text-white/40 pr-8"
                  />
                  <UserCircle2 className="w-4 h-4 text-white/40 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            )}
          </div>

          {/* Delivery Duration & Email */}
          <div className="w-full space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full items-start">
              <div className="space-y-1.5 w-full">
                <label className="text-[11px] font-mono uppercase tracking-wider text-white/50 block">
                  Unseal after
                </label>
                <Select
                  value={duration}
                  onValueChange={(value) => {
                    if (value) setDuration(value);
                  }}
                >
                  <SelectTrigger
                    style={{ height: '44px' }}
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-3 text-xs text-white flex items-center justify-between box-border focus:ring-1 focus:ring-[#991b1b] focus:border-[#991b1b]"
                  >
                    <SelectValue placeholder="When should this open?" />
                  </SelectTrigger>
                  <SelectContent className="max-h-64 bg-[#0c0d12] border-white/10 text-white text-xs py-1 z-50">
                    <SelectItem value="6_months" className="cursor-pointer py-2.5">
                      <span className="font-medium">6 Months</span>
                      <span className="text-white/40 ml-2 font-mono text-[10px]">— Mid-Year Reflection</span>
                    </SelectItem>
                    <SelectItem value="1_year" className="cursor-pointer py-2.5">
                      <span className="font-medium">1 Year</span>
                      <span className="text-rose-400/80 ml-2 font-mono text-[10px]">— Next Year's Self</span>
                    </SelectItem>
                    <SelectItem value="3_years" className="cursor-pointer py-2.5">
                      <span className="font-medium">3 Years</span>
                      <span className="text-white/40 ml-2 font-mono text-[10px]">— Career & Growth</span>
                    </SelectItem>
                    <SelectItem value="5_years" className="cursor-pointer py-2.5">
                      <span className="font-medium">5 Years</span>
                      <span className="text-white/40 ml-2 font-mono text-[10px]">— Long-term Capsule</span>
                    </SelectItem>
                    <SelectItem value="custom" className="cursor-pointer py-2.5">
                      <span className="font-medium">Specific Date</span>
                      <span className="text-rose-400/80 ml-2 font-mono text-[10px]">— Pick calendar date</span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5 w-full">
                <label className="text-[11px] font-mono uppercase tracking-wider text-white/50 block">
                  {audience === 'self' ? 'Your Future Email' : 'Recipient Email'}
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder={audience === 'self' ? 'your.email@address.com' : 'recipient.email@address.com'}
                  style={{ height: '44px' }}
                  className="w-full rounded-lg bg-white/5 border border-white/10 px-3 text-xs text-white placeholder:text-white/40 box-border focus-visible:ring-1 focus-visible:ring-[#991b1b] focus-visible:border-[#991b1b]"
                />
              </div>
            </div>

            {duration === 'custom' && (
              <div className="w-full space-y-1.5 pt-1 animate-in fade-in-50 duration-200">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Target Unseal Date</span>
                  </label>
                  <span className="text-[10px] font-mono text-white/40">Must be a future date</span>
                </div>
                <Input
                  type="date"
                  required
                  min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                  value={customDate}
                  onChange={(e) => setCustomDate(e.target.value)}
                  style={{ height: '44px' }}
                  className="w-full rounded-lg bg-white/5 border border-rose-900/40 focus-visible:border-rose-500/50 text-xs text-white cursor-pointer px-3 box-border scheme-dark"
                />
              </div>
            )}
          </div>

          {/* বাটন */}
          <Button
            type="submit"
            disabled={isSealing || !isFormValid}
            className={`w-full h-11 text-xs tracking-wider uppercase font-medium rounded-lg transition-all duration-300 ${isFormValid
                ? 'bg-[#9f0f24] hover:bg-[#b5122b] text-white shadow-[0_0_25px_rgba(159,15,36,0.4)] cursor-pointer active:scale-[0.99]'
                : 'bg-white/5 text-white/30 border border-white/10 cursor-not-allowed'
              }`}
          >
            <span className="flex items-center justify-center gap-2">
              <span>Seal This Letter</span>
              <ArrowRight className="w-3.5 h-3.5 text-rose-200" />
            </span>
          </Button>
        </form>
      </div>
    </div>
  );
}