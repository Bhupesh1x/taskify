"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { UpdateBoard } from "./schema";
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

  const { title, id } = data;
  let board;

  try {
    board = await db.board.update({
      where: {
        id,
        orgId,
      },
      data: {
        title,
      },
    });
  } catch (error) {
    return {
      error: `${error}`,
    };
  }

  revalidatePath(`/board/${id}`);

  return { data: board };
};

export const updateBoard = createSafeAction(UpdateBoard, handler);
