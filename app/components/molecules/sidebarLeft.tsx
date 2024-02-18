"use client";

import Image from "next/image";
import AOBlue from "../../assets/AOBlue.png";
import DashboardIcon from "@/app/assets/icons/DashboardIcon";
import CourseIcon from "@/app/assets/icons/CourseIcon";
import TryoutIcon from "@/app/assets/icons/TryoutIcon";
import SettingIcon from "@/app/assets/icons/SettingIcon";
import CustListModule from "../atoms/custListModule";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import CustButtonMenuMobile from "../atoms/custButtonMenuMobile";
import { useSelector } from "react-redux";

const dataModule = [
  {
    title: "Dashboard",
    link: "/dashboard",
  },
  {
    title: "Course",
    link: "/dashboard/courses",
  },
  {
    title: "Tryout",
    link: "/dashboard/tryout",
  },
  {
    title: "Setting",
    link: "/setting",
  },
];

const SidebarLeft = () => {
  const pathname = usePathname();
  const show = useSelector((state: any) => state.menuMobile.data.show);

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  const handleIcon = (title: string, link: string) => {
    switch (title) {
      case "Dashboard":
        return (
          <DashboardIcon
            height={20}
            width={20}
            fill={pathname === link ? "white" : "black"}
          />
        );
      case "Course":
        return (
          <CourseIcon
            height={20}
            width={20}
            fill={pathname === link ? "white" : "black"}
          />
        );
      case "Tryout":
        return (
          <TryoutIcon
            height={20}
            width={20}
            fill={pathname === link ? "white" : "black"}
          />
        );
      case "Setting":
        return (
          <SettingIcon
            height={20}
            width={20}
            fill={pathname === link ? "white" : "black"}
          />
        );
      default:
        break;
    }
  };

  return (
    <aside
      className={`w-full md:w-[25%] lg:w-3/12 xl:w-2/12 absolute md:relative z-50 md:z-0 md:flex flex-col bg-white pt-12 md:pt-16 lg:pt-20 pb-14 px-6 h-screen
        ${show ? "left-0" : "-left-full md:left-0"} transition-all duration-300
      `}
    >
      <div className="relative flex justify-center">
        <Image src={AOBlue} priority alt="AOLogo" height={40} />
        <div className="absolute md:hidden right-0 top-1/2 -translate-y-1/2">
          <CustButtonMenuMobile />
        </div>
      </div>
      <div className="flex flex-col gap-3 mt-10">
        {dataModule.map((item, index) => {
          return (
            <CustListModule
              key={index}
              title={item.title}
              icon={handleIcon(item.title, item.link)}
              link={item.link}
              isActive={pathname === item.link}
            />
          );
        })}
      </div>
    </aside>
  );
};

export default SidebarLeft;
