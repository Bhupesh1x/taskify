"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { Menu } from "lucide-react";
import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";

import Sidebar from "./Sidebar";

function MobileSidebar() {
  const pathname = usePathname();

  const [isMounted, setIsMounted] = useState(false);

  const onOpen = useMobileSidebar((state) => state.onOpen);
  const onClose = useMobileSidebar((state) => state.onClose);
  const isOpen = useMobileSidebar((state) => state.isOpen);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={onOpen}
        className="mr-2 block md:hidden"
      >
        <Menu className="h-5 w-5" />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="pt-10 p-2">
          <Sidebar storageKey="t-mobile-sidebar-state" />
        </SheetContent>
      </Sheet>
    </>
  );
}

export default MobileSidebar;
