import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";

import ModalProvider from "@/components/providers/ModalProvider";

function PlatFormLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <Toaster />
      <ModalProvider />
      {children}
    </ClerkProvider>
  );
}

export default PlatFormLayout;
