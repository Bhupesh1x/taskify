"use client";

import Image from "next/image";

import { useProModal } from "@/hooks/use-pro-modal";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

function ProModal() {
  const { isOpen, onClose } = useProModal();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-0 overflow-hidden">
        <div className="aspect-video flex items-center justify-center relative">
          <Image src="/hero.svg" fill className="object-cover" alt="Hero" />
        </div>
        <div className="space-y-6 mx-auto p-6">
          <h2 className="font-semibold text-neutral-700 text-xl">
            Upgrade To Taskify Pro Today!
          </h2>
          <p className="font-semibold text-xs text-neutral-600">
            Explore the best of Taskify
          </p>
          <div className="pl-3">
            <ul className="list-disc text-sm">
              <li>Unlimited boards</li>
              <li>Advanced checklist</li>
              <li>Admin and security features</li>
              <li>And more!</li>
            </ul>
          </div>
          <Button className="w-full" variant="primary">
            Upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProModal;
