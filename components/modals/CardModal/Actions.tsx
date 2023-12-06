"use client";

import { CardWithList } from "@/types";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Copy, Trash } from "lucide-react";

type Props = {
  card: CardWithList;
};

function Actions({ card }: Props) {
  return (
    <div className="space-y-2 mt-2">
      <p className="text-sm font-semibold">Actions</p>
      <Button variant="gray" className="w-full justify-start" size="inline">
        <Copy className="h-4 w-4 mr-2" />
        Copy
      </Button>
      <Button variant="gray" className="w-full justify-start" size="inline">
        <Trash className="h-4 w-4 mr-2" />
        Delete
      </Button>
    </div>
  );
}

export default Actions;

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="h-4 w-20 bg-neutral-200" />
      <Skeleton className="h-8 w-full bg-neutral-200" />
      <Skeleton className="h-8 w-full bg-neutral-200" />
    </div>
  );
};
