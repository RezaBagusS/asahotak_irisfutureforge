
import CustListSchedule from "../atoms/custListSchedule";
import { formatDate } from "@/app/helpers/dateHandler";

interface stateDataTryout {
  dataTO: {
    id_tryout: number;
    name: string;
    start_date: Date;
    end_date: Date;
    countMaterial: number;
    isMiniTO: boolean;
  }[];
}

const MobileViewDashboard = ({ dataTO }: stateDataTryout) => {
  return (
    <>
      {/* Schedule */}
      <div className="flex flex-col gap-5">
        <h2 className="text-custPrimary text-2xl font-bold">Schedule</h2>
        <div className="flex flex-col gap-3">
          {dataTO.map((item, index) => {
            return (
              <CustListSchedule
                title={item.name}
                date={formatDate(item.start_date)}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MobileViewDashboard;
