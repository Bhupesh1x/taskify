"use client";

import { ListWithCards } from "@/types";
import { useEffect, useState } from "react";

import { DragDropContext, Droppable } from "@hello-pangea/dnd";

import ListForm from "./ListForm";
import ListItem from "./ListItem";

type Props = {
  boardId: string;
  lists: ListWithCards[];
};

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

function ListContainer({ boardId, lists }: Props) {
  const [orderedList, setOrderedList] = useState(lists);

  useEffect(() => {
    setOrderedList(lists);
  }, [lists]);

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    // if dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // user moves a list
    if (type === "list") {
      const items = reorder(orderedList, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      );
      setOrderedList(items);
    }

    // user moves a card
    if (type === "card") {
      const newOrderedList = [...orderedList];

      // source and destination list
      const sourceList = newOrderedList.find(
        (list) => list.id === source.droppableId
      );
      const destList = newOrderedList.find(
        (list) => list.id === destination.droppableId
      );

      if (!sourceList || !destList) {
        return;
      }

      // Check if cards exists on the source list
      if (!sourceList.cards) {
        sourceList.cards = [];
      }

      // Check if cards exists on the destination list
      if (!destList.cards) {
        destList.cards = [];
      }

      // User Moves card in the same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );

        reorderedCards.forEach((card, index) => {
          card.order = index;
        });

        sourceList.cards = reorderedCards;

        setOrderedList(newOrderedList);
        // TODO: Server action call
      }
      // User Moves card to another list
      else {
        // Remove the moved card from the source list
        const [movedCard] = sourceList.cards.splice(source.index, 1);

        // Assign the new list id to the moved card
        movedCard.listId = destination.droppableId;

        // Add new card to the destination list
        destList.cards.splice(destination.index, 0, movedCard);

        // update source list each card order after moving
        sourceList.cards.forEach((card, index) => {
          card.order = index;
        });

        // update destination list each card order after moving
        destList.cards.forEach((card, index) => {
          card.order = index;
        });

        setOrderedList(newOrderedList);
        // TODO: Server action call
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="mx-3 py-3 flex items-start gap-x-3 h-full"
          >
            {orderedList.map((list, index) => (
              <ListItem key={list.id} index={index} list={list} />
            ))}
            {provided.placeholder}
            <ListForm />

            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default ListContainer;
