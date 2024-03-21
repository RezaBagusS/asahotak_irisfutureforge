"use client";

import CustButtonMenuMobile from "@/app/components/atoms/custButtonMenuMobile";
import FooterModule from "@/app/components/molecules/footerModule";
import { formatDate } from "@/app/helpers/dateHandler";
import { getDetailTryout } from "@/app/helpers/tbl-tryout";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBusinessTime } from "react-icons/fa";
import { SlDocs } from "react-icons/sl";
import { CgReadme } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { setPopup } from "@/app/redux/slices/reduxPopUpSlices";

interface stateDataTryout {
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
  }[];
}

interface PageProps {}

export default function Page({}: PageProps) {
  const searchParams = useSearchParams();
  const search = searchParams.get("id");
  const dispatch = useDispatch();
  const route = useRouter();

  const userData = useSelector((state: any) => state.userData.data);
  const [detailData, setDetailData] = useState<stateDataTryout>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getDetailTryout(userData.id, search ?? "");

      if (!res.error) {
        console.log(res.data);
        setDetailData(res.data);
      }

      if (res.error) {
        dispatch(
          setPopup({
            show: true,
            type: "warning",
            title: "Error",
            message: res.message ?? "Error Fetching Data",
            onConfirm: () => {
              dispatch(setPopup({ show: false }));
              route.back();
            },
          })
        );
      }
    };

    fetchData();
  }, [search]);

  return (
    <div className="w-full relative text-custBlack">
      {detailData ? (
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
                  {detailData.name}
                </h1>
                <div className="flex items-center justify-start gap-5">
                  <p className="text-gray-500 flex gap-1 items-center text-xs md:text-sm">
                    <FaBusinessTime className="text-lg" />{" "}
                    {formatDate(detailData.start_date)} -{" "}
                    {formatDate(detailData.end_date)}
                  </p>
                  <div className="flex gap-1 text-gray-500">
                    <SlDocs className="text-lg" />
                    <p className="text-xs md:text-sm ml-1">
                      {detailData.countMaterial} Subtest
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
                detailData.Material.map((item, index) => (
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
                      <Link
                        href={`/dashboard/module/tryout/${search}/${item.id_material}`}
                        className="text-white bg-custPrimary px-5 py-1 hover:underline"
                      >
                        Start
                      </Link>
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
        <></>
      )}
    </div>
  );
}
