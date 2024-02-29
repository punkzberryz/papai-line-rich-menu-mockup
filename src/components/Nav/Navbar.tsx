import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "../ui/button";

const Navbar = () => {
  return (
    <header>
      <nav className="flex relative items-center justify-between p-2 ">
        <div className="pl-10 w-20">
          <Link href="/" className="p-1">
            <span className="sr-only">Papai Platform</span>
            <Image
              className="h-14 w-auto"
              src="/icons/papai-icon-v3a.svg"
              alt="Papai Logo"
              width={0}
              height={0}
            />
          </Link>
        </div>
        <div className="">
          <Link href="/" className={buttonVariants({ variant: "ghost" })}>
            Download Mockup
          </Link>
          <Link
            href="/manage-richmenu"
            className={buttonVariants({ variant: "ghost" })}
          >
            Manage Richmenu
          </Link>
          <Link
            href="/upload-richmenu"
            className={buttonVariants({ variant: "ghost" })}
          >
            Upload Richmenu
          </Link>
        </div>
        <div aria-hidden className="w-20 pr-10"></div>
      </nav>
    </header>
  );
};

export default Navbar;
