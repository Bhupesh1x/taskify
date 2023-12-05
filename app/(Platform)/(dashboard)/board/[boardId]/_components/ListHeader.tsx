"use client";

import { toast } from "sonner";
import { useEventListener } from "usehooks-ts";
import { ElementRef, useRef, useState } from "react";

import { useAction } from "@/hooks/use-action";
import { updateList } from "@/actions/update-list";

import { FormInput } from "@/components/Form/FormInput";
import ListOptions from "./ListOptions";

type Props = {
  id: string;
  boardId: string;
  listTitle: string;
  onAddCard: () => void;
};

function ListHeader({ id, boardId, listTitle, onAddCard }: Props) {
  const [title, setTitle] = useState(listTitle);
  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const { execute } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success(`Renamed title to "${data.title}"`);
      setTitle(data.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    if (title === listTitle) return disableEditing();

    execute({ title, id, boardId });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);

  return (
    <div className="px-2 pt-2 text-sm font-semibold flex items-start justify-between gap-x-2">
      {isEditing ? (
        <form className="flex-1 px-[2px]" ref={formRef} action={onSubmit}>
          <FormInput
            id="title"
            ref={inputRef}
            placeholder="Enter list title..."
            onBlur={onBlur}
            defaultValue={title}
            className="focus:bg-white text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent"
          />
          <button type="submit" hidden />
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="w-full text-sm font-medium border-transparent px-2.5 py-1 h-7"
        >
          {title}
        </div>
      )}
      <ListOptions id={id} boardId={boardId} onAddCard={onAddCard} />
    </div>
  );
}

export default ListHeader;
