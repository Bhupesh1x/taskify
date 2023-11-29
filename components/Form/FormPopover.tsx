"use client";

import { toast } from "sonner";
import { X } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import { FormInput } from "./FormInput";
import { FormSubmit } from "./FormSubmit";
import { useAction } from "@/hooks/use-action";
import { createBoard } from "@/actions/create-board";

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
  const { execute, fieldError } = useAction(createBoard, {
    onSuccess: (data) => {
      toast.success("Board created!");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    execute({ title });
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
        <PopoverClose asChild>
          <Button
            className="h-auto w-auto absolute top-2 right-2 p-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>

        <form action={onSubmit} className="space-y-4">
          <div className="space-y-4">
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
