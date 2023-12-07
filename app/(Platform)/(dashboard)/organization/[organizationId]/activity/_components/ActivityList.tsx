import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";

import { Skeleton } from "@/components/ui/skeleton";
import ActivityItem from "@/components/shared/ActivityItem";

async function ActivityList() {
  const { orgId } = auth();

  if (!orgId) {
    return redirect("select-org");
  }

  const auditLogs = await db.auditLog.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <ol className="space-y-4 mt-4">
      {auditLogs.length ? (
        auditLogs.map((log) => <ActivityItem key={log.id} log={log} />)
      ) : (
        <p className="text-xs text-center text-muted-foreground">
          No activity found inside this organization
        </p>
      )}
    </ol>
  );
}

export default ActivityList;

ActivityList.Skeleton = function ActivityListSkeleton() {
  return (
    <ol className="space-y-4 mt-4">
      <Skeleton className="w-[80%] h-14" />
      <Skeleton className="w-[50%] h-14" />
      <Skeleton className="w-[60%] h-14" />
      <Skeleton className="w-[70%] h-14" />
      <Skeleton className="w-[80%] h-14" />
    </ol>
  );
};
