// app/(auth)/sign-in/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Lock, Mail, Sparkles } from 'lucide-react';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isMagicLink, setIsMagicLink] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('Authentication simulated.');
    }, 1200);
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl border border-border/80 bg-card text-card-foreground p-7 sm:p-9 shadow-xl space-y-6">
        {/* Header */}
        <div className="space-y-1.5 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Access Your Vault
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Enter your credentials to manage your encrypted capsules
          </p>
        </div>

        {/* Method Toggle */}
        <div className="flex p-1 bg-muted/60 rounded-lg border border-border/60 text-xs font-medium">
          <button
            type="button"
            onClick={() => setIsMagicLink(false)}
            className={`flex-1 py-1.5 rounded-md transition-all ${
              !isMagicLink ? 'bg-background text-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Password
          </button>
          <button
            type="button"
            onClick={() => setIsMagicLink(true)}
            className={`flex-1 py-1.5 rounded-md transition-all flex items-center justify-center gap-1.5 ${
              isMagicLink ? 'bg-background text-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Sparkles className="w-3 h-3 text-[#991b1b]" />
            <span>Magic Link</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
              Email Address
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

          {!isMagicLink && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                  Vault Key / Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[11px] text-muted-foreground hover:text-[#991b1b] transition-colors"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••••"
                  className="h-10 bg-background border-border text-sm placeholder:text-muted-foreground/60 pr-9 focus-visible:ring-[#991b1b]"
                />
                <Lock className="w-4 h-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading || !email}
            className="w-full h-10 text-xs tracking-wider uppercase font-medium bg-[#991b1b] hover:bg-[#7f1d1d] text-white shadow-md shadow-[#991b1b]/25 transition-all cursor-pointer"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Unlocking...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-1.5">
                <span>{isMagicLink ? 'Send Magic Link' : 'Unlock Vault'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            )}
          </Button>
        </form>

        <div className="text-center text-xs text-muted-foreground">
          Don&apos;t have a vault yet?{' '}
          <Link href="/sign-up" className="text-foreground font-medium hover:text-[#991b1b] underline underline-offset-4">
            Initialize Vault
          </Link>
        </div>
      </div>
    </div>
  );
}