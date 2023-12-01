import { Board } from "@prisma/client";

import BoardTitleForm from "./BoardTitleForm";

type Props = {
  board: Board;
};

function BoardNavbar({ board }: Props) {
  return (
    <div className="fixed top-14 bg-black/50 z-50 text-white w-full h-14 flex items-center px-6">
      <BoardTitleForm title={board.title} />
    </div>
  );
}

export default BoardNavbar;
