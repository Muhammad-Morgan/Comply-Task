import Navbar from "@/components/layouts/Navbar";

export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      <Navbar />
      <div className="py-16 px-4 sm:px-8 lg:px-16">{children}</div>
    </main>
  );
}
