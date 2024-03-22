import { motion } from "framer-motion";
import HeaderRightSide from "./headerRightSide";
import Calendar from "./calendar";
import CountDownBanner from "./countdownBanner";
import CustListSchedule from "../atoms/custListSchedule";
import { useEffect, useState } from "react";
import { getHaveTryout } from "@/app/helpers/tbl-tryout";
import { useSelector } from "react-redux";
import { formatDate } from "@/app/helpers/dateHandler";
import { PiWarningCircleBold } from "react-icons/pi";
import { VscLoading } from "react-icons/vsc";

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

const SidebarRight = () => {
  const [dataTryout, setDataTryout] = useState<stateDataTryout[]>([]);
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state: any) => state.userData.data);

  useEffect(() => {
    const fetchData = async () => {
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
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchData();
  }, [userData]);

  return (
    <motion.aside
      initial={{ opacity: 0, x: 70 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.2, type: "tween" }}
      className="w-3/12 hidden xl:flex flex-col gap-10 pt-12 md:pt-16 lg:pt-20 pb-14 px-6 h-screen scrollbar-thin scrollbar-track-slate-800 overflow-x-hidden overflow-y-auto"
    >
      {/* Header Right Side */}
      <HeaderRightSide />

      {/* Calendar Component */}
      <Calendar dataTO={dataTryout} />

      {/* Countdown SNBT */}
      <CountDownBanner targetDate="2024-04-30" />

      {/* Schedule */}
      <div className="flex flex-col gap-5">
        <h2 className="text-custPrimary text-2xl font-bold">Schedule</h2>
        <div className="flex flex-col gap-3">
          {loading ? (
            <div className="bg-white flex gap-5 items-center rounded-xl p-7">
              <VscLoading className="text-3xl text-custPrimary animate-spin" />
              <div className="flex flex-col gap-1 text-sm">
                <h3 className="font-bold">Loading...</h3>
              </div>
            </div>
          ) : dataTryout.length > 0 ? (
            dataTryout.map((item, index) => {
              return (
                <CustListSchedule
                  title={item.Tryout.name}
                  date={formatDate(item.Tryout.start_date)}
                  key={index}
                />
              );
            })
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
    </motion.aside>
  );
};

export default SidebarRight;
