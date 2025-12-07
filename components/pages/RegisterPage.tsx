import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../molecules/card";
import RegisterForm from "../layouts/RegisterForm";
import { Button } from "../atoms/button";
import Link from "next/link";
import { FieldDescription } from "../ui/field";

const RegisterPage = () => {
  return (
    <>
      <Card className="w-full max-w-[450px] mx-auto">
        <CardHeader>
          <CardTitle>Join Us</CardTitle>
          <CardDescription>
            Enter your info to create a new account, or log-in
          </CardDescription>
          <CardAction>
            <Button asChild variant="link">
              <Link href="/login">Log In</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center max-w-[400px] mx-auto">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </>
  );
};

export default RegisterPage;
