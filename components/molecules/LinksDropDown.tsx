import Link from "next/link";
import { AlignLeft, HomeIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { links as defaultLinks } from "@/lib/lists";
type NavLink = {
  href: string;
  label: string;
  icon?: React.ReactNode;
};
type LinksDropDownProps = {
  links?: NavLink[];
  homeLabel?: string;
  trigger?: React.ReactNode;
  triggerLabel?: string;
  className?: string;
  contentClassName?: string;
  ariaLabel?: string;
};
const LinksDropdown = ({
  links = defaultLinks,
  homeLabel = "Home",
  trigger,
  triggerLabel = "Open navigation menu",
  className = "lg:hidden",
  contentClassName = "w-52 lg:hidden",
  ariaLabel = "Primary navigation",
}: LinksDropDownProps) => {
  const renderedTrigger = trigger ?? (
    <Button variant="outline" size="icon">
      <AlignLeft />
      <span className="sr-only">{triggerLabel}</span>
    </Button>
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className={className}
        aria-label={triggerLabel}
      >
        {renderedTrigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={contentClassName}
        align="start"
        sideOffset={24}
        aria-label={ariaLabel}
      >
        <DropdownMenuItem asChild>
          <Link href="/" className="flex items-center gap-x-2">
            <HomeIcon aria-hidden /> <span>{homeLabel}</span>
          </Link>
        </DropdownMenuItem>

        {links.map((link) => {
          return (
            <DropdownMenuItem key={link.href} asChild>
              <Link href={link.href} className="flex items-center gap-x-2">
                {link.icon}
                <span className="capitalize">{link.label}</span>
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LinksDropdown;
