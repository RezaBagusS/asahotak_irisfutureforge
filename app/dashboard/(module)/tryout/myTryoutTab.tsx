import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getHaveTryout } from "@/app/helpers/tbl-tryout";
import CustMyCardTO from "@/app/components/atoms/custMyCardTO";

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

const MyTryoutTab = () => {
  const userData = useSelector((state: any) => state.userData.data);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [dataTryout, setDataTryout] = useState<stateDataTryout[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getHaveTryout(userData.id);

      if (res.data) {
        setDataTryout(res.data);
      }

      setLoading(false);
    };

    fetchData();
  }, [userData.id]);

  return (
    <div className="w-full flex flex-col gap-3 relative">
      <div className="mb-5">
        <h1 className="text-2xl text-custPrimary font-bold">
          Lets, Complete your try out now!!
        </h1>
        <p className="text-gray-500 text-sm">
          Complete all the tryout you have received
        </p>
      </div>
      {
        loading ? (
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
                return <CustMyCardTO key={index} data={item} />
              })
            ) : (
              <div className="w-full flex justify-center items-center text-gray-500">
                <p>No Tryout Available</p>
              </div>
            )}
          </div>
        )
      }
    </div>
  );
};

export default MyTryoutTab;
