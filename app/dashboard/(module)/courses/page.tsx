"use client";

import HeaderCourses from "@/app/components/molecules/headerCourses";
import { FaUserGraduate } from "react-icons/fa6";
import ListCourses from "@/app/components/molecules/listCourses";
import FooterModule from "@/app/components/molecules/footerModule";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setPopup } from "@/app/redux/slices/reduxPopUpSlices";
import { useRouter } from "next/navigation";
import { getAllCourse } from "@/app/helpers/getCourse";

interface PageProps {}

export default function Page({}: PageProps) {

  const [dataCourses, setDataCourses] = useState([] as any);
  const dispatch = useDispatch();
  const route = useRouter();
  const userData = useSelector((state: any) => state.userData.data);

  useEffect(() => {
    !userData.getAccess &&
      dispatch(
        setPopup({
          title: "Access Denied",
          message: "You don't have access to this page",
          show: true,
          type: "warning",
          onConfirm: () => {
            dispatch(setPopup({ show: false }));
            route.push("/dashboard");
          },
        })
      );

      const getCourses = async () => {
        const res = await getAllCourse();
        if (res) {
          setDataCourses(res);
        }
      }

      getCourses();
    
  }, [userData]);

  return (
    <div className="w-full relative flex flex-col gap-5">
      <HeaderCourses />
      <div className="w-full bg-white rounded-md px-4 py-6">
        <h2 className="flex items-center gap-3 text-3xl font-bold text-custPrimary">
          <FaUserGraduate className="text-custPrimary" />
          Your Courses
        </h2>
        <p className="text-gray-500 mt-2 text-sm pb-4 border-b-2">
          Complete all the courses you have received
        </p>
      </div>
      <ListCourses dataCourse={dataCourses} />
      <FooterModule />
    </div>
  );
}
