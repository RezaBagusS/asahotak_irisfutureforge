"use client";

import { GrTest } from "react-icons/gr";
import { useEffect, useState } from "react";
import AvailableTab from "./availableTab";
import MyTryoutTab from "./myTryoutTab";
import CustButtonMenuMobile from "@/app/components/atoms/custButtonMenuMobile";
import FooterModule from "@/app/components/molecules/footerModule";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface PageProps {}

export default function Page({}: PageProps) {

  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("available");

  const params = searchParams.get("active");

  const handleTab = (tab: string) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if (params) {
      setActiveTab(params);
    }
  }, [params]);

  return (
    <div className="w-full relative text-custBlack">
      <div className="md:hidden pb-2">
        <CustButtonMenuMobile />
      </div>
      <div className="w-full bg-white rounded-md px-4 py-6">
        <h2 className="flex items-center gap-3 text-3xl font-bold text-custPrimary">
          <GrTest className="text-custPrimary" />
          Tryout -
        </h2>
        <p className="text-gray-500 mt-2 text-sm pb-4 border-b-2">
          Get ready for the test, and good luck!
        </p>
      </div>
      <div className="flex gap-5 mt-4 md:mt-7">
      <Link
          href="/dashboard/tryout?active=available"
          onClick={() => handleTab("available")}
          className={`px-3 py-2 cursor-pointer rounded-md text-xs md:text-sm drop-shadow-sm
          ${
            activeTab == "available"
              ? "bg-custPrimary text-white"
              : "bg-white text-custBlack"
          }
        `}
        >
          Available
        </Link>
        <Link
          href="/dashboard/tryout?active=mytryout"
          onClick={() => handleTab("mytryout")}
          className={`px-3 py-2 cursor-pointer rounded-md text-xs md:text-sm drop-shadow-sm
          ${
            activeTab == "mytryout"
              ? "bg-custPrimary text-white"
              : "bg-white text-custBlack"
          }
        `}
        >
          MyTryout
        </Link>
      </div>
      <div className="bg-white mt-5 rounded-md px-4 py-6">
        {activeTab == "available" ? <AvailableTab /> : <MyTryoutTab />}
      </div>
      <div className="mt-5">
        <FooterModule />
      </div>
    </div>
  );
}
