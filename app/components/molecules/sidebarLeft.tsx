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
    <motion.aside
      initial={{ opacity: 0, x: -70 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.2, type: "tween" }}
      className="w-2/12 bg-white py-20 px-6 h-screen"
    >
      <div className="flex justify-center">
        <Image src={AOBlue} priority alt="AOLogo" height={40} />
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
    </motion.aside>
  );
};

export default SidebarLeft;
