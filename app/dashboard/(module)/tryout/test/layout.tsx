"use client";

import { isAccessTest } from "@/app/helpers/testHelpers";
import { setPopup } from "@/app/redux/slices/reduxPopUpSlices";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface PageProps {
  children: React.ReactNode;
}

export default function Page({ children }: PageProps) {
  const search = useSearchParams();
  const userData = useSelector((state: any) => state.userData.data);
  const idTryout = search.get("id") as string;
  const getSubtest = search.get("subtest") as string;

  const dispatch = useDispatch();
  const route = useRouter();

  useEffect(() => {
    const res = isAccessTest(
      userData.id,
      idTryout,
      parseInt(getSubtest)
    );

    res.then((data) => {
      if (data.error) {
        dispatch(setPopup({
            show: true,
            message: data.message,
            type: "warning",
            onConfirm: () => {
                dispatch(setPopup({ show: false }))
                route.back();
            }
        }))
      }
    }).catch((err) => {
        console.log(err);
    });
  }, [userData, search.get("id"), search.get("subtest")]);

  return <Suspense>{children}</Suspense>;
}
