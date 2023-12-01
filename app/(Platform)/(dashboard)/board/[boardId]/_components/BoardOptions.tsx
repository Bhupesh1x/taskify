"use client";

import { toast } from "sonner";
import { MoreHorizontal, X } from "lucide-react";

import { useAction } from "@/hooks/use-action";
import { deleteBoard } from "@/actions/delete-board";

import {
  Popover,
  PopoverContent,
  PopoverClose,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

type Props = {
  id: string;
};

function BoardOptions({ id }: Props) {
  const { execute, isLoading } = useAction(deleteBoard, {
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDelete = () => {
    execute({ id });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="transparent" className="h-auto w-auto p-2">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="py-3 px-0">
        <p className="text-sm font-medium text-neutral-600 text-center pb-4">
          Board Options
        </p>
        <PopoverClose>
          <Button
            asChild
            variant="ghost"
            className="h-auto w-auto absolute top-0 right-0 p-2 text-neutral-600"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          className="w-full justify-start text-sm rounded-none h-auto px-5 p-2 font-normal"
          variant="ghost"
          onClick={onDelete}
          disabled={isLoading}
        >
          Delete This Board
        </Button>
      </PopoverContent>
    </Popover>
  );
}

export default BoardOptions;
