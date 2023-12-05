"use client";

import { useFormStatus } from "react-dom";
import { KeyboardEventHandler, forwardRef } from "react";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import FormErrors from "./FormErrors";

type Props = {
  id: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  errors?: Record<string, string[] | undefined>;
  defaultValue?: string;
  onBlur?: () => void;
  onClick?: () => void;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined;
};

const FormTextArea = forwardRef<HTMLTextAreaElement, Props>(
  (
    {
      id,
      className,
      defaultValue,
      disabled,
      errors,
      label,
      onBlur,
      onClick,
      onKeyDown,
      placeholder,
      required,
    },
    ref
  ) => {
    const { pending } = useFormStatus();

    return (
      <div className="space-y-2 w-full">
        <div className="space-y-1 w-full">
          {label ? <Label>{label}</Label> : null}
          <Textarea
            id={id}
            name={id}
            ref={ref}
            defaultValue={defaultValue}
            required={required}
            disabled={disabled || pending}
            onBlur={onBlur}
            onClick={onClick}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            className={`resize-none focus-visible:ring-0 ring-0 focus-visible:ring-offset-0 outline-none shadow-sm ${className}`}
            aria-describedby={`${id}-errors`}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    );
  }
);

export default FormTextArea;

FormTextArea.displayName = "FormTextArea";
