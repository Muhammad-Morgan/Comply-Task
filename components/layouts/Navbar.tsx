import LinksDropDown from "../molecules/LinksDropDown";
import { ThemeToggle } from "../molecules/ThemeToggle";
import { Suspense } from "react";
import NavSearch from "../organisms/NavSearch";
const Navbar = () => {
  return (
    <nav className="fixed top-4 left-4 right-4 lg:left-[calc(16rem+2rem)] lg:right-6 z-50 rounded-2xl border border-white/10 bg-muted/60 shadow-xl backdrop-blur-lg supports-[backdrop-filter]:bg-muted/45 px-6 py-4 w-[calc(100vw-2rem)] lg:w-[calc(100vw-16rem-3rem)]">
      <section className="flex w-full items-center gap-6">
        <div className="flex items-center gap-3">
          <LinksDropDown />
          <span className="hidden text-sm font-semibold uppercase text-muted-foreground lg:inline">
            Menu
          </span>
        </div>
        <div className="flex-1">
          <Suspense>
            <NavSearch />
          </Suspense>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
