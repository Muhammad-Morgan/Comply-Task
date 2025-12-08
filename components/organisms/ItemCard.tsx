import * as React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/molecules/card";
import { Separator } from "../atoms/separator";
import { Button } from "../atoms/button";
type ItemProps = {
  item: string;
};
function ItemCard({ item }: ItemProps) {
  return (
    <Card className="bg-muted">
      <CardHeader>
        <CardTitle>I am the Item Card</CardTitle>
        <CardDescription>Will refactor</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="mt-4 grid grid-cols-2 gap-4">
        {item}
        If there is content
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button asChild size="sm">
          <Link href={`#`}>Link</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default React.memo(ItemCard);
