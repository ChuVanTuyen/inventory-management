import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function DashboardWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-gray-50 text-gray-900 min-h-screen w-full">
      <Sidebar />
      <main className="flex flex-col w-full h-full px-7 py-9 md:pl-24">
        <Navbar />
        {children}
      </main>
    </div>
  );
}