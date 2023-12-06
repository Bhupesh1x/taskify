import { Card } from "@prisma/client";

import { Draggable } from "@hello-pangea/dnd";
import { useCardModal } from "@/hooks/use-card-modal";

type Props = {
  index: number;
  card: Card;
};

function CardItem({ card, index }: Props) {
  const { onOpen } = useCardModal();
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          role="button"
          className="truncate bg-white shadow-sm border-2 border-transparent hover:border-black py-2 px-3 text-sm rounded-md"
          onClick={() => onOpen(card.id)}
        >
          {card.title}
        </div>
      )}
    </Draggable>
  );
}

export default CardItem;
