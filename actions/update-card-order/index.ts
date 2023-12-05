"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { UpdateCardOrder } from "./schema";
import { InputType, ReturnType } from "./types";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-actions";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!orgId || !userId) {
    return {
      error: "User Unauthorized",
    };
  }

  const { items, boardId } = data;
  let updatedCards;

  try {
    const transation = items.map((card) =>
      db.card.update({
        where: {
          id: card.id,
          list: {
            board: {
              orgId,
            },
          },
        },
        data: {
          order: card.order,
          listId: card.listId,
        },
      })
    );

    updatedCards = await db.$transaction(transation);
  } catch (error) {
    return {
      error: `${error}`,
    };
  }

  revalidatePath(`/board/${boardId}`);

  return { data: updatedCards };
};

export const updateCardOrder = createSafeAction(UpdateCardOrder, handler);
