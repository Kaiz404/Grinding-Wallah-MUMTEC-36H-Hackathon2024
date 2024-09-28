"use client";

import Link from "next/link";
import { links } from "@/constants/nav-links";
import { usePathname } from "next/navigation";
import Image from "next/image";

const NavBar = () => {
  return (
    <nav className="h-full w-full p-5 bg-blue-950 drop-shadow-2xl flex items-center justify-center gap-24">
      <NavLinks />
    </nav>
  );
};

export default NavBar;

function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href != "/browse" ? link.href : "/"}
            className={`${
              pathname === link.href
                ? "h-full rounded-lg p-1 flex gap-4 items-center"
                : "rounded-lg p-1 flex gap-4 items-center"
            }`}
          >
            <p className={`text-lg`}>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
