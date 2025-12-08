import { AreaChart, Layers, AppWindow } from "lucide-react";
type NavLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
};
export const links: NavLink[] = [
  {
    href: "/task",
    label: "Task1",
    icon: <Layers />,
  },
  {
    href: "/task2",
    label: "Task2",
    icon: <AreaChart />,
  },
  {
    href: "/task3",
    label: "Task3",
    icon: <AppWindow />,
  },
];
