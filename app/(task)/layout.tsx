import Navbar from "@/components/layouts/Navbar";
import Sidebar from "@/components/layouts/Sidebar";

export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="grid lg:grid-cols-5">
      {/* First col hidden on small screen */}
      <div className="hidden lg:block lg:col-span-1 lg:min-h-screen">
        <Sidebar />
      </div>
      {/* second col hide dropdown on big screen */}
      <div className="lg:col-span-4 relative">
        <Navbar />
        <div className="pt-36 px-4 sm:px-8 lg:px-16">{children}</div>
      </div>
    </main>
  );
}
