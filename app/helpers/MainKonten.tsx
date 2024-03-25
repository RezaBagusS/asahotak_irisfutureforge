"use client";

import { FC, useEffect } from "react";
import SidebarLeft from "../components/molecules/sidebarLeft";
import SidebarRight from "../components/molecules/sidebarRight";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import store from "../redux/store";
import Popup from "../components/molecules/popup";
import PopupPPT from "../components/molecules/popupPPT";
import PopupTest from "../components/molecules/popupTest";

interface MainKontenProps {
  children: React.ReactNode;
}

export default function MainKonten<FC>({ children }: MainKontenProps) {
  const location = usePathname();

  const exclude = ["/", "/auth/login"];

  if (exclude.includes(location)) {
    return <Provider store={store}>
      <Popup />
      {children}
    </Provider>;
  }

  if (location.includes("/tryout/test")) {
    return <Provider store={store}>
      <Popup />
      <main className="w-full h-screen overflow-hidden px-12 py-8 bg-[#FAFAFA]">
        {children}
      </main>
    </Provider>;
  }

  return (
    <Provider store={store}>
      <Popup />
      <PopupTest />
      <PopupPPT />
      <SidebarLeft />
      <main className="w-full md:w-[75%] lg:w-9/12 xl:w-7/12 h-screen scrollbar-thin scrollbar-track-slate-800 overflow-x-hidden overflow-y-auto pt-12 md:pt-16 lg:pt-20 pb-14 px-5 bg-[#FAFAFA]">
        {children}
      </main>
      <SidebarRight />
    </Provider>
  );
}
