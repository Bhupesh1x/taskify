"use client";

import { useEffect, useState } from "react";

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
    </>
  );
}

export default ModalProvider;
