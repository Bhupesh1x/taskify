"use client";

import { toast } from "sonner";
import { X } from "lucide-react";
import { ElementRef, useRef } from "react";
import { useRouter } from "next/navigation";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { useProModal } from "@/hooks/use-pro-modal";
import { createBoard } from "@/actions/create-board";

import FormPicker from "./FormPicker";
import { FormInput } from "./FormInput";
import { FormSubmit } from "./FormSubmit";

type Props = {
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
  align?: "start" | "center" | "end";
};

function FormPopover({
  children,
  align,
  side = "bottom",
  sideOffset = 0,
}: Props) {
  const router = useRouter();
  const closeRef = useRef<ElementRef<"button">>(null);

  const { onOpen } = useProModal();

  const { execute, fieldError } = useAction(createBoard, {
    onSuccess: (data) => {
      toast.success("Board created!");
      closeRef?.current?.click();
      router.push(`/board/${data.id}`);
    },
    onError: (error) => {
      toast.error(error);
      onOpen();
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;

    execute({ title, image });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        className="w-80 pt-3"
        align={align}
        side={side}
        sideOffset={sideOffset}
      >
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Create Board
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="h-auto w-auto absolute top-2 right-2 p-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>

        <form action={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <FormPicker id="image" errors={fieldError} />
            <FormInput
              id="title"
              label="Board Title"
              type="text"
              errors={fieldError}
            />
          </div>
          <FormSubmit className="w-full">Create</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
}

export default FormPopover;
