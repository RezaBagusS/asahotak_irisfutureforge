"use client";

import CustButtonMenuMobile from "@/app/components/atoms/custButtonMenuMobile";
import FooterModule from "@/app/components/molecules/footerModule";
import { formatDate } from "@/app/helpers/dateHandler";
import { getDetailTryout, getStatusMaterial } from "@/app/helpers/tbl-tryout";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBusinessTime } from "react-icons/fa";
import { SlDocs } from "react-icons/sl";
import { CgReadme } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { setPopup } from "@/app/redux/slices/reduxPopUpSlices";
import { setPopupTest } from "@/app/redux/slices/reduxPopUpTestSlices";
import { hashLink } from "@/app/helpers/URLhelpers";

interface stateDataTryout {
  id_userTO: number;
  id_user: number;
  id_tryout: number;
  Tryout: {
    id_tryout: number;
    name: string;
    start_date: Date;
    end_date: Date;
    countMaterial: number;
    isMiniTO: boolean;
    Material: {
      id_material: number;
      name_material: string;
      countQuestion: number;
      userTOMaterial: {
        id_material: number;
        isCompleted: boolean;
      };
    }[];
  };
}

interface stateDataStatus {
  id_material: number;
  isCompleted: boolean;
  userTO: {
    id_user: number;
    id_tryout: number;
  }[];
}

interface PageProps {}

