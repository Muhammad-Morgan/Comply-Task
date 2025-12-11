import * as React from "react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

type CardAction =
  | {
      label: string;
      href: string;
      variant?: React.ComponentProps<typeof Button>["variant"];
    }
  | {
      label: string;
      onClick: () => void;
      variant?: React.ComponentProps<typeof Button>["variant"];
    };

type ItemCardProps = {
  title: string;
  subtitle?: string;
  description?: string;
  metadata?: Array<{ label: string; value: React.ReactNode }>;
  children?: React.ReactNode;
  actions?: CardAction[];
  footer?: React.ReactNode;
};

function ItemCard({
  title,
  subtitle,
  description,
  metadata,
  children,
  actions,
  footer,
}: ItemCardProps) {
  return (
    <Card className="bg-muted/40">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {subtitle ? (
          <p className="text-sm font-medium text-muted-foreground">
            {subtitle}
          </p>
        ) : null}
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <Separator />
      <CardContent className="space-y-4 pt-4">
        {metadata?.length ? (
          <dl className="grid gap-2 text-sm">
            {metadata.map(({ label, value }) => (
              <div
                key={`${label}-${String(value)}`}
                className="flex items-center justify-between gap-3"
              >
                <dt className="text-muted-foreground">{label}</dt>
                <dd className="font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
        {children}
      </CardContent>
      {(actions?.length || footer) && (
        <CardFooter className="flex flex-wrap gap-2">
          {actions?.map((action) => {
            if ("href" in action) {
              return (
                <Button
                  key={action.label}
                  asChild
                  size="sm"
                  variant={action.variant ?? "outline"}
                >
                  <Link href={action.href}>{action.label}</Link>
                </Button>
              );
            }
            return (
              <Button
                key={action.label}
                size="sm"
                variant={action.variant ?? "secondary"}
                onClick={action.onClick}
              >
                {action.label}
              </Button>
            );
          })}
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}

export default React.memo(ItemCard);
