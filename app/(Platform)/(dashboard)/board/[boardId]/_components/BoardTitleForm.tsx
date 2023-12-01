"use client";

import { toast } from "sonner";
import { ElementRef, useRef, useState } from "react";

import { useAction } from "@/hooks/use-action";
import { updateBoard } from "@/actions/update-board";

import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/Form/FormInput";

type Props = {
  id: string;
  title: string;
};

function BoardTitleForm({ id, title }: Props) {
  const [boardTitle, setBoardTitle] = useState(title);
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

  const { execute } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast.success(`Board "${data.title}" updated!`);
      setBoardTitle(data.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    execute({ title, id });
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
          defaultValue={boardTitle}
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
      {boardTitle}
    </Button>
  );
}

export default BoardTitleForm;
