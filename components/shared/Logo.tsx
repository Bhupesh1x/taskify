import Link from "next/link";
import Image from "next/image";
import localFont from "next/font/local";

const headingFont = localFont({
  src: "../../public/fonts/font.woff2",
});

function Logo() {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition gap-x-2 items-center hidden md:flex">
        <Image src="/logo.svg" alt="Logo" height={30} width={30} />
        <p
          className={`text-lg pt-0.5 text-neutral-070 ${headingFont.className}`}
        >
          Taskify
        </p>
      </div>
    </Link>
  );
}

export default Logo;
