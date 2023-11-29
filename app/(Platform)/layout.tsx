import { ClerkProvider } from "@clerk/nextjs";

import { Toaster } from "sonner";

function PlatFormLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <Toaster />
      {children}
    </ClerkProvider>
  );
}

export default PlatFormLayout;
