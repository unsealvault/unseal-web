'use client';

import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SealButtonProps {
  disabled: boolean;
  isValid: boolean;
}

export function SealButton({
  disabled,
  isValid,
}: SealButtonProps) {
  return (
    <Button
      type="submit"
      disabled={disabled}
      className={`w-full h-11 text-xs tracking-wider uppercase font-medium rounded-lg transition-all duration-300 ${
        isValid
          ? 'bg-[#9f0f24] hover:bg-[#b5122b] text-white shadow-[0_0_25px_rgba(159,15,36,0.4)] cursor-pointer active:scale-[0.99]'
          : 'bg-white/5 text-white/30 border border-white/10 cursor-not-allowed'
      }`}
    >
      <span className="flex items-center justify-center gap-2">
        <span>Seal This Letter</span>
        <ArrowRight className="w-3.5 h-3.5 text-rose-200" />
      </span>
    </Button>
  );
}