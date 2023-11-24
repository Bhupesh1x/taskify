import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";

function Footer() {
  return (
    <div className="fixed bottom-0 p-4 bg-slate-100 border-b w-full flex items-center">
      <div className="md:max-w-6xl mx-auto flex items-center justify-between w-full ">
        <Logo />
        <div className="flex items-center justify-between space-x-4 md:block md:w-auto w-full">
          <Button size="sm" variant="ghost">
            Privacy Policy
          </Button>
          <Button size="sm" variant="ghost">
            Terms of service
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Footer;
