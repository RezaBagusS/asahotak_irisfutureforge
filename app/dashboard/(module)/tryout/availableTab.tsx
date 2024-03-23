import CustCardTO from "@/app/components/atoms/custCardTO";
import BannerTryout from "@/app/components/molecules/bannerTryout";
import { getFutureTryout } from "@/app/helpers/tbl-tryout";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface stateDataTryout {
  id_tryout: number;
  name: string;
  start_date: Date;
  end_date: Date;
  countMaterial: number;
  totalMinutes: number;
  isClaimed: boolean;
}

const AvailableTab = () => {
  const [dataTryout, setDataTryout] = useState<stateDataTryout[]>([]);
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state: any) => state.userData.data);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getFutureTryout(userData.id);
      setDataTryout(res);
      setLoading(false);
      console.log("Data Tryout : ", res);
      
    };

    fetchData();
  }, []);

  return (
    <div className="w-full flex flex-col gap-3 relative">
      <BannerTryout />
      {loading ? (
        <div className="w-full flex justify-between items-center h-[118px] bg-slate-300 animate-pulse px-4">
          <div className="w-full flex flex-col gap-3">
            <div className="font-bold text-lg bg-gray-400 w-1/3 p-4 rounded-md"></div>
            <div className="text-xs bg-gray-400 w-1/6 p-2 rounded-md"></div>
          </div>
          <div className="px-5 py-3 w-20 bg-gray-400"></div>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-3">
          {dataTryout.length > 0 ? (
            dataTryout.map((item, index) => {
              return <CustCardTO key={index} data={item} />;
            })
          ) : (
            <div className="w-full flex justify-center items-center">
              <p>No Tryout Available</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AvailableTab;
