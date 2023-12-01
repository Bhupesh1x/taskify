"use client";

import { FormInput } from "@/components/Form/FormInput";
import { Button } from "@/components/ui/button";
import { ElementRef, useRef, useState } from "react";

type Props = {
  title: string;
};

function BoardTitleForm({ title }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef?.current?.focus();
      inputRef?.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    console.log("i am submitted", title);
  };

  const onBlur = () => {
    formRef?.current?.requestSubmit();
  };

  if (isEditing) {
    return (
      <form ref={formRef} action={onSubmit}>
        <FormInput
          id="title"
          ref={inputRef}
          onBlur={onBlur}
          defaultValue={title}
          className="h-7 text-lg font-bold px-[7px] py-1 border-none focus-visible:ring-transparent focus-visible:outline-none bg-transparent"
        />
      </form>
    );
  }

  return (
    <Button
      onClick={enableEditing}
      variant="transparent"
      className="font-bold text-lg h-auto w-auto px-3 p-1"
    >
      {title}
    </Button>
  );
}

export default BoardTitleForm;
