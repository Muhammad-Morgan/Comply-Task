import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
type ComplyButtonProps = {
  type?: "primary" | "secondary" | "ghost" | "accent" | "disabled" | "icon";
  content?: string;
  icon?: ReactNode;
  buttonsClass?: string;
  onClick?: () => void;
  place?: string;
};
const ComplyButtons = ({
  type = "primary",
  content = "click me",
  icon,
  buttonsClass,
  onClick,
  place = "after",
}: ComplyButtonProps) => {
  const buttonStyling = () => {
    if (type === "primary")
      return "text-white bg-comp-green hover:bg-primary-btn-hover font-medium transition-colors";
    if (type === "secondary")
      return "border-2 bg-transparent text-primary-600 border-primary-600 hover:bg-primary-50";
    if (type === "accent") return "bg-comp-orange";
    if (type === "ghost")
      return "bg-transparent text-slate-600 hover:bg-slate-100 shadow-none hover:shadow-sm";
    if (type === "icon")
      return "bg-transparent hover:bg-secondary-800 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2";
    else
      return "bg-primary-600 cursor-not-allowed opacity-50 hover:bg-primary-700";
  };
  if (place === "after") {
    return (
      <Button
        className={cn(
          `capitalize px-6 py-3 rounded-lg shadow-sm ${buttonStyling()}`,
          buttonsClass
        )}
        onClick={onClick}
      >
        {content} {type === "icon" ? icon : null}
      </Button>
    );
  }
  return (
    <Button
      className={cn(
        `capitalize px-6 py-3 rounded-lg shadow-sm ${buttonStyling()}`,
        buttonsClass
      )}
      onClick={onClick}
    >
      {type === "icon" ? icon : null}
      {content}
    </Button>
  );
};

export default ComplyButtons;
