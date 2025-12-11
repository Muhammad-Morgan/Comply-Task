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
import RegisterForm from "../layouts/RegisterForm";
import { Button } from "../ui/button";
import { FieldDescription } from "../ui/field";
import { cn } from "@/lib/utils";

type RegisterPageProps = {
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

const RegisterPage = ({
  title = "Join Us",
  description = "Enter your info to create a new account, or log in",
  switchLabel = "Log In",
  switchHref = "/login",
  switchCta = "Already have an account?",
  termsText = defaultTerms,
  className,
}: RegisterPageProps) => {
  return (
    <>
      <Card className={cn("mx-auto w-full max-w-[450px]", className)}>
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
          <RegisterForm />
        </CardContent>
      </Card>
      <FieldDescription className="mx-auto max-w-[450px] px-6 text-center text-muted-foreground">
        {termsText}
      </FieldDescription>
    </>
  );
};

export default RegisterPage;
