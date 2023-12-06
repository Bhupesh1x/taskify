"use client";

import { useCardModal } from "@/hooks/use-card-modal";

import { Dialog, DialogContent } from "@/components/ui/dialog";

function CardModal() {
  const { id, isOpen, onClose } = useCardModal();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <h1>I am a card Modal {id}</h1>
      </DialogContent>
    </Dialog>
  );
}

export default CardModal;
