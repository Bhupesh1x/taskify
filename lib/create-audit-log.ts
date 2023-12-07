import { db } from "@/lib/db";

import { auth, currentUser } from "@clerk/nextjs";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

type Props = {
  entityId: string;
  entityType: ENTITY_TYPE;
  entityTitle: string;
  action: ACTION;
};

export async function createAuditLog({
  entityId,
  entityTitle,
  entityType,
  action,
}: Props) {
  try {
    const { orgId } = auth();
    const user = await currentUser();

    if (!orgId || !user) {
      throw new Error("User Unauthorised");
    }

    await db.auditLog.create({
      data: {
        orgId,
        entityId,
        entityTitle,
        entityType,
        action,
        userId: user?.id,
        userImage: user?.imageUrl,
        userName: `${user.firstName} ${user.lastName}`,
      },
    });
  } catch (error) {
    console.log("CREATE_AUDIT_LOG_ERROR", error);
  }
}
