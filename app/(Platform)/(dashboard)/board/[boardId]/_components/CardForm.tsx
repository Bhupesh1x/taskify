"use client";

import { forwardRef } from "react";
import { Plus, X } from "lucide-react";

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
    if (isEditing) {
      return (
        <form className="m-1 py-0.5 px-1 space-y-4">
          <FormTextArea
            id="title"
            onKeyDown={() => {}}
            ref={ref}
            placeholder="Enter a title for this card..."
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
