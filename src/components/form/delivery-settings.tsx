'use client';

import { Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DeliverySettingsProps {
  audience: 'self' | 'someone_else';
  duration: string;
  email: string;
  customDate: string;
  onDurationChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onCustomDateChange: (value: string) => void;
}

export function DeliverySettings({
  audience,
  duration,
  email,
  customDate,
  onDurationChange,
  onEmailChange,
  onCustomDateChange,
}: DeliverySettingsProps) {
  return (
    <div className="w-full space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full items-start">
        {/* Duration */}
        <div className="space-y-1.5 w-full">
          <label className="text-[11px] font-mono uppercase tracking-wider text-white/50 block">
            Unseal after
          </label>

          <Select value={duration} onValueChange={onDurationChange}>
            <SelectTrigger
              style={{ height: '44px' }}
              className="w-full rounded-lg bg-white/5 border border-white/10 px-3 text-xs text-white flex items-center justify-between box-border focus:ring-1 focus:ring-[#991b1b] focus:border-[#991b1b]"
            >
              <SelectValue placeholder="When should this open?" />
            </SelectTrigger>

            <SelectContent className="max-h-64 bg-[#0c0d12] border-white/10 text-white text-xs py-1 z-50">
              <SelectItem
                value="6_months"
                className="cursor-pointer py-2.5"
              >
                <span className="font-medium">6 Months</span>
                <span className="text-white/40 ml-2 font-mono text-[10px]">
                  — Mid-Year Reflection
                </span>
              </SelectItem>

              <SelectItem
                value="1_year"
                className="cursor-pointer py-2.5"
              >
                <span className="font-medium">1 Year</span>
                <span className="text-rose-400/80 ml-2 font-mono text-[10px]">
                  — Next Year's Self
                </span>
              </SelectItem>

              <SelectItem
                value="3_years"
                className="cursor-pointer py-2.5"
              >
                <span className="font-medium">3 Years</span>
                <span className="text-white/40 ml-2 font-mono text-[10px]">
                  — Career & Growth
                </span>
              </SelectItem>

              <SelectItem
                value="5_years"
                className="cursor-pointer py-2.5"
              >
                <span className="font-medium">5 Years</span>
                <span className="text-white/40 ml-2 font-mono text-[10px]">
                  — Long-term Capsule
                </span>
              </SelectItem>

              <SelectItem
                value="custom"
                className="cursor-pointer py-2.5"
              >
                <span className="font-medium">Specific Date</span>
                <span className="text-rose-400/80 ml-2 font-mono text-[10px]">
                  — Pick calendar date
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Email */}
        <div className="space-y-1.5 w-full">
          <label className="text-[11px] font-mono uppercase tracking-wider text-white/50 block">
            {audience === 'self'
              ? 'Your Future Email'
              : 'Recipient Email'}
          </label>

          <Input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            required
            placeholder={
              audience === 'self'
                ? 'your.email@address.com'
                : 'recipient.email@address.com'
            }
            style={{ height: '44px' }}
            className="w-full rounded-lg bg-white/5 border border-white/10 px-3 text-xs text-white placeholder:text-white/40 box-border focus-visible:ring-1 focus-visible:ring-[#991b1b] focus-visible:border-[#991b1b]"
          />
        </div>
      </div>

      {/* Custom Date */}
      {duration === 'custom' && (
        <div className="w-full space-y-1.5 pt-1 animate-in fade-in-50 duration-200">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-mono uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>Target Unseal Date</span>
            </label>

            <span className="text-[10px] font-mono text-white/40">
              Must be a future date
            </span>
          </div>

          <Input
            type="date"
            required
            min={
              new Date(Date.now() + 86400000)
                .toISOString()
                .split('T')[0]
            }
            value={customDate}
            onChange={(e) => onCustomDateChange(e.target.value)}
            style={{ height: '44px' }}
            className="w-full rounded-lg bg-white/5 border border-rose-900/40 focus-visible:border-rose-500/50 text-xs text-white cursor-pointer px-3 box-border scheme-dark"
          />
        </div>
      )}
    </div>
  );
}