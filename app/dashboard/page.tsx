"use client";

import CustBanner from "../components/atoms/custBanner";
import CustCardBoard from "../components/atoms/custCardBoard";
import profileIcon from "../assets/icons/profileIcon.svg";
import CustCardMyCourses from "../components/atoms/custCardMyCourses";
import { useEffect, useRef, useState } from "react";
import MobileViewDashboard from "../components/molecules/mobileViewDashboard";
import HeaderDashboard from "../components/molecules/headerDashboard";
import Link from "next/link";
import { getAllUpdateInfo } from "@/app/helpers/updateInfoHelper";

const dataBoard = [
  {
    title: "Your Score",
    score: "Coming Soon",
  },
  {
    title: "Complete Try Out",
    score: "Coming Soon",
  },
  {
    title: "Upcoming Try Out",
    score: "Coming Soon",
  },
];

const dataMyCourse = [
  {
    title: "Kemampuan Kuantitif",
    desc: "Record Materi Pertemuan ke-4",
    profile: {
      icon: profileIcon,
      name: "Rehan Risqi Saputra",
    },
  },
  {
    title: "Kemampuan Kuantitif",
    desc: "Record Materi Pertemuan ke-4",
    profile: {
      icon: profileIcon,
      name: "Rehan Risqi Saputra",
    },
  },
  {
    title: "Kemampuan Kuantitif",
    desc: "Record Materi Pertemuan ke-4",
    profile: {
      icon: profileIcon,
      name: "Rehan Risqi Saputra",
    },
  },
  {
    title: "Kemampuan Kuantitif",
    desc: "Record Materi Pertemuan ke-4",
    profile: {
      icon: profileIcon,
      name: "Rehan Risqi Saputra",
    },
  },
];

interface UpdateInfo {
  id: number;
    id_course: number;
    course: string | undefined;
    commit_message: string;
    admin: string;
    createdAt: Date;
    link: string;
}

interface DashboardPageProps {}

export default function DashboardPage({}: DashboardPageProps) {
  const cardBoxRef = useRef<HTMLDivElement>(null);
  const [dataInfo, setDataInfo] = useState<UpdateInfo[]>([]);
  const isDraggingRef = useRef(false);

  const startDrag = (e: any) => {
    isDraggingRef.current = true;
  };

  const endDrag = () => {
    isDraggingRef.current = false;
  };

  const dragCard = (e: any) => {
    if (isDraggingRef.current && cardBoxRef.current) {
      cardBoxRef.current.scrollLeft -= e.movementX;
    }
  };

  useEffect(() => {
    const fetchAllDataInfo = async () => {
      const res = await getAllUpdateInfo();

      if (res) {
        res.sort((a, b) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        })
        setDataInfo(res);
      }
    };

    fetchAllDataInfo();

    const cardBox = cardBoxRef.current;

    if (cardBox) {
      cardBox.addEventListener("mousedown", startDrag);
      cardBox.addEventListener("mouseup", endDrag);
      cardBox.addEventListener("mousemove", dragCard);
    }

    return () => {
      if (cardBox) {
        cardBox.removeEventListener("mousedown", startDrag);
        cardBox.removeEventListener("mouseup", endDrag);
        cardBox.removeEventListener("mousemove", dragCard);
      }
    };
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <HeaderDashboard />
      <div className="flex flex-col gap-8 sm:gap-14">
        <CustBanner />
        <MobileViewDashboard />
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-7">
          {dataBoard.map((item, index) => {
            const { title, score } = item;
            return <CustCardBoard title={title} score={score} key={index} />;
          })}
        </div>
        <div className="py-5">
          <div className="flex justify-between items-end">
            <h2 className="text-custPrimary font-bold text-2xl sm:text-3xl">
              My Course
            </h2>
            <Link
              href={"/dashboard/courses"}
              className="text-custPrimary text-sm cursor-pointer"
            >
              See all
            </Link>
          </div>
          <div className="flex w-full relative">
            <span className="absolute h-full z-20 left-0 px-4 bg-gradient-to-r from-custWhite"></span>
            <div
              ref={cardBoxRef}
              className="w-auto overflow-x-auto scrollbar-thin flex gap-7 py-4 ps-3"
            >
              {dataInfo.map((item, index) => {

                return (
                  <CustCardMyCourses
                    dataInfo={item}
                    key={index}
                  />
                );
              })}
            </div>
            <span className="absolute h-full z-20 right-0 px-4 bg-gradient-to-l from-custWhite"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
