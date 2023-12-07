"use client";

import { toast } from "sonner";
import { AlignLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { useOnClickOutside } from "usehooks-ts";
import { useState, useRef, ElementRef } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { CardWithList } from "@/types";
import { useAction } from "@/hooks/use-action";
import { updateCard } from "@/actions/update-card";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FormSubmit } from "@/components/Form/FormSubmit";
import FormTextArea from "@/components/Form/FormTextArea";

type Props = {
  card: CardWithList;
};

function Description({ card }: Props) {
  const formRef = useRef<ElementRef<"form">>(null);
  const textareaRef = useRef<ElementRef<"textarea">>(null);

  const params = useParams();
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);

    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  useOnClickOutside(formRef, disableEditing);

  const { execute, fieldError } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", card.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["card-logs", card.id],
      });

      toast.success(`Card "${data.title}" updated`);
      disableEditing();
    },
  });

  const onSubmit = (formData: FormData) => {
    const description = formData.get("description") as string;
    const boardId = params.boardId as string;

    if (description === card.description) return disableEditing();

    execute({ id: card.id, boardId, description });
  };

  return (
    <div className="flex items-start gap-x-3 w-full">
      <AlignLeft className="h-5 w-5 text-neutral-600 mt-0.5" />
      <div className="w-full">
        <p className="font-semibold text-neutral-700 mb-2">Description</p>
        {isEditing ? (
          <form action={onSubmit} ref={formRef} className="space-y-2">
            <FormTextArea
              id="description"
              ref={textareaRef}
              defaultValue={card.description || undefined}
              className="w-full mt-2"
              placeholder="Add a more detailed description..."
              errors={fieldError}
            />
            <div className="flex items-center gap-x-2">
              <FormSubmit>Save</FormSubmit>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={disableEditing}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div
            role="button"
            className="min-h-[78px] w-full bg-neutral-200 rounded-md py-3 px-3.5 text-sm font-medium"
            onClick={enableEditing}
          >
            {card.description || "Add a more detailed description..."}
          </div>
        )}
      </div>
    </div>
  );
}

export default Description;

Description.Skeleton = function DescriptionSkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="h-6 w-24 mb-2 bg-neutral-200" />
        <Skeleton className="h-[78px] w-full bg-neutral-200" />
      </div>
    </div>
  );
};
