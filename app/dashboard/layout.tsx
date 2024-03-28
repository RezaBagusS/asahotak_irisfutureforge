"use client";

import { useDispatch } from "react-redux";
import { setPopup } from "../redux/slices/reduxPopUpSlices";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { setUserData } from "../redux/slices/reduxUserDataSlices";

interface PageProps {
  children: React.ReactNode;
}

export default function Page({ children }: PageProps) {
  const dispatch = useDispatch();
  const route = useRouter();
  const location = usePathname();

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

    const getUser = () => {
      try {
        let decoded = atob(localStorage.getItem("asahOtak_UD348") || "");
        return JSON.parse(decoded);
      } catch (e) {
        return {};
      }
    };

    if (!getActiveUser()) {
      dispatch(
        setPopup({
          title: "Session Expired",
          message: "Please login again",
          show: true,
          type: "warning",
          onConfirm: () => {
            dispatch(
              setPopup({
                title: "Loading",
                message: "Redirect to Login Page . . .",
                show: true,
                type: "loading",
              })
            );
            setTimeout(() => {
              dispatch(setPopup({ show: false }));
              route.push("/");
            }, 1000);
          },
        })
      );
    } else {
      dispatch(
        setUserData({
          id: getUser().id,
          username: getUser().username,
          email: getUser().email,
          isInsentif: getUser().isInsentif,
          getAccess: getUser().getAccess,
        })
      );
      dispatch(setPopup({ show: false }));
    }

    //   location.includes("/tryout") &&  getUser().username != "muezzaID" &&
    // dispatch(
    //   setPopup({
    //     title: "On Development",
    //     message: "This page is still on development, please come back later.",
    //     show: true,
    //     type: "warning",
    //     onConfirm: () => {
    //       dispatch(setPopup({ show: false }));
    //       route.push("/dashboard");
    //     },
    //   })
    // );
  }, [location]);

  return <div>{children}</div>;
}
