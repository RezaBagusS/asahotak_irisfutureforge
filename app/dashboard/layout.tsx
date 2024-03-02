"use client";

import { getActiveUser } from "../helpers/localStorage";
import { useDispatch } from "react-redux";
import { setPopup } from "../redux/slices/reduxPopUpSlices";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { setUserData } from "../redux/slices/reduxUserDataSlices";

interface PageProps {
  children: React.ReactNode;
}

export default function Page({ children }: PageProps) {
  const dispatch = useDispatch();
  const route = useRouter();

  useEffect(() => {
    const getActiveUser = () => {
      const expirationTime = localStorage.getItem("asahOtak_EP728");

      const hasToken =
        localStorage.getItem("asahOtak_TN903") &&
        localStorage.getItem("asahOtak_UD348") &&
        expirationTime !== null &&
        Date.now() < Number(expirationTime) * 1000;

      return hasToken;
    };

    !getActiveUser() &&
      dispatch(
        setPopup({
          title: "Session Expired",
          message: "Please login again",
          show: true,
          type: "warning",
          onConfirm: () => route.push("/auth/login"),
        })
      );

      const getUser = () => {
        if (localStorage.getItem("asahOtak_TN903") == null) {
          return {};
        } else if (
          Date.now() >
          parseInt(localStorage.getItem("asahOtak_EP728") || "0") * 1000
        ) {
          alert("Your session is expired. Please login again.");
          localStorage.clear();
          return {};
        } else {
          try {
            let decoded = atob(localStorage.getItem("asahOtak_UD348") || "");
            return JSON.parse(decoded);
          } catch (e) {
            return {};
          }
        }
      };

      dispatch(setUserData(getUser()));

  }, []);

  return <div className="">{children}</div>;
}
