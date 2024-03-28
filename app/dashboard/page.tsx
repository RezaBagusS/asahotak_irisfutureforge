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
import { useSelector } from "react-redux";
import { getHaveTryout, getResultBoard } from "../helpers/tbl-tryout";
import { VscLoading } from "react-icons/vsc";
import Calendar from "../components/molecules/calendar";
import CountDownBanner from "../components/molecules/countdownBanner";
import { PiWarningCircleBold } from "react-icons/pi";

const dataBoardDefault = [
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

interface stateDataTryout {
  Tryout: {
    id_tryout: number;
    name: string;
    start_date: Date;
    end_date: Date;
    countMaterial: number;
    isMiniTO: boolean;
  };
  id_userTO: number;
  id_user: number;
  resultTO: number;
  isCompleted: boolean;
}

interface stateDataBoard {
  title: string;
  score: number;
}

interface DashboardPageProps {}

export default function DashboardPage({}: DashboardPageProps) {
  const cardBoxRef = useRef<HTMLDivElement>(null);
  const [dataInfo, setDataInfo] = useState<UpdateInfo[]>([]);
  const isDraggingRef = useRef(false);
  const [dataTryout, setDataTryout] = useState<stateDataTryout[]>([]);
  const [dataBoard, setDataBoard] = useState<stateDataBoard[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingBoard, setLoadingBoard] = useState(true);
  const [loadingInfo, setloadingInfo] = useState(true);
  const userData = useSelector((state: any) => state.userData.data);

  useEffect(() => {
    const fetchDataTryout = async () => {
      const res = await getHaveTryout(userData.id);

      if (res.data) {
        const filteredData = res.data
          .filter((item) => item.Tryout.start_date >= new Date())
          .sort(
            (a, b) =>
              new Date(a.Tryout.start_date).getTime() -
              new Date(b.Tryout.start_date).getTime()
          );

        const data =
          filteredData.length > 3 ? filteredData.slice(0, 3) : filteredData;

        setDataTryout(data);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } else {
        setLoading(false);
      }
    };

    const fetchDataBoard = async () => {
      const res = await getResultBoard(userData.id);

      if (!res.error) {
        if (res.data) {
          setDataBoard(res.data);
        }
        setTimeout(() => {
          setLoadingBoard(false);
        }, 500);
      } else {
        setLoadingBoard(false);
      }
    };

    fetchDataTryout();
    fetchDataBoard();
  }, [userData]);

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
    setloadingInfo(true);

    const fetchAllDataInfo = async () => {
      const res = await getAllUpdateInfo();

      if (res) {
        res.sort((a, b) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });
        setDataInfo(res);
        setloadingInfo(false);
      } else {
        setloadingInfo(false);
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
      <div className="flex flex-col gap-5 md:gap-8 xl:gap-14 ">
        <CustBanner />

        {/* MOBILE VIEW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 xl:hidden">
          <Calendar dataTO={dataTryout} />
          <div className="flex flex-col gap-5">
            {/* Countdown SNBT */}
            <CountDownBanner targetDate="2024-04-30" />

            {/* Schedule Mobile */}
            <div className="flex flex-col gap-3 xl:hidden">
              {loading ? (
                <div className="bg-white flex gap-5 items-center rounded-xl p-7">
                  <VscLoading className="text-3xl text-custPrimary animate-spin" />
                  <div className="flex flex-col gap-1 text-sm">
                    <h3 className="font-bold">Loading...</h3>
                  </div>
                </div>
              ) : dataTryout.length > 0 ? (
                <MobileViewDashboard dataTO={dataTryout} />
              ) : (
                <div className="bg-white flex gap-5 items-center rounded-xl p-7">
                  <PiWarningCircleBold className="text-3xl text-custPrimary" />
                  <div className="flex flex-col gap-1 text-sm">
                    <h3 className="font-bold">
                      No one schedule available, keep learning!
                    </h3>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* DESKTOP VIEW */}
        {/* Score Board */}
        {loadingBoard ? (
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-7">
            {Array.from({ length: 3 }).map((_, index) => {
              return (
                <div
                  key={index}
                  className="relative flex flex-col p-3 items-start justify-center w-full animate-pulse sm:w-1/3 h-20 sm:h-28 bg-gray-200 text-custPrimary rounded-3xl shadow-md"
                >
                  <p className="text-xs sm:text-sm font-normal bg-gray-300 p-2 rounded-md w-2/3 mb-2"></p>
                  <p className="text-base sm:text-lg font-bold bg-gray-300 p-4 rounded-md w-1/2"></p>
                  <span className="absolute top-4 sm:top-5 right-4 h-auto px-2 py-4 rounded-md bg-gray-300"></span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-7">
            {dataBoard.map((item, index) => {
              const { score, title } = item;
              return <CustCardBoard title={title} score={score} key={index} />;
            })}
          </div>
        )}

        {/* Course Info */}
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
              {loadingInfo ? (
                Array.from({ length: 3 }).map((_, index) => {
                  return (
                    <div
                      key={index}
                      className="min-h-40 min-w-72 px-7 pt-7 pb-3 bg-gray-200 flex flex-col justify-between gap-2 animate-pulse rounded-3xl shadow-md"
                    >
                      <div className="flex flex-col gap-2">
                        <h3 className="text-sm font-semibold p-3 bg-gray-300 rounded-md w-1/2"></h3>
                        <p className="text-xs p-3 rounded-md bg-gray-300 w-2/3"></p>
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-gray-300"></span>
                          <p className="text-xs bg-gray-300 rounded-md w-12 p-2"></p>
                        </div>
                        <p className="bg-gray-300 rounded-md w-1/3 p-2"></p>
                      </div>
                    </div>
                  );
                })
              ) : dataInfo.length > 0 ? (
                dataInfo.map((item, index) => {
                  return <CustCardMyCourses dataInfo={item} key={index} />;
                })
              ) : (
                <div className="flex">
                  <p className="italic text-sm text-center">
                    No one course available, take a course and keep learning!
                  </p>
                </div>
              )}
            </div>
            <span className="absolute h-full z-20 right-0 px-4 bg-gradient-to-l from-custWhite"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
