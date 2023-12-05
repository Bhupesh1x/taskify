import { Card } from "@prisma/client";

type Props = {
  index: number;
  card: Card;
};

function CardItem({ card, index }: Props) {
  return (
    <div
      role="button"
      className="truncate bg-white shadow-sm border-2 border-transparent hover:border-black py-2 px-3 text-sm rounded-md"
    >
      {card.title}
    </div>
  );
}

export default CardItem;
