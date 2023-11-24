import Link from "next/link";
import { Medal } from "lucide-react";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";

import { Button } from "@/components/ui/button";

const heading = localFont({
  src: "../../public/fonts/font.woff2",
});

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

function MarketingPage() {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex items-center bg-amber-100 p-4 rounded-full text-amber-700 border shadow font-semibold uppercase text-xs mb-4">
        <Medal className="h-6 w-6 mr-2" />
        <p className={heading.className}>No 1 Task Management</p>
      </div>

      <div className={heading.className}>
        <p className="text-3xl md:text-6xl text-neutral-800 mb-6 font-medium">
          Taskify helps team move
        </p>
        <p className="text-center bg-gradient-to-tr from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md w-fit mx-auto text-2xl md:text-5xl">
          Work Forward.
        </p>
      </div>
      <p
        className={`max-w-xs md:max-w-2xl text-neutral-400 mx-auto mt-4 text-center text-sm md:text-xl ${textFont.className}`}
      >
        Collaborate, manage projects, and react new productivity peaks. From
        high raises to the home office, the way your team work is unique -
        accomplish it all with Taskify.
      </p>

      <Button className="mt-4" size="lg" asChild>
        <Link href="/sign-up">Get Taskify for free</Link>
      </Button>
    </div>
  );
}

export default MarketingPage;
