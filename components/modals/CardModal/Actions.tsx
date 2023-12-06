"use client";

import { toast } from "sonner";
import { Copy, Trash } from "lucide-react";
import { useParams } from "next/navigation";

import { CardWithList } from "@/types";
import { useAction } from "@/hooks/use-action";
import { copyCard } from "@/actions/copy-card";
import { deleteCard } from "@/actions/delete-card";
import { useCardModal } from "@/hooks/use-card-modal";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  card: CardWithList;
};

function Actions({ card }: Props) {
  const params = useParams();
  const { onClose } = useCardModal();

  const { execute: executeCopyCard, isLoading: isLoadingCopy } = useAction(
    copyCard,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" copied`);
        onClose();
      },
      onError: (error) => {
        toast.error(error);
        onClose();
      },
    }
  );

  const { execute: executeDeleteCard, isLoading: isLoadingDelete } = useAction(
    deleteCard,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" deleted`);
        onClose();
      },
      onError: (error) => {
        toast.error(error);
        onClose();
      },
    }
  );

  const onCopy = () => {
    const boardId = params.boardId as string;
    executeCopyCard({ id: card.id, boardId });
  };

  const onDelete = () => {
    const boardId = params.boardId as string;
    executeDeleteCard({ id: card.id, boardId });
  };

  return (
    <div className="space-y-2 mt-2">
      <p className="text-sm font-semibold">Actions</p>
      <Button
        disabled={isLoadingCopy}
        onClick={onCopy}
        variant="gray"
        className="w-full justify-start"
        size="inline"
      >
        <Copy className="h-4 w-4 mr-2" />
        Copy
      </Button>
      <Button
        disabled={isLoadingDelete}
        onClick={onDelete}
        variant="gray"
        className="w-full justify-start"
        size="inline"
      >
        <Trash className="h-4 w-4 mr-2" />
        Delete
      </Button>
    </div>
  );
}

export default Actions;

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="h-4 w-20 bg-neutral-200" />
      <Skeleton className="h-8 w-full bg-neutral-200" />
      <Skeleton className="h-8 w-full bg-neutral-200" />
    </div>
  );
};
