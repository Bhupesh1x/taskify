import { format } from "date-fns";
import { AuditLog } from "@prisma/client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { generateLogMessage } from "@/lib/generate-log-message";

type Props = {
  log: AuditLog;
};

function ActivityItem({ log }: Props) {
  return (
    <li className="flex items-center gap-x-2 mb-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={log.userImage} />
      </Avatar>
      <div className="flex flex-col space-y-0.5">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-neutral-600 lowercase mr-2">
            {log.userName}
          </span>
          {generateLogMessage(log)}
        </p>
        <p className="text-xs text-muted-foreground">
          {format(new Date(log.createdAt), "MMM d, yyyy 'at' h:mm a")}
        </p>
      </div>
    </li>
  );
}

export default ActivityItem;
