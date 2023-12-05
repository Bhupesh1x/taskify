"use client";

import { ListWithCards } from "@/types";
import { ElementRef, useRef, useState } from "react";

import { Draggable, Droppable } from "@hello-pangea/dnd";

import CardForm from "./CardForm";
import CardItem from "./CardItem";
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
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="shrink-0 h-full w-[272px] select-none"
        >
          <div
            {...provided.dragHandleProps}
            className="bg-[#f1f2f4] rounded-md pb-2 shadow-md"
          >
            <ListHeader
              id={list.id}
              boardId={list.boardId}
              listTitle={list.title}
              onAddCard={enableEditing}
            />
            <Droppable droppableId={list.id} type="card">
              {(provided) => (
                <ol
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`mx-1 px-1 py-0.5 flex flex-col gap-y-2 ${
                    list.cards.length > 0 ? "mt-2" : "mt-0"
                  }`}
                >
                  {list.cards.map((card, index) => (
                    <CardItem key={card.id} index={index} card={card} />
                  ))}
                  {provided.placeholder}
                </ol>
              )}
            </Droppable>
            <CardForm
              ref={textareaRef}
              listId={list.id}
              isEditing={isEditing}
              enableEditing={enableEditing}
              disableEditing={disableEditing}
            />
          </div>
        </li>
      )}
    </Draggable>
  );
}

export default ListItem;
