import Image from "next/image";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/layouts/Sidebar";
import Feed from "@/components/feed/Feed";
import Themetoggle from "@/app/theme-toggle";
import HomeSidebar from "@/components/layouts/HomeSidebar";

export default function home() {
  return (
    <div className="overflow-y-auto h-screen">
      <Navbar/>
      <Feed/>
    </div>
  );
}
