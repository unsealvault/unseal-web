// app/(auth)/sign-up/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Lock, Mail, ShieldCheck } from 'lucide-react';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('Vault account initialized.');
    }, 1200);
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl border border-border/80 bg-card text-card-foreground p-7 sm:p-9 shadow-xl space-y-6">
        {/* Header */}
        <div className="space-y-1.5 text-center">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-[#991b1b]/20 bg-[#991b1b]/5 text-[10px] font-mono text-[#991b1b] dark:text-rose-400 mb-2">
            <ShieldCheck className="w-3 h-3" />
            <span>End-to-End Encrypted</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Initialize Your Vault
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Create an encrypted account to safeguard your future letters
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
              Primary Email
            </label>
            <div className="relative">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="name@domain.com"
                className="h-10 bg-background border-border text-sm placeholder:text-muted-foreground/60 pr-9 focus-visible:ring-[#991b1b]"
              />
              <Mail className="w-4 h-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
              Master Password
            </label>
            <div className="relative">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Minimum 8 characters"
                className="h-10 bg-background border-border text-sm placeholder:text-muted-foreground/60 pr-9 focus-visible:ring-[#991b1b]"
              />
              <Lock className="w-4 h-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
              Confirm Password
            </label>
            <div className="relative">
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Repeat password"
                className="h-10 bg-background border-border text-sm placeholder:text-muted-foreground/60 pr-9 focus-visible:ring-[#991b1b]"
              />
              <Lock className="w-4 h-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <p className="text-[11px] text-muted-foreground leading-relaxed">
            By creating a vault, you agree that forgotten master keys cannot be recovered by our team due to zero-knowledge encryption.
          </p>

          <Button
            type="submit"
            disabled={isLoading || !email || !password}
            className="w-full h-10 text-xs tracking-wider uppercase font-medium bg-[#991b1b] hover:bg-[#7f1d1d] text-white shadow-md shadow-[#991b1b]/25 transition-all cursor-pointer"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Generating Keys...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-1.5">
                <span>Create Vault</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            )}
          </Button>
        </form>

        <div className="text-center text-xs text-muted-foreground">
          Already have a vault?{' '}
          <Link href="/sign-in" className="text-foreground font-medium hover:text-[#991b1b] underline underline-offset-4">
            Access Vault
          </Link>
        </div>
      </div>
    </div>
  );
}