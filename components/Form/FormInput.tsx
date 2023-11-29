"use client";

import { forwardRef } from "react";
import { useFormStatus } from "react-dom";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import FormErrors from "./FormErrors";

type Props = {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  defaultValue?: string;
  onBlur?: () => void;
};

export const FormInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      id,
      label,
      type,
      placeholder,
      required,
      disabled,
      errors,
      className,
      defaultValue = "",
      onBlur,
    },
    ref
  ) => {
    const { pending } = useFormStatus();

    return (
      <div className="space-y-2">
        <div className="space-y-1">
          {label ? (
            <Label
              htmlFor={id}
              className="text-xs font-semibold text-neutral-700"
            >
              Label
            </Label>
          ) : null}
          <Input
            type={type}
            defaultValue={defaultValue}
            onBlur={onBlur}
            placeholder={placeholder}
            ref={ref}
            required={required}
            disabled={pending || disabled}
            id={id}
            name={id}
            className={`text-sm py-1 px-2 h-7 ${className}`}
            aria-describedby={`${id}-error`}
          />
          <FormErrors id={id} errors={errors} />
        </div>
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
