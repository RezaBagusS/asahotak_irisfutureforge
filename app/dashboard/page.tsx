"use client";

import CustBanner from "../components/atoms/custBanner";
import CustCardBoard from "../components/atoms/custCardBoard";
import profileIcon from "../assets/icons/profileIcon.svg";
import CustCardMyCourses from "../components/atoms/custCardMyCourses";
import { useEffect, useRef } from "react";
import MobileViewDashboard from "../components/molecules/mobileViewDashboard";
import HeaderDashboard from "../components/molecules/headerDashboard";
import { useDispatch } from "react-redux";
import { setPopup } from "../redux/slices/reduxPopUpSlices";

const dataBoard = [
  {
    title: "Your Score",
    score: 825,
  },
  {
    title: "Complete Try Out",
    score: 2,
  },
  {
    title: "Upcoming Try Out",
    score: 1,
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

interface DashboardPageProps {}

export default function DashboardPage({}: DashboardPageProps) {
  const cardBoxRef = useRef<HTMLDivElement>(null);
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
            <h2 className="text-custPrimary font-bold text-2xl sm:text-3xl">My Course</h2>
            <p className="text-custPrimary text-sm cursor-pointer">See all</p>
          </div>
          <div className="flex w-full relative">
            <span className="absolute h-full z-20 left-0 px-4 bg-gradient-to-r from-custWhite"></span>
            <div
              ref={cardBoxRef}
              className="w-auto overflow-x-auto scrollbar-thin flex gap-7 py-4 ps-3"
            >
              {dataMyCourse.map((item, index) => {
                const { title, desc, profile } = item;
                return (
                  <CustCardMyCourses
                    title={title}
                    desc={desc}
                    profile={profile}
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
