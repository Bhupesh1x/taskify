import Link from "next/link";

import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";

function Navbar() {
  return (
    <div className="fixed top-0 px-4 bg-white border-b shadow h-14 w-full flex items-center">
      <div className="md:max-w-6xl mx-auto flex items-center justify-between w-full ">
        <Logo />
        <div className="flex items-center justify-between space-x-4 md:block md:w-auto w-full">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/sign-in">Login</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/sign-up">Get Taskify for free</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
