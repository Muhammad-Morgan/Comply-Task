"use client";
import { links } from "@/lib/links";
import LinksDropDown from "../molecules/LinksDropDown";
import { ThemeToggle } from "../molecules/ThemeToggle";
import { Button } from "../atoms/button";
import { usePathname } from "next/navigation";
import Logo from "@/assets/logo.svg";
import Image from "next/image";
import Link from "next/link";
const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="bg-muted/70 backdrop-blur-md supports-[backdrop-filter]:bg-muted/50 py-4 sm:px-16 lg:px-24 px-4">
      <section className="w-full max-w-[1100px] flex items-center justify-between mx-auto">
        <div>
          <LinksDropDown />
          <Image
            src={Logo}
            alt="logo"
            className="mx-auto hidden lg:block"
            width={170}
            height={170}
          />
        </div>
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
