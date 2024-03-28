"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllDataTest, getQuestion } from "@/app/helpers/testHelpers";
import { useDispatch } from "react-redux";
import { setPopup } from "@/app/redux/slices/reduxPopUpSlices";
import HeaderTo from "@/app/components/molecules/TO/headerTO";
import Navigation from "@/app/components/molecules/TO/navigation";
import QuestionField from "@/app/components/molecules/TO/questionField";
import { getUser } from "@/app/helpers/localStorage";
import { hashLink } from "@/app/helpers/URLhelpers";

interface stateDataQuestions {
  Material: {
    id_material: number;
    name_material: string;
    countQuestion: number;
    time: number;
    Questions: {
      soal: string;
      id_soal: number;
    }[];
  }[];
  name: string;
  start_date: Date;
  end_date: Date;
}

interface Questions {
  soal: string;
  id_soal: number;
}
[];

const Test = () => {
  const [data, setData] = useState<stateDataQuestions>();
  const route = useRouter();
  const search = useSearchParams();
  const idTryout = search.get("id");
  const idMaterial = parseInt(search.get("subtest") || "0") || 0;
  const page = parseInt(search.get("page") || "0") || 0;
  const location = usePathname();
  const dispatch = useDispatch();

  const [dataSubmit, setDataSubmit] = useState<any>([]);

  // const userData = useSelector((state: any) => state.userData.data);

  const handleCheckSession = () => {
    console.log("Checking Session");

    if (typeof window !== "undefined") {
      const session = atob(localStorage.getItem("testSession") || "");
      const dataSubmit = atob(localStorage.getItem("dataSubmit") || "");
      console.log("SESSION : ", session);
      console.log("DATA SUBMIT : ", dataSubmit);

      if (dataSubmit) {
        const data = JSON.parse(dataSubmit);

        setDataSubmit(data);
      }
      

      if (session) {
        const data = JSON.parse(session);
        console.log("DATA : ", data);

        console.log(new Date(data.end_test) < new Date());

        if (new Date(data.end_test) < new Date()) {
          console.log("Session Expired");
          route.push(
            `/dashboard/tryout/detail?id=${idTryout}&subtest=${idMaterial}`
          );
          dispatch(
            setPopup({
              show: true,
              type: "warning",
              message: "Session Expired",
              onConfirm: () => {
                console.log("Session Expired");
              },
            })
          );
        }
      }
    }
  };

  useEffect(() => {
    dispatch(
      setPopup({
        show: true,
        type: "loading",
        message: "Preparing your Test . . .",
      })
    );

    handleCheckSession();

    if (idMaterial) {
      // const res = getQuestion(idMaterial);
      const res = fetch(`/api/v1/getDataTest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Allow-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          id_user: getUser().id,
          id_material: idMaterial,
        }),
      });

      res
        .then((item) => item.json())
        .then((item) => {
          item.data && setData(item.data.userTO.Tryout);
          console.log("DATA AWAL : ", item.data);
        })
        .catch((err) => {
          console.log("ERROR : ", err);
        })
        .finally(() => {
          dispatch(setPopup({ show: false }));
        });
    }
  }, [idMaterial, idTryout, location]);

  return (
    <div className="flex flex-col gap-5 min-h-full">
      {/* Header TO */}
      <HeaderTo time={data?.Material[0].time || 0} />

      {/* Content TO */}
      <div className="grid grid-cols-12 w-full h-[70vh]">
        {/* Left Content */}

        <Navigation
          count={data?.Material[0].countQuestion || 0}
          idTryout={idTryout || ""}
          idMaterial={idMaterial}
          dataSubmit={dataSubmit}
          page={page}
        />

        {/* Right Content */}
        <QuestionField
          data={data?.Material[0].Questions}
          idTryout={idTryout || ""}
          idMaterial={idMaterial}
          dataSubmit={dataSubmit}
          setDataSubmit={setDataSubmit}
        />
      </div>
    </div>
  );
};

export default Test;
