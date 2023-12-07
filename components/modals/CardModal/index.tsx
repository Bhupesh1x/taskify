"use client";

import { CardWithList } from "@/types";

import { fetchApi } from "@/lib/fetchApi";
import { AuditLog } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useCardModal } from "@/hooks/use-card-modal";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import Header from "./Header";

import Actions from "./Actions";
import Activity from "./Activity";
import Description from "./Description";

function CardModal() {
  const { id, isOpen, onClose } = useCardModal();

  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetchApi(`/api/card/${id}`),
  });

  const { data: auditLogsData } = useQuery<AuditLog[]>({
    queryKey: ["card-logs", id],
    queryFn: () => fetchApi(`/api/card/${id}/logs`),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {cardData ? <Header card={cardData} /> : <Header.Skeleton />}

        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              {cardData ? (
                <Description card={cardData} />
              ) : (
                <Description.Skeleton />
              )}
              {auditLogsData ? (
                <Activity logs={auditLogsData} />
              ) : (
                <Activity.Skeleton />
              )}
            </div>
          </div>
          {cardData ? <Actions card={cardData} /> : <Actions.Skeleton />}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CardModal;
