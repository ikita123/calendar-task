import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Calendar from "@/components/Calendar";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1">
        <Calendar />
        <Sidebar />
      </div>
    </div>
  );
}
