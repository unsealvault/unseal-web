'use client';

import React, { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  label?: string;
  icon?: React.ReactNode;
  containerClassName?: string;
  error?: string;
}

export function FormInput({
  name,
  label,
  icon,
  type = 'text',
  className,
  containerClassName,
  required,
  error: externalError,
  ...props
}: FormInputProps) {
  const formContext = useFormContext();
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  // সঠিকভাবে দুটি প্যারামিটার (fieldProps এবং errorMsg) রিসিভ করার জন্য আপডেট করা হয়েছে
  const renderInput = (fieldProps?: any, errorMsg?: string) => (
    <div className={cn('w-full space-y-1.5', containerClassName)}>
      {label && (
        <label className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
          {label}
          {required && (
            <span className="text-[#991b1b] dark:text-rose-400 ml-1">*</span>
          )}
        </label>
      )}

      <div className="relative flex items-center">
        <Input
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          className={cn(
            'h-10 w-full bg-background border-border text-sm placeholder:text-muted-foreground/60 transition-colors',
            'focus-visible:ring-1 focus-visible:ring-[#991b1b]',
            (icon || isPassword) && 'pr-10',
            errorMsg && 'border-red-500/50 focus-visible:ring-red-500',
            className
          )}
          {...fieldProps}
          {...props}
        />

        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        ) : (
          icon && (
            <div className="absolute right-3 text-muted-foreground pointer-events-none">
              {icon}
            </div>
          )
        )}
      </div>

      {errorMsg && (
        <p className="text-[11px] font-mono text-[#991b1b] dark:text-rose-400">
          {errorMsg}
        </p>
      )}
    </div>
  );

  if (name && formContext) {
    return (
      <Controller
        control={formContext.control}
        name={name}
        render={({ field, fieldState: { error } }) =>
          renderInput(
            {
              ...field,
              value: field.value ?? '',
            },
            error?.message || externalError
          )
        }
      />
    );
  }

  return renderInput(undefined, externalError);
}