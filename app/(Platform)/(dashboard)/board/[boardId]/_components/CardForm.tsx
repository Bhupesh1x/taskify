"use client";

import { toast } from "sonner";
import { Plus, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { useRef, forwardRef, ElementRef, KeyboardEventHandler } from "react";

import { useAction } from "@/hooks/use-action";
import { createCard } from "@/actions/create-card";

import { Button } from "@/components/ui/button";
import { FormSubmit } from "@/components/Form/FormSubmit";
import FormTextArea from "@/components/Form/FormTextArea";

type Props = {
  listId: string;
  isEditing: boolean;
  enableEditing: () => void;
  disableEditing: () => void;
};

const CardForm = forwardRef<HTMLTextAreaElement, Props>(
  ({ listId, isEditing, enableEditing, disableEditing }, ref) => {
    const params = useParams();
    const formRef = useRef<ElementRef<"form">>(null);

    const { execute, fieldError } = useAction(createCard, {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" created`);
        formRef.current?.reset();
      },
      onError: (error) => {
        toast.error(error);
      },
    });

    const onkeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        disableEditing();
      }
    };

    useOnClickOutside(formRef, disableEditing);
    useEventListener("keydown", onkeyDown);

    const onTextAreaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
      e
    ) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };

    const onSubmit = (formData: FormData) => {
      const title = formData.get("title") as string;
      const boardId = params.boardId as string;

      execute({ title, listId, boardId });
    };

    if (isEditing) {
      return (
        <form
          ref={formRef}
          action={onSubmit}
          className="m-1 py-0.5 px-1 space-y-4"
        >
          <FormTextArea
            id="title"
            onKeyDown={onTextAreaKeyDown}
            ref={ref}
            placeholder="Enter a title for this card..."
            errors={fieldError}
          />
          <div className="flex items-center gap-x-2">
            <FormSubmit>Add card</FormSubmit>
            <Button size="sm" variant="ghost" onClick={disableEditing}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </form>
      );
    }

    return (
      <div className="pt-2 px-2">
        <Button
          onClick={enableEditing}
          className="w-full h-auto px-2 py-1.5 justify-start text-muted-foreground text-sm"
          variant="ghost"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add a card
        </Button>
      </div>
    );
  }
);

export default CardForm;

CardForm.displayName = "CardForm";
