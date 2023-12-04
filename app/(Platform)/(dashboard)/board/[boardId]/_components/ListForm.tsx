"use client";

import { toast } from "sonner";
import { Plus, X } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

import { useAction } from "@/hooks/use-action";
import { createList } from "@/actions/create-list";

import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/Form/FormInput";
import { FormSubmit } from "@/components/Form/FormSubmit";

import ListWrapper from "./ListWrapper";

function ListForm() {
  const params = useParams();
  const router = useRouter();

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const { execute, fieldError } = useAction(createList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" created.`);
      setIsEditing(false);
      router.refresh();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = params.boardId as string;

    execute({ title, boardId });
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          action={onSubmit}
          ref={formRef}
          className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
        >
          <FormInput
            ref={inputRef}
            id="title"
            placeholder="Enter list title..."
            className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"
            errors={fieldError}
          />
          <div className="flex items-center gap-x-2">
            <FormSubmit>Add List</FormSubmit>
            <Button
              onClick={disableEditing}
              className="cursor-pointer"
              variant="ghost"
              size="sm"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className="w-full rounded-md bg-white/80 hover:bg-white/50 flex items-center p-3 gap-x-2 text-sm font-medium transition"
      >
        <Plus className="h-4 w-4" />
        Add a list
      </button>
    </ListWrapper>
  );
}

export default ListForm;
