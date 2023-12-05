"use client";

import { ListWithCards } from "@/types";
import { ElementRef, useRef, useState } from "react";

import CardForm from "./CardForm";
import ListHeader from "./ListHeader";

type Props = {
  index: number;
  list: ListWithCards;
};

function ListItem({ list, index }: Props) {
  const textareaRef = useRef<ElementRef<"textarea">>(null);

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

  return (
    <li className="shrink-0 h-full w-[272px] select-none">
      <div className="bg-[#f1f2f4] rounded-md pb-2 shadow-md">
        <ListHeader
          id={list.id}
          boardId={list.boardId}
          listTitle={list.title}
          onAddCard={enableEditing}
        />
        <CardForm
          ref={textareaRef}
          listId={list.id}
          isEditing={isEditing}
          enableEditing={enableEditing}
          disableEditing={disableEditing}
        />
      </div>
    </li>
  );
}

export default ListItem;
