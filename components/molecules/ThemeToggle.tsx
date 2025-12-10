"use client";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/atoms/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/atoms/dropdown-menu";

type ThemeMode = "light" | "dark" | "system";

type ModeConfig = {
  value: ThemeMode;
  label: string;
};

type ThemeToggleProps = {
  modes?: ModeConfig[];
  trigger?: React.ReactNode;
  triggerLabel?: string;
};

const defaultModes: ModeConfig[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

export function ThemeToggle({
  modes = defaultModes,
  trigger,
  triggerLabel = "Toggle theme",
}: ThemeToggleProps) {
  const { setTheme, theme } = useTheme();

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  const renderedTrigger = trigger ?? (
    <Button variant="outline" size="icon" aria-label={triggerLabel}>
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">{triggerLabel}</span>
    </Button>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{renderedTrigger}</DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {modes.map(({ value, label }) => {
          return (
            <DropdownMenuItem
              key={value}
              onClick={() => setTheme(value)}
              aria-checked={theme === value}
              role="menuitemradio"
            >
              {label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
