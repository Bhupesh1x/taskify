"use client";

import { ListWithCards } from "@/types";
import { useEffect, useState } from "react";

import ListForm from "./ListForm";
import ListItem from "./ListItem";

type Props = {
  boardId: string;
  lists: ListWithCards[];
};

function ListContainer({ boardId, lists }: Props) {
  const [orderedList, setOrderedList] = useState(lists);

  useEffect(() => {
    setOrderedList(lists);
  }, [lists]);

  return (
    <ol className="mx-3 py-3 flex items-start gap-x-3 h-full">
      {orderedList.map((list, index) => (
        <ListItem key={list.id} index={index} list={list} />
      ))}

      <ListForm />

      <div className="flex-shrink-0 w-1" />
    </ol>
  );
}

export default ListContainer;
