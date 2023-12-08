"use client";

import { useEffect, useState } from "react";

import ProModal from "@/components/modals/ProModal";
import CardModal from "@/components/modals/CardModal";

function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CardModal />
      <ProModal />
    </>
  );
}

export default ModalProvider;
