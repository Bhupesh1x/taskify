import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { HelpCircle, User2 } from "lucide-react";

import { db } from "@/lib/db";
import { getAvaiableCount } from "@/lib/org-limit";
import { MAX_BOARD_LIMIT } from "@/constants/boards";

import Hint from "@/components/shared/Hint";
import { Skeleton } from "@/components/ui/skeleton";
import FormPopover from "@/components/Form/FormPopover";

async function BoardList() {
  const { orgId } = auth();

  if (!orgId) return redirect("/select-org");

  const boards = await db.board.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const availableCount = await getAvaiableCount();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-x-2 text-neutral-700 font-semibold text-lg">
        <User2 className="h-6 w-6" />
        <p>Your Boards</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {boards?.map((board) => (
          <Link
            key={board.id}
            href={`/board/${board.id}`}
            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
            className="relative group aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm p-2 overflow-hidden h-full w-full"
          >
            <div className="bg-black/20 group-hover:bg-black/30 transition absolute inset-0">
              <p className="text-white relative font-semibold p-2">
                {board.title}
              </p>
            </div>
          </Link>
        ))}
        <FormPopover sideOffset={10} side="right">
          <div
            role="button"
            className="aspect-video h-full w-full bg-muted rounded-md space-y-1 hover:opacity-75 transition flex flex-col items-center justify-center relative"
          >
            <p className="text-lg font-semibold">Create new board</p>
            <p className="text-sm">
              {`${MAX_BOARD_LIMIT - availableCount}`} board remaining
            </p>
            <Hint
              sideOffset={40}
              description="Free workspaces can have up to 5 open boards. For unlimited boards upgrade this workspace."
            >
              <HelpCircle className="h-[14px] w-[14px] absolute bottom-2 right-2" />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  );
}

export default BoardList;

BoardList.Skeleton = function BoardSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
    </div>
  );
};
