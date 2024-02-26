"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPopup } from "@/app/redux/slices/reduxPopUpSlices";
import { useRouter } from "next/navigation";
import HeaderCourses from "@/app/components/molecules/headerCourses";
import { FaUserGraduate } from "react-icons/fa6";
import ListCourses from "@/app/components/molecules/listCourses";
import FooterModule from "@/app/components/molecules/footerModule";

interface PageProps {}

export default function Page({}: PageProps) {
  const navigate = useRouter();
  const dispatch = useDispatch();
  const show = useSelector((state: any) => state.popup.data.show);

  //   useEffect(() => {

  //     setTimeout(() => {
  //       dispatch(
  //         setPopup({
  //           show: true,
  //             type: "success",
  //             title: "Success!",
  //             message: "Congratulations your account has been successfully created",
  //             onConfirm: () => {
  //                 dispatch(setPopup({ show: false }));
  //             }
  //         })
  //       );

  //     }, 100);
  //   }, []);

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
      <ListCourses />
      <FooterModule />
    </div>
  );
}
