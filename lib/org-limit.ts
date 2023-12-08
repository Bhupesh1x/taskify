import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { MAX_BOARD_LIMIT } from "@/constants/boards";

export const increaseAvaiableCount = async () => {
  const { orgId } = auth();

  if (!orgId) {
    throw new Error("User Unauthorized");
  }

  const orgLimit = await db.orgLimit.findUnique({
    where: {
      orgId,
    },
  });

  if (orgLimit) {
    await db.orgLimit.update({
      where: { orgId },
      data: { count: orgLimit.count + 1 },
    });
  } else {
    await db.orgLimit.create({
      data: {
        orgId,
        count: 1,
      },
    });
  }
};

export const decreaseAvaiableCount = async () => {
  const { orgId } = auth();

  if (!orgId) {
    throw new Error("User Unauthorized");
  }

  const orgLimit = await db.orgLimit.findUnique({
    where: {
      orgId,
    },
  });

  if (orgLimit) {
    await db.orgLimit.update({
      where: { orgId },
      data: { count: orgLimit.count > 0 ? orgLimit.count - 1 : 0 },
    });
  } else {
    await db.orgLimit.create({
      data: {
        orgId,
        count: 1,
      },
    });
  }
};

export const hasAvaiableCount = async () => {
  const { orgId } = auth();

  if (!orgId) {
    throw new Error("User Unauthorized");
  }

  const orgLimit = await db.orgLimit.findUnique({
    where: {
      orgId,
    },
  });

  if (!orgLimit || orgLimit.count < MAX_BOARD_LIMIT) {
    return true;
  } else {
    return false;
  }
};

export const getAvaiableCount = async () => {
  const { orgId } = auth();

  if (!orgId) {
    return 0;
  }

  const orgLimit = await db.orgLimit.findUnique({
    where: {
      orgId,
    },
  });

  if (!orgLimit) {
    return 0;
  }

  return orgLimit.count;
};
