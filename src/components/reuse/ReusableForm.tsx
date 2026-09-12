'use client';

import React from 'react';
import {
  useForm,
  FormProvider,
  SubmitHandler,
  FieldValues,
  UseFormProps,
} from 'react-hook-form';

interface ReusableFormProps<T extends FieldValues> extends UseFormProps<T> {
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
  className?: string;
}

export default function ReusableForm<T extends FieldValues>({
  onSubmit,
  children,
  className,
  ...formConfig
}: ReusableFormProps<T>) {
  const methods = useForm<T>(formConfig);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </FormProvider>
  );
}