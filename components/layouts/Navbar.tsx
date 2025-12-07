import LinksDropDown from "../molecules/LinksDropDown";
import { ThemeToggle } from "../molecules/ThemeToggle";

const Navbar = () => {
  return (
    <nav className="bg-muted py-4 sm:px-16 lg:px-24 px-4 flex items-center justify-between">
      <div>
        <LinksDropDown />
      </div>
      <div className="flex item-center gap-x-4">
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
