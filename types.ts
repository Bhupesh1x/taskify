import { List, Card } from "@prisma/client";

export type ListWithCards = List & { card: Card[] };
export type CardsWithList = Card & { list: List };
