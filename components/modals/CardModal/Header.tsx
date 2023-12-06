"use client";

import { toast } from "sonner";
import { Layout } from "lucide-react";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { ElementRef, useRef, useState } from "react";

import { CardWithList } from "@/types";
import { useAction } from "@/hooks/use-action";
import { updateCard } from "@/actions/update-card";

import { Skeleton } from "@/components/ui/skeleton";
import { FormInput } from "@/components/Form/FormInput";

type Props = {
  card: CardWithList;
};

function Header({ card }: Props) {
  const params = useParams();
  const queryClient = useQueryClient();

  const inputRef = useRef<ElementRef<"input">>(null);
  const [title, setTitle] = useState(card.title);

  const { execute } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", card.id],
      });
      toast.success(`Renamed to "${data.title}"`);
      setTitle(data.title);
    },
  });

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = params.boardId as string;

    if (title === card.title) return;

    execute({ id: card.id, boardId, title });
  };

  return (
    <div className="flex items-start gap-x-2 w-full mb-6">
      <Layout className="h-5 w-5 mt-1 text-neutral-600" />
      <div className="w-full">
        <form action={onSubmit}>
          <FormInput
            ref={inputRef}
            onBlur={onBlur}
            id="title"
            defaultValue={title}
            className="font-semibold text-xl px-1 text-neutral-700 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input mb-0.5 truncate transition"
          />
        </form>
        <p className="text-sm text-muted-foreground">
          in list <span className="underline">{card.list.title}</span>
        </p>
      </div>
    </div>
  );
}

export default Header;

Header.Skeleton = function HeaderSkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="h-5 w-5 mt-1 text-neutral-600" />

      <div>
        <Skeleton className="w-24 h-6 mb-1 bg-neutral-200" />
        <Skeleton className="w-12 h-4 bg-neutral-200" />
      </div>
    </div>
  );
};
