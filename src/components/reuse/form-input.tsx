'use client';

import React, { useState, forwardRef } from 'react';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';

export interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  containerClassName?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      name,
      label,
      error,
      icon,
      type = 'text',
      className,
      containerClassName,
      id,
      required,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const formContext = useFormContext();
    
    // react-hook-form থাকলে অটোমেটিক রেজিস্টার হবে
    const registerProps = formContext?.register(name);
    const fieldError = formContext?.formState?.errors[name]?.message as string | undefined;
    const displayError = error || fieldError;

    const inputId = id || name || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const isPassword = type === 'password';

    return (
      <div className={cn('w-full space-y-1.5', containerClassName)}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground"
          >
            {label}
            {required && (
              <span className="text-[#991b1b] dark:text-rose-400 ml-1">*</span>
            )}
          </label>
        )}

        {/* Input Field Container */}
        <div className="relative flex items-center">
          <Input
            id={inputId}
            type={isPassword ? (showPassword ? 'text' : 'password') : type}
            required={required}
            className={cn(
              'h-11 w-full rounded-lg bg-background border border-border text-sm placeholder:text-muted-foreground/50 transition-colors',
              'focus-visible:ring-1 focus-visible:ring-[#991b1b] focus-visible:border-[#991b1b]',
              (icon || isPassword) && 'pr-10',
              displayError && 'border-red-500/50 focus-visible:ring-red-500',
              className
            )}
            {...registerProps}
            {...props}
            ref={(e) => {
              if (registerProps?.ref) registerProps.ref(e);
              if (typeof ref === 'function') ref(e);
              else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = e;
            }}
          />

          {/* Password Toggle Button */}
          {isPassword ? (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
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

        {/* Error Message */}
        {displayError && (
          <p className="text-[11px] font-mono text-[#991b1b] dark:text-rose-400">
            {displayError}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';