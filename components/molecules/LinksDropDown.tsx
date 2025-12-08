import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/atoms/dropdown-menu";
import { AlignLeft, HomeIcon } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { links } from "@/lib/links";
import Link from "next/link";
const LinksDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="lg:hidden">
        <Button variant="outline" size="icon">
          <AlignLeft />
          <span className="sr-only">Toggle links</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-52 lg:hidden"
        align="start"
        sideOffset={25}
      >
        <DropdownMenuItem>
          <Link href="/" className="flex items-center gap-x-2">
            <HomeIcon /> Home
          </Link>
        </DropdownMenuItem>
        {links.map((link) => {
          return (
            <DropdownMenuItem key={link.href}>
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
