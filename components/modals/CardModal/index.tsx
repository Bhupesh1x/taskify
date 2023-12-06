"use client";

import { CardWithList } from "@/types";

import { fetchApi } from "@/lib/fetchApi";
import { useQuery } from "@tanstack/react-query";
import { useCardModal } from "@/hooks/use-card-modal";

import { Dialog, DialogContent } from "@/components/ui/dialog";

function CardModal() {
  const { id, isOpen, onClose } = useCardModal();

  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetchApi(`/api/card/${id}`),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <h1>{cardData?.title}</h1>
      </DialogContent>
    </Dialog>
  );
}

export default CardModal;
