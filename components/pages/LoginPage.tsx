import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../molecules/card";
import { Button } from "../atoms/button";
import Link from "next/link";
import { FieldDescription } from "../ui/field";
import LoginForm from "../layouts/LoginForm";

const LoginPage = () => {
  return (
    <>
      <Card className="w-full max-w-[400px] mx-auto">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Getting started? Create a new account
          </CardDescription>
          <CardAction>
            <Button asChild variant="link">
              <Link href="/register">Sign Up</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center max-w-[400px] mx-auto">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </>
  );
};

export default LoginPage;
