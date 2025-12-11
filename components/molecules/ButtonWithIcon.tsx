"use client";
import { cn } from "@/lib/utils";
import ComplyButtons from "../atoms/complyButtons";
type ButtonWithIconProps = {
  icon: React.JSX.Element;
  content: string;
  className: string;
  place?: string;
  onClick?: () => void;
};
export function ButtonWithIcon({
  icon,
  content,
  className,
  place,
  onClick,
}: ButtonWithIconProps) {
  const iconPlace = place;
  return (
    <div className="grid p-4 w-[200px]">
      <ComplyButtons
        buttonsClass={cn(
          "text-base bg-primary-800 hover:bg-comp-green",
          className
        )}
        onClick={onClick}
        type="icon"
        content={content}
        icon={icon}
        place={iconPlace}
      />
    </div>
  );
}

export default ButtonWithIcon;
