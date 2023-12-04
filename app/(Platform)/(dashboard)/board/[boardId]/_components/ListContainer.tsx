import { List } from "@prisma/client";

import ListForm from "./ListForm";

type Props = {
  boardId: string;
  lists: List[];
};

function ListContainer({ boardId, lists }: Props) {
  return (
    <ol className="px-3 py-3">
      <ListForm />

      <div className="flex-shrink-0 w-1" />
    </ol>
  );
}

export default ListContainer;
