"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

import { UpdateCard } from "./schema";
import { InputType, ReturnType } from "./types";

import { db } from "@/lib/db";
import { createAuditLog } from "@/lib/create-audit-log";
import { createSafeAction } from "@/lib/create-safe-actions";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!orgId || !userId) {
    return {
      error: "User Unauthorized",
    };
  }

  const { id, boardId, ...values } = data;
  let card;

  try {
    card = await db.card.update({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
      data: {
        ...values,
      },
    });

    await createAuditLog({
      entityId: card.id,
      entityTitle: card.title,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.UPDATE,
    });
  } catch (error) {
    return {
      error: `${error}`,
    };
  }

  revalidatePath(`/board/${boardId}`);

  return { data: card };
};

export const updateCard = createSafeAction(UpdateCard, handler);
