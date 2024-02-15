'use client'

import { FC } from "react";
import SidebarLeft from "../components/molecules/sidebarLeft";
import SidebarRight from "../components/molecules/sidebarRight";
import { usePathname } from "next/navigation";

interface MainKontenProps {
  children: React.ReactNode;
}

export default function MainKonten<FC>({ children }: MainKontenProps) {

    const location = usePathname();

    const exclude = ["/","/auth/login"];

    if (exclude.includes(location)) {
      return <>{children}</>;
    }

  return (
    <>
      <SidebarLeft />
      <main className="w-7/12 h-screen scrollbar-thin scrollbar-track-slate-800 overflow-x-hidden overflow-y-auto py-20 px-5 bg-[#FAFAFA]">{children}</main>
      <SidebarRight />
    </>
  );
}
