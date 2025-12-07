import { Button } from "@/components/atoms/button";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo.svg";
import LandingImg from "@/assets/main.svg";
export default function Home() {
  return (
    <main>
      <header className="max-w-6xl mx-auto px-4 sm:px-8 py-6">
        <Image src={Logo} alt="comply-logo" />
      </header>
      <header className="max-w-6xl mx-auto px-4 sm:px-8 py-6 lg:py-3">
        <p className="mb-4 max-w-[550px] leading-loose">
          <p>Hi there ! </p>I am just a cover for the challange. I can take you
          to the
          <Button asChild variant="link" size="sm" className="px-1.5">
            <Link href="/task" className="text-primary">
              challange
            </Link>
          </Button>
          directly, or you can create an account firstly!
        </p>
      </header>
      <section className="max-w-6xl mx-auto px-4 sm:px-8 grid lg:grid-cols-2 items-center">
        <div>
          <h1 className="capitalize text-4xl md:text-7xl font-bold">
            Comply <span className="text-primary">Market</span> Task
          </h1>
          <p className="leading-loose max-w-md mt-4 ">
            Use the Sign-Up link to join us, or click on{" "}
            <Button asChild variant="link" size="sm" className="px-1">
              <Link href="/task" className="text-primary">
                Get Started
              </Link>
            </Button>
            , and go to the task...
          </p>
          <Button asChild className="mt-4 mr-2">
            <Link href="/task">Get Started</Link>
          </Button>
          <Button asChild className="mt-4" variant="ghost">
            <Link href="/register">Sign Up</Link>
          </Button>
        </div>
        <Image src={LandingImg} alt="landing" className="hidden lg:block" />
      </section>
    </main>
  );
}
