"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-actions";

import { DeleteCard } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "User Unauthorized",
    };
  }

  const { id, boardId } = data;
  let card;

  try {
    card = await db.card.delete({
      where: {
        id,
        // boardId,
        list: {
          board: {
            orgId,
          },
        },
      },
    });
  } catch (error) {
    return {
      error: `${error}`,
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const deleteCard = createSafeAction(DeleteCard, handler);
