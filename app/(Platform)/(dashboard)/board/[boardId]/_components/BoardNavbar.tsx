import { Board } from "@prisma/client";

import BoardTitleForm from "./BoardTitleForm";
import BoardOptions from "./BoardOptions";

type Props = {
  board: Board;
};

function BoardNavbar({ board }: Props) {
  return (
    <div className="fixed top-14 bg-black/50 z-50 text-white w-full h-14 flex items-center justify-between px-6">
      <BoardTitleForm id={board.id} title={board.title} />
      <BoardOptions id={board.id} />
    </div>
  );
}

export default BoardNavbar;
