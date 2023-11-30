import { Suspense } from "react";

import { Separator } from "@/components/ui/separator";

import Info from "./_components/Info";
import BoardList from "./_components/BoardList";

async function OrganizationIdPage() {
  return (
    <div className="flex flex-col space-y-4 w-full">
      <Info />
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <Suspense fallback={<BoardList.Skeleton />}>
          <BoardList />
        </Suspense>
      </div>
    </div>
  );
}

export default OrganizationIdPage;
