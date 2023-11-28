import { Plus } from "lucide-react";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";

import MobileSidebar from "./MobileSidebar";

function Navbar() {
  return (
    <div className="fixed z-50 top-0 bg-white border-b shadow w-full h-14 px-4 flex items-center">
      <MobileSidebar />
      <Logo />
      <Button
        variant="primary"
        size="sm"
        className="px-2 py-1.5 rounded-sm hidden md:block ml-4"
      >
        Create
      </Button>
      <Button
        variant="primary"
        size="sm"
        className="rounded-sm block md:hidden"
      >
        <Plus className="h-4 w-4" />
      </Button>

      <div className="ml-auto flex items-center gap-x-4">
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl="/organization/:id"
          afterSelectOrganizationUrl="/organization/:id"
          afterLeaveOrganizationUrl="/select-org"
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
            },
          }}
        />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: {
                height: 30,
                width: 30,
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default Navbar;
