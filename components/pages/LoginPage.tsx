import type { ReactNode } from "react";
import Link from "next/link";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { FieldDescription } from "../ui/field";
import LoginForm from "../layouts/LoginForm";
import { cn } from "@/lib/utils";

type LoginPageProps = {
  title?: string;
  description?: string;
  switchLabel?: string;
  switchHref?: string;
  switchCta?: string;
  termsText?: ReactNode;
  className?: string;
};

const defaultTerms = (
  <>
    By clicking continue, you agree to our{" "}
    <a href="#" className="underline">
      Terms of Service
    </a>{" "}
    and{" "}
    <a href="#" className="underline">
      Privacy Policy
    </a>
    .
  </>
);

const LoginPage = ({
  title = "Login to your account",
  description = "Getting started? Create a new account",
  switchLabel = "Sign Up",
  switchHref = "/register",
  switchCta = "Create account",
  termsText = defaultTerms,
  className,
}: LoginPageProps) => {
  return (
    <>
      <Card className={cn("mx-auto w-full max-w-[400px]", className)}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description ? (
            <CardDescription>{description}</CardDescription>
          ) : null}
          <CardAction className="text-sm text-muted-foreground">
            {switchCta}{" "}
            <Button asChild variant="link" className="px-1">
              <Link href={switchHref}>{switchLabel}</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
      <FieldDescription className="mx-auto max-w-[400px] px-6 text-center text-muted-foreground">
        {termsText}
      </FieldDescription>
    </>
  );
};

export default LoginPage;
