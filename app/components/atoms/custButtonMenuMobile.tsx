'use client'

import { useDispatch, useSelector } from "react-redux";
import { setToggleMenu } from "@/app/redux/slices/reduxMenuMobileSlices";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";

const CustButtonMenuMobile = () => {
    
    const dispatch = useDispatch();
    const show = useSelector((state: any) => state.menuMobile.data.show);

    const isMdOrAbove = useMediaQuery({ minWidth: 768 });

    useEffect(() => {
        if (isMdOrAbove) {
            dispatch(setToggleMenu({ show: false }));
        }
    }, []);

    const handleClickMenu = () => {
        dispatch(setToggleMenu({ show: !show }));
    }

    const OpenSideBarStyles = (position : string) => {
        if (show) {
          switch (position) {
            case "top":
              return 'p-0.5 w-full rounded-sm bg-custPrimary transform transition-all duration-300 rotate-45 translate-y-full';
            case "middle":
              return 'hidden';
            case "bottom":
              return 'p-0.5 w-full rounded-sm bg-custPrimary transition-all duration-300 -rotate-45 -translate-y-full';
            default:
              return "";
          }
        } else {
          switch (position) {
            case "top":
              return 'p-0.5 w-full rounded-sm bg-custPrimary transform translate-y-0 transition-all duration-300';
            case "middle":
              return 'p-0.5 w-full rounded-sm bg-custPrimary translate-x-0';
            case "bottom":
              return 'p-0.5 w-full rounded-sm bg-custPrimary translate-y-0 transition-all duration-300';
            default:
              return "";
          }
        }
      }

  return (
    <div
      onClick={() => handleClickMenu()}
      className="p-2 bg-cust-pinkMuda rounded-md cursor-pointer"
    >
      <div className="flex flex-col w-6 justify-center items-center gap-y-1">
        <span className={OpenSideBarStyles("top")}></span>
        <span className={OpenSideBarStyles("middle")}></span>
        <span className={OpenSideBarStyles("bottom")}></span>
      </div>
    </div>
  );
};

export default CustButtonMenuMobile;
