'use client';

import { Heart, User } from 'lucide-react';

interface AudienceSwitcherProps {
  audience: 'self' | 'someone_else';
  onChange: (value: 'self' | 'someone_else') => void;
}

export function AudienceSwitcher({
  audience,
  onChange,
}: AudienceSwitcherProps) {
  return (
    <div className="flex p-1 bg-white/5 rounded-lg border border-white/10">
      <button
        type="button"
        onClick={() => onChange('self')}
        className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-md transition-all cursor-pointer ${
          audience === 'self'
            ? 'bg-white/10 text-white shadow-xs'
            : 'text-white/50 hover:text-white'
        }`}
      >
        <User
          className={`w-3.5 h-3.5 ${
            audience === 'self' ? 'text-red-500' : ''
          }`}
        />
        <span>To Future Self</span>
      </button>

      <button
        type="button"
        onClick={() => onChange('someone_else')}
        className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-md transition-all cursor-pointer ${
          audience === 'someone_else'
            ? 'bg-white/10 text-white shadow-xs'
            : 'text-white/50 hover:text-white'
        }`}
      >
        <Heart
          className={`w-3.5 h-3.5 ${
            audience === 'someone_else'
              ? 'text-red-500 fill-red-500/20'
              : 'text-white/50'
          }`}
        />
        <span>To Someone Else</span>
      </button>
    </div>
  );
}