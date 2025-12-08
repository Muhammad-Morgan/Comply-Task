import Navbar from "@/components/layouts/Navbar";

export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      <Navbar />
      <div className="pt-32 pb-16 w-full max-w-[1100px] mx-auto px-4 sm:px-16 xl:px-0">
        {children}
      </div>
    </main>
  );
}
