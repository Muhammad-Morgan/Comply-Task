import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
// 3 states, 3 sizes
type StepCircleProps = {
  circleState: "pending" | "active" | "completed";
  circleContent: number;
  circleLabel?: string;
  size?: "md" | "sm" | "lg";
  badgeColorClass?: string;
};
// constructed object with size keys to access the 3 sizes and add styling
const sizeStyles: Record<
  NonNullable<StepCircleProps["size"]>,
  { badge: string; text: string; icon: string }
> = {
  lg: {
    badge: "h-12 w-12",
    text: "text-lg",
    icon: "size-6",
  },
  md: {
    badge: "h-10 w-10",
    text: "text-base",
    icon: "size-5",
  },
  sm: {
    badge: "h-8 w-8",
    text: "text-sm",
    icon: "size-4",
  },
};

const StepCircle = ({
  circleState = "pending",
  circleContent = 1,
  circleLabel = "default",
  size = "md",
}: StepCircleProps) => {
  // badge size + text/icon size control
  const { badge: badgeSizeClass, text: textClass } = sizeStyles[size];
  // badge color control
  const badgeStyles = () => {
    if (circleState === "pending") {
      return "bg-neutral-200 text-neutral-800";
    } else return "bg-comp-green";
  };
  const isTextContent =
    typeof circleContent === "string" || typeof circleContent === "number";

  return (
    <div className="flex flex-col items-center shrink-0" role="listitem">
      <Badge
        className={cn(
          "rounded-full p-0 aspect-square items-center justify-center",
          badgeSizeClass,
          badgeStyles()
        )}
        variant={
          circleState === "active" || circleState === "completed"
            ? "default"
            : "secondary"
        }
      >
        <span
          className={cn(
            "inline-flex items-center justify-center",
            isTextContent ? textClass : undefined
          )}
        >
          {circleState === "completed" ? (
            // If completed show a check icon instead of the number.
            <Check className="size-4" aria-hidden="true" />
          ) : (
            // Otherwise show the step number (1-based).
            circleContent + 1
          )}
        </span>
      </Badge>
      {circleLabel ? (
        <span className="text-sm text-muted-foreground">{circleLabel}</span>
      ) : null}
    </div>
  );
};

export default StepCircle;
