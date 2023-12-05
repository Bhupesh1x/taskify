"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { UpdateListOrder } from "./schema";
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
  let lists;

  try {
    const transation = items.map((list) =>
      db.list.update({
        where: {
          id: list.id,
          board: {
            orgId,
          },
        },
        data: {
          order: list.order,
        },
      })
    );

    lists = await db.$transaction(transation);
  } catch (error) {
    return {
      error: `${error}`,
    };
  }

  revalidatePath(`/board/${boardId}`);

  return { data: lists };
};

export const updateListOrder = createSafeAction(UpdateListOrder, handler);
