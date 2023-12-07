import { AuditLog } from "@prisma/client";
import { ActivityIcon } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import ActivityItem from "@/components/shared/ActivityItem";

type Props = {
  logs: AuditLog[];
};

function Activity({ logs }: Props) {
  return (
    <div className="flex items-start gap-x-2 w-full">
      <ActivityIcon className="h-5 w-5 text-neutral-600 mt-0.5" />
      <div className="w-full">
        <p className="font-semibold text-neutral-600 mb-2">Actions</p>
        {logs.map((log) => (
          <ActivityItem key={log.id} log={log} />
        ))}
      </div>
    </div>
  );
}

export default Activity;

Activity.Skeleton = function ActivitySkeleton() {
  return (
    <div className="flex items-start gap-x-2 w-full">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="h-6 w-24 mb-2 bg-neutral-200" />
        <Skeleton className="h-10 w-full bg-neutral-200" />
      </div>
    </div>
  );
};
