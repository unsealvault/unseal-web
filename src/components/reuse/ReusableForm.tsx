"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { ReactNode } from "react";

interface formConfig {
  defaultValues?: Record<string, any>;
  resolver?: any;
}

interface IProps extends formConfig {
  children: ReactNode;
  onSubmit: SubmitHandler<any>;
}

const ReusableForm = ({
  children,
  onSubmit,
  defaultValues,
  resolver,
}: IProps) => {
  const methods = useForm({
    defaultValues,
    resolver,
  });



  const submitHandler = methods.handleSubmit(
  (data) => {
    console.log("✅ Valid data:", data);
    onSubmit(data);
  },
  (errors) => {
    console.error("❌ Validation errors:", errors);
  }
);

  return (
    <FormProvider {...methods}>
      <form className="space-y-5" onSubmit={submitHandler}>

        {children}
      </form>
    </FormProvider>
  );
};

export default ReusableForm;
