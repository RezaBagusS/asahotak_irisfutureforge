import { motion } from "framer-motion";
import HeaderRightSide from "./headerRightSide";
import Calendar from "./calendar";
import CountDownBanner from "./countdownBanner";
import CustListSchedule from "../atoms/custListSchedule";

const dataSchedule = [
  {
    title: "Try Out Paket 1",
    date: "22 September 2023"
  },
  {
    title: "Try Out Paket 1",
    date: "22 September 2023"
  },
  {
    title: "Try Out Paket 1",
    date: "22 September 2023"
  },
  {
    title: "Try Out Paket 1",
    date: "22 September 2023"
  },
]

const SidebarRight = () => {
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
      <Calendar />

      {/* Countdown SNBT */}
      <CountDownBanner targetDate="2024-04-30" />

      {/* Schedule */}
      <div className="flex flex-col gap-5">
        <h2 className="text-custPrimary text-2xl font-bold">Schedule</h2>
        <div className="flex flex-col gap-3">
          {
            dataSchedule.map((item, index) => {
              return <CustListSchedule title={item.title} date={item.date} key={index} />
            })
          }
        </div>
      </div>
    </motion.aside>
  );
};

export default SidebarRight;
