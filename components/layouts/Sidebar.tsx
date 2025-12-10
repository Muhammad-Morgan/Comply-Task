"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "@/assets/logo.svg";
import { links as defaultLinks } from "@/lib/links";
import { cn } from "@/lib/utils";
import { Button } from "../atoms/button";

type SidebarLink = {
  href: string;
  label: string;
  icon?: React.ReactNode;
};

type SidebarProps = {
  links?: SidebarLink[];
  brand?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  navLabel?: string;
};

const Sidebar = ({
  links = defaultLinks,
  brand,
  footer,
  className,
  navLabel = "Primary navigation",
}: SidebarProps) => {
  const pathname = usePathname();

  const defaultBrand = (
    <Link
      href="/"
      className="flex items-center gap-3 font-semibold text-foreground"
      aria-label="Comply Market Home"
    >
      <Image
        src={Logo}
        alt="Comply Market"
        width={32}
        height={32}
        priority
        className="h-8 w-8"
      />
      <span>Comply Market</span>
    </Link>
  );

  return (
    <aside
      className={cn(
        "flex h-full w-full max-w-xs flex-col bg-muted px-6 py-6",
        className
      )}
    >
      <div className="mb-10">{brand ?? defaultBrand}</div>
      <nav aria-label={navLabel} className="flex flex-1 flex-col gap-2">
        {links.map(({ href, label, icon }) => {
          const isActive = pathname === href;
          return (
            <Button
              key={href}
              asChild
              variant={isActive ? "default" : "ghost"}
              className="justify-start gap-3"
              aria-current={isActive ? "page" : undefined}
            >
              <Link href={href}>
                {icon}
                <span className="capitalize">{label}</span>
              </Link>
            </Button>
          );
        })}
      </nav>
      {footer ? <div className="mt-10">{footer}</div> : null}
    </aside>
  );
};

export default Sidebar;
