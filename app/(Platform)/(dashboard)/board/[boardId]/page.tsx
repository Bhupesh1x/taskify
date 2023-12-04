import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import ListContainer from "./_components/ListContainer";

type Props = {
  params: { boardId: string };
};

async function BoardIdPage({ params }: Props) {
  const { orgId } = auth();

  if (!orgId) {
    return redirect("/select-org");
  }

  const lists = await db.list.findMany({
    where: {
      boardId: params.boardId,
      board: {
        orgId,
      },
    },
    include: {
      cards: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });

  return (
    <div className="overflow-auto h-full">
      <ListContainer boardId={params.boardId} lists={lists} />
    </div>
  );
}

export default BoardIdPage;
