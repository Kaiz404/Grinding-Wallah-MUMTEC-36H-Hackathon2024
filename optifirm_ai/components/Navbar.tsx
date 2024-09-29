"use client";

import Link from "next/link";
import { links } from "@/constants/nav-links";
import { usePathname } from "next/navigation";
import Image from "next/image";
import ConnectButton from "./ConnectButton";
import { useAccount } from "wagmi";

const NavBar = () => {
  return (
    <nav className="h-full w-full p-5 bg-[#03031B] drop-shadow-2xl flex items-center justify-center">

      {/* hidden elem to balance navbar */}
      <div className="opacity-0">
        <ConnectButton />
      </div>

      <div className="flex w-full h-full justify-center items-center gap-24">
        <NavLinks />
      </div>
      <div className="w-fit h-full flex">
        <ConnectButton />
      </div>
    </nav>
  );
};

export default NavBar;

function NavLinks() {
  const pathname = usePathname();

  const user = useAccount();

  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={user.address ? link.href : usePathname()}
            className={`${
              pathname === link.href
                ? "h-full rounded-lg p-1 flex gap-4 items-center"
                : "rounded-lg p-1 flex gap-4 items-center opacity-40"
            }  ${user.address ? "cursor-pointer" : "cursor-not-allowed"}`}
          >
            <p className={`text-2xl`}>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
