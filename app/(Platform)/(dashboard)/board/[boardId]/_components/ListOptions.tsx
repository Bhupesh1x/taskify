"use client";

import { MoreHorizontal, X } from "lucide-react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FormSubmit } from "@/components/Form/FormSubmit";

type Props = {
  id: string;
  boardId: string;
  onAddCard: () => void;
};

function ListOptions({ id, boardId, onAddCard }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="p-2 h-auto w-auto" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="py-3 px-0" side="bottom" align="start">
        <p className="text-sm font-medium text-neutral-600 text-center pb-4">
          List Actions
        </p>
        <PopoverClose asChild>
          <Button
            className="absolute right-2 top-2 h-auto w-auto p-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          className="justify-start text-sm font-normal rounded-none h-auto w-full p-2 px-5"
          variant="ghost"
        >
          Add card...
        </Button>
        <form>
          <FormSubmit
            className="justify-start text-sm font-normal rounded-none h-auto w-full p-2 px-5"
            variant="ghost"
          >
            Copy list...
          </FormSubmit>
        </form>
        <Separator />
        <form>
          <FormSubmit
            className="justify-start text-sm font-normal rounded-none h-auto w-full p-2 px-5"
            variant="ghost"
          >
            Delete this list
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
}

export default ListOptions;
