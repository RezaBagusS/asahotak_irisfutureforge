import Calendar from "./calendar";
import CountDownBanner from "./countdownBanner";
import CustListSchedule from "../atoms/custListSchedule";

const dataSchedule = [
  {
    title: "Try Out Paket 1",
    date: "22 September 2023",
  },
  {
    title: "Try Out Paket 1",
    date: "22 September 2023",
  },
  {
    title: "Try Out Paket 1",
    date: "22 September 2023",
  },
  {
    title: "Try Out Paket 1",
    date: "22 September 2023",
  },
];

const MobileViewDashboard = () => {
    return (
        <div className="grid xl:hidden grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
          <Calendar />
          <div className="flex flex-col gap-5">
            {/* Countdown SNBT */}
            <CountDownBanner targetDate="2024-04-30" />

            {/* Schedule */}
            <div className="flex flex-col gap-5">
              <h2 className="text-custPrimary text-2xl font-bold">Schedule</h2>
              <div className="flex flex-col gap-3">
                {dataSchedule.map((item, index) => {
                  return (
                    <CustListSchedule
                      title={item.title}
                      date={item.date}
                      key={index}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
    )
}

export default MobileViewDashboard;