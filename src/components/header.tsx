import Link from "next/link";

import { Logo } from "./icons/logo";

import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="flex items-center justify-between px-10 py-5 animate-[show_2.5s_linear]">
      <div className="flex items-center gap-28">
        <Link href="/" className="w-40">
          <Logo fill="#3c315b" />
        </Link>
        <ul className="flex items-center gap-20 font-medium text-sm">
          <li>
            <Link href="/">Security</Link>
          </li>
          <li>
            <Link href="/">Learn</Link>
          </li>
          <li>
            <Link href="/">Explore</Link>
          </li>
          <li>
            <Link href="/">Support</Link>
          </li>
        </ul>
      </div>
      <Button variant="main" size="xl" rounded className="mr-5 font-semibold">
        Download
      </Button>
    </header>
  );
};
