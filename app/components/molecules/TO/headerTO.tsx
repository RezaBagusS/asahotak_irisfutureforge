"client";

import { CgClose } from "react-icons/cg";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import Countdown from "react-countdown";
import { useDispatch } from "react-redux";
import { setPopup } from "@/app/redux/slices/reduxPopUpSlices";
import { useRouter } from "next/navigation";
import CustCountdown from "./countdown";

interface HeaderToProps {
  time: number; // Assuming time is used elsewhere (remove if unused)
}

const handleSession = () => {
  // Check for window object to avoid errors in SSR
  if (typeof window !== "undefined") {
    const getSession = atob(localStorage.getItem("testSession") || "");
    try {
      const session = JSON.parse(getSession);
      if (session) {
        const isOngoing = new Date() < new Date(session.end_test);
        // Consider logging session details for debugging
        // console.log(isOngoing ? "SESSION BERJALAN" : "SESSION SELESAI", session);
        return isOngoing ? session : null;
      }
    } catch (error) {
      console.error("Error parsing session:", error);
      // Handle parsing errors gracefully (e.g., display a fallback message)
    }
  }

  return null;
};

const HeaderTo = ({ time }: HeaderToProps) => {
  const [session, setSession] = useState(handleSession());

  const dispatch = useDispatch();
  const route = useRouter();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSession(handleSession());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const renderer = ({ minutes, seconds, completed }: any) => {
    if (completed) {
      handleDeadTime();
      return <span>Waktu Habis</span>;
    } else {
      // Render a countdown
      return (
        <span>
          {minutes}:{seconds}
        </span>
      );
    }
  };

  const handleDeadTime = () => {
    if (typeof window !== "undefined") {
      const getData = atob(localStorage.getItem("testSession") || "");

      try {
        const session = JSON.parse(getData);

        if (session) {
          console.log("session", session);

          dispatch(
            setPopup({
              show: true,
              type: "warning",
              message: "Waktu ujian telah habis",
              onConfirm: () => {
                localStorage.removeItem("testSession");
                localStorage.removeItem("dataSubmit");
                dispatch(
                  setPopup({
                    show: false,
                  })
                );
              },
            })
          );
        }
      } catch (error) {
        console.error("Error parsing session:", error);
      }
    }
  };

  const memoTimer = useMemo(
    () =>
      session && session.end_test ? (
        <Countdown
          date={new Date(session.end_test).getTime()}
          renderer={renderer}
        />
      ) : (
        ""
      ),
    [session]
  );

  const handleFinishTest = () => {

    if (typeof window !== "undefined") {
      const getData = atob(localStorage.getItem("testSession") || "");

      try {
        const session = JSON.parse(getData);

        console.log("session", session);
        

        if (session) {
          dispatch(
            setPopup({
              show: true,
              type: "confirm",
              message: "Are you sure to finished this test?",
              onConfirm: () => {
                localStorage.removeItem("testSession");
                localStorage.removeItem("dataSubmit");
                dispatch(setPopup({ show: false }));
                route.push("/dashboard/tryout?active=mytryout");
              },
              onCancel: () => dispatch(setPopup({ show: false })),
            })
          );
        }
      } catch (error) {
        console.error("Error parsing session:", error);
      }
    }
  };

  

  return (
    <div className="border h-full w-full grid grid-cols-12 bg-slate-100">
      <div className="col-span-4 flex justify-start p-4">
        <h1 className="flex flex-col justify-center text-2xl font-bold text-custPrimary">
          PRE-SNBT 2024
          <span className="text-base font-medium">Ujian Penalaran Umum</span>
        </h1>
      </div>
      <div className="col-span-4 flex justify-center items-center p-4">
        {/* <p className="text-2xl font-bold text-custPrimary">{memoTimer}</p> */}
        <CustCountdown targetDate={new Date(session?.end_test).getTime()} onCountdownEnd={() => console.log('Waktu habis!')} />
      </div>
      <div className="col-span-4 flex justify-end p-4">
        <button
          onClick={handleFinishTest}
          className="flex items-center gap-1 text-base font-semibold text-custPrimary"
        >
          Akhiri Ujian
          <CgClose className="text-2xl text-custPrimary" />
        </button>
      </div>
    </div>
  );
};

export default HeaderTo;
