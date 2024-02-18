"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPopup } from "@/app/redux/slices/reduxPopUpSlices";
import { useRouter } from "next/navigation";
import SearchField from "@/app/components/molecules/searchField";

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
    <div className="w-full relative">
      <SearchField />
    </div>
  );
}
