import { Suspense } from "react";

import { cn } from "@/lib/utils";

import LinksDropDown from "../molecules/LinksDropDown";
import { ThemeToggle } from "../molecules/ThemeToggle";
import NavSearch from "../organisms/NavSearch";

type NavbarProps = {
  className?: string;
  innerClassName?: string;
};

const Navbar = ({ className, innerClassName }: NavbarProps) => {
  return (
    <nav className={cn("bg-muted px-6 py-4 shadow-sm", className)}>
      <section
        className={cn(
          "flex w-full items-center justify-between gap-4 md:gap-6",
          innerClassName
        )}
      >
        <div>
          <LinksDropDown />
        </div>
        <div>
          <Suspense fallback={<span className="sr-only">Loading search</span>}>
            <NavSearch inputClassName="sm:w-[300px] md:w-[400px]" />
          </Suspense>
        </div>
        <div>
          <ThemeToggle />
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
