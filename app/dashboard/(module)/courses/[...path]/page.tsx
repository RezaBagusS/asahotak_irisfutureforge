"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPopup } from "@/app/redux/slices/reduxPopUpSlices";
import { useRouter } from "next/navigation";
import ListMaterial from "@/app/components/molecules/listMaterial";
import CustButtonMenuMobile from "@/app/components/atoms/custButtonMenuMobile";
import FooterModule from "@/app/components/molecules/footerModule";
import { getCourseBySlug } from "@/app/helpers/getCourse";

interface PageProps {
  params: {
    path: string;
  };
}

interface lesson {
  id_lesson?: number;
  title?: string;
  codeLesson?: string;
  link_ppt?: string | "";
  link_video?: string | "";
  link_quiz?: string | "";
  openLesson?: boolean;
  id_course?: number;
  isDone?: boolean;
  createdAt?: Date;
}

interface stateDataCourse {
  title?: string;
  description?: string;
  codeCourse?: string;
  countCourse?: number;
  percentage?: number;
  lesson?: lesson[];
}

const Page = ({ params }: PageProps) => {
  const [data, setData] = useState<stateDataCourse>();
  const { path } = params;
  const dispatch = useDispatch();
  const route = useRouter();
  const userData = useSelector((state: any) => state.userData.data);

  useEffect(() => {
    if (userData.username != "") {
      dispatch(
        setPopup({
          show: true,
          type: "loading",
          title: "Loading",
          message: "Wait a moment . . .",
        })
      );

      const dataCourse = async () => {
        const data = await getCourseBySlug(path[0], path[1], userData.id);

        if (!data.error) {
          console.log("DATA : ", data);
          setData(data as stateDataCourse);
          setTimeout(() => {
            dispatch(
              setPopup({
                show: false,
              })
            );
          }, 700);
        } else {
          dispatch(
            setPopup({
              show: true,
              type: "warning",
              title: "Not Found",
              message: data.message || "Course not found",
              onConfirm: () => {
                dispatch(setPopup({ type: "loading", message: "Back to course", show: true}));
                route.push("/dashboard/courses");
              },
            })
          );
        }
      };

      dataCourse();
    }
  }, [userData, params]);

  const modifiedPath = params.path[1]
    .toString()
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const handleColorPercentage = (percentage: number) => {
    if (percentage === 100) {
      return "ring-custFourth";
    } else if (percentage >= 50) {
      return "ring-custSecondary";
    } else {
      return "ring-custThird";
    }
  };

  return (
    <div className="w-full relative text-custBlack">
      <div className="flex md:hidden">
        <CustButtonMenuMobile />
      </div>
      <div className="flex gap-1.5 items-center">
        <Link
          href={"/dashboard/courses"}
          className="font-semibold text-sm hover:text-slate-500"
        >
          Courses
        </Link>
        <span className="text-gray-400">
          {`/`} {modifiedPath}
        </span>
      </div>
      <div className="w-full grid grid-cols-12 mt-5 rounded-md bg-white py-10 px-5">
        <div className="col-span-8 flex flex-col gap-5">
          <h1 className="text-4xl font-bold">{data?.title}</h1>
          <p className="text-gray-500">{data?.description}</p>
        </div>
        <div className="col-span-4 grid place-content-center">
          <span
            className={`w-20 h-20 rounded-full grid place-content-center ring-4 text-base font-semibold
            ${handleColorPercentage(data?.percentage || 0)}
          `}
          >
            {data?.percentage}%
          </span>
        </div>
      </div>
      <ListMaterial dataLesson={data?.lesson || []} />
      <div className="mt-5">
        <FooterModule />
      </div>
    </div>
  );
};

export default Page;
