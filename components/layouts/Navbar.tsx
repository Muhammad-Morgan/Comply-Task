"use client";
import { links } from "@/lib/links";
import LinksDropDown from "../molecules/LinksDropDown";
import { ThemeToggle } from "../molecules/ThemeToggle";
import { Button } from "../atoms/button";
import { usePathname } from "next/navigation";
import Logo from "@/assets/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import NavSearch from "../organisms/NavSearch";
const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-muted/50 backdrop-blur-md supports-backdrop-filter:bg-muted/30 py-4 sm:px-16 lg:px-24 px-4 shadow-sm">
      <section className="w-full max-w-[1100px] flex items-center justify-between mx-auto">
        <div>
          <LinksDropDown />
          <Link href="/">
            <Image
              src={Logo}
              alt="logo"
              className="mx-auto hidden lg:block"
              width={170}
              height={170}
            />
          </Link>
        </div>
        <Suspense>
          <NavSearch />
        </Suspense>

        <div className="hidden lg:flex">
          {links.map((link) => {
            const { href, label, icon } = link;
            return (
              <Button
                key={href}
                asChild
                variant={pathname === href ? "default" : "link"}
              >
                <Link href={href}>
                  {icon}
                  <span className="capitalize text-accent-foreground">
                    {label}
                  </span>
                </Link>
              </Button>
            );
          })}
        </div>
        <div className="flex item-center gap-x-4">
          <ThemeToggle />
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
