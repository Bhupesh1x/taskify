"use client";

import { ListWithCards } from "@/types";

import ListHeader from "./ListHeader";

type Props = {
  index: number;
  list: ListWithCards;
};

function ListItem({ list, index }: Props) {
  return (
    <li className="shrink-0 h-full w-[272px] select-none">
      <div className="bg-[#f1f2f4] rounded-md pb-2 shadow-md">
        <ListHeader
          id={list.id}
          boardId={list.boardId}
          listTitle={list.title}
        />
      </div>
    </li>
  );
}

export default ListItem;
