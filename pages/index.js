import Sidebar from "@/components/Sidebar";
import Calendar from "@/components/Calendar";

export default function Home() {
  return (
    <div className="flex h-screen">
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold"></h1>
        <Calendar />
      </div>

      <div className="w-64 p-4">
        <Sidebar />
      </div>
    </div>
  );
}
