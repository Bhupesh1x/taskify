"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

type Props = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "primary";
};

export const FormSubmit = ({
  children,
  className,
  disabled,
  variant = "primary",
}: Props) => {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending || disabled}
      type="submit"
      className={className}
      size="sm"
      variant={variant}
    >
      {children}
    </Button>
  );
};
