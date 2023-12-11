"use client";

import { toast } from "sonner";

import { useAction } from "@/hooks/use-action";
import { stripeRedirect } from "@/actions/stripe-redirect";

import { Button } from "@/components/ui/button";
import { useProModal } from "@/hooks/use-pro-modal";

type Props = {
  isPro: boolean;
};

function SubscriptionButton({ isPro }: Props) {
  const { onOpen } = useProModal();

  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onClick = () => {
    if (isPro) {
      execute({});
    } else {
      onOpen();
    }
  };

  return (
    <Button disabled={isLoading} variant="primary" onClick={onClick}>
      {isPro ? "Manage Subscription" : "Upgrade to pro"}
    </Button>
  );
}

export default SubscriptionButton;
