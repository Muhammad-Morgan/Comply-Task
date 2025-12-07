import { Button } from "@/components/atoms/button";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <header className="max-w-6xl mx-auto px-4 sm:px-8 py-6 "></header>
      <section className="max-w-6xl mx-auto px-4 sm:px-8 h-screen -mt-20 grid lg:grid-cols-2 items-center">
        <div>
          <h1 className="capitalize text-4xl md:text-7xl font-bold">
            Comply <span className="text-primary">Market</span> Task
          </h1>
          <p className="leading-loose max-w-md mt-4 "></p>
          <Button asChild className="mt-4">
            <Link href="/register">Get Started</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