export default function Page({}: PageProps) {
  const searchParams = useSearchParams();
  const search = searchParams.get("id");
  const dispatch = useDispatch();
  const route = useRouter();

  const userData = useSelector((state: any) => state.userData.data);
  const [loading, setLoading] = useState(true);
  const [detailData, setDetailData] = useState<stateDataTryout>();
  const [statusMaterial, setStatusMaterial] = useState<stateDataStatus[]>([]);

  useEffect(() => {
    if (userData.id != 0) {
      const res = getStatusMaterial(userData.id, search ?? "");

      res.then((res: any) => {
        if (res.error) {
          dispatch(
            setPopup({
              title: "Error",
              type: "warning",
              message: res.message,
              show: true,
              onConfirm: () => {
                route.push("/dashboard/tryout");
                setLoading(false);
              },
            })
          );
        }

        if (res.data) {
          console.log("DATA STATUS : ", res.data);
          setStatusMaterial(res.data);
          setLoading(false);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (userData.id != 0) {
      const res = getDetailTryout(userData.id, search ?? "");

      res.then((res: any) => {
        if (res.error) {
          dispatch(
            setPopup({
              title: "Error",
              type: "warning",
              message: res.message,
              show: true,
              onConfirm: () => {
                route.push("/dashboard/tryout");
                setLoading(false);
              },
            })
          );
        }

        if (res.data) {
          console.log("DATA DETAIL : ", res.data);

          setDetailData(res.data);
          setLoading(false);
        }
      });
    }
  }, [userData]);

  const handleClickStart = () => {
    dispatch(
      setPopupTest({
        show: true,
      })
    );
  };

  const testRemaining = (id_material: number) => {
    if (typeof window !== "undefined") {
      const session = atob(localStorage.getItem("testSession") ?? "");

      if (session) {
        const sessionData = JSON.parse(session);

        if (id_material == parseInt(sessionData.id_material)) {

          const isRunning =
            new Date(sessionData.end_test).getTime() > new Date().getTime();

          if (isRunning) {
            return true;
          } else {
            return false;
          }
        }
      }
    }
  };

  const handleButtonSubtest = (id_material: number) => {
    const status = statusMaterial.find(
      (item) => item.id_material === id_material
    );

    const isCompleted = status?.isCompleted;

    if (testRemaining(id_material)) {
      return (
        <Link
          href={`/dashboard/tryout/test?id=${search}&subtest=${id_material}`}
        >
          <button className="text-white bg-custThird w-32 text-center px-5 py-1 cursor-pointer">
            Continue
          </button>
        </Link>
      );
    }

    return isCompleted ? (
      <Link href={``}>
        <button className="text-white bg-gray-400 w-32 text-center px-5 py-1 cursor-pointer">
          Review
        </button>
      </Link>
    ) : (
      <Link
        onClick={handleClickStart}
        href={`/dashboard/tryout/detail?id=${search}&subtest=${id_material}`}
        className="text-white bg-custPrimary w-32 text-center px-5 py-1 hover:underline"
      >
        Start
      </Link>
    );
  };

  return (
    <>
      <div className="w-full relative text-custBlack">
        {loading ? (
          <>
            <div className="w-full mt-5 rounded-md bg-white p-5 animate-pulse">
              <div className="w-full flex flex-col gap-3">
                <div className="font-bold text-lg bg-gray-400 w-2/3 p-4 rounded-md animate-pulse"></div>
                <div className="flex gap-5">
                  <div className="text-xs bg-gray-400 w-1/6 p-2 rounded-md animate-pulse"></div>
                  <div className="px-5 py-3 w-20 bg-gray-400 rounded-md animate-pulse"></div>
                </div>
              </div>
            </div>
            <div className="w-full mt-5 rounded-md bg-white p-5 animate-pulse">
              <h1 className="text-2xl font-bold text-custPrimary bg-gray-400 p-5 w-1/3 border-b rounded-md"></h1>
              <div className="flex flex-col gap-5 mt-3">
                <div className="w-full flex justify-between items-center h-[118px] animate-pulse">
                  <div className="w-full flex flex-col gap-3">
                    <div className="font-bold text-lg bg-gray-400 w-1/3 p-4 rounded-md"></div>
                    <div className="text-xs bg-gray-400 w-1/6 p-2 rounded-md"></div>
                  </div>
                  <div className="px-5 py-3 w-20 bg-gray-400"></div>
                </div>
                <div className="w-full flex justify-between items-center h-[118px] animate-pulse">
                  <div className="w-full flex flex-col gap-3">
                    <div className="font-bold text-lg bg-gray-400 w-1/3 p-4 rounded-md"></div>
                    <div className="text-xs bg-gray-400 w-1/6 p-2 rounded-md"></div>
                  </div>
                  <div className="px-5 py-3 w-20 bg-gray-400"></div>
                </div>
              </div>
            </div>
          </>
        ) : detailData ? (
          <>
            <div className="flex md:hidden">
              <CustButtonMenuMobile />
            </div>
            <div className="flex md:hidden gap-1.5 items-center mt-3">
              <button
                onClick={() => route.back()}
                className="font-semibold text-sm hover:text-slate-500"
              >
                {"< "} Back to Tryout
              </button>
            </div>
            <div className="w-full mt-5 md:m-0 rounded-md bg-white p-5">
              {detailData && (
                <div className="flex flex-col gap-5">
                  <h1 className="flex items-center gap-3 text-3xl font-bold text-custPrimary">
                    <CgReadme />
                    {detailData.Tryout.name}
                  </h1>
                  <div className="flex items-center justify-start gap-5">
                    <p className="text-gray-500 flex gap-1 items-center text-xs md:text-sm">
                      <FaBusinessTime className="text-lg" />{" "}
                      {formatDate(detailData.Tryout.start_date)} -{" "}
                      {formatDate(detailData.Tryout.end_date)}
                    </p>
                    <div className="flex gap-1 text-gray-500">
                      <SlDocs className="text-lg" />
                      <p className="text-xs md:text-sm ml-1">
                        {detailData.Tryout.countMaterial} Subtest
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="w-full mt-5 rounded-md bg-white p-5">
              <h1 className="text-2xl font-bold text-custPrimary pb-3 border-b">
                Subtest
              </h1>
              <div className="flex flex-col gap-5 mt-3">
                {detailData &&
                  detailData.Tryout.Material.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <div className="flex flex-col gap-1">
                        <p className="text-lg font-semibold">
                          {item.name_material}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {item.countQuestion} Questions
                        </p>
                      </div>
                      <div className="flex items-center pe-4">
                        {handleButtonSubtest(item.id_material)}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="mt-5">
              <FooterModule />
            </div>
          </>
        ) : (
          <div className="w-full mt-5 rounded-md bg-white p-5">
            <h1 className="text-2xl font-bold text-custPrimary pb-3 border-b">
              No Data Found
            </h1>
          </div>
        )}
      </div>
    </>
  );
}
