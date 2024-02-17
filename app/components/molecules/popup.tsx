'use client'

import { motion } from "framer-motion";
import failure from "../../assets/icons/failure.svg";
import success from "../../assets/icons/success.svg";
import waiting from "../../assets/icons/waiting.svg";
import { useSelector } from "react-redux";
import Image from "next/image";

// Confirm(Message, Yes or No, func Yes & func No) - icon warning
// Loading(Message, waiting or oke, func oke) - icon loading
// Warning(Message, oke, func oke) - icon warning v
// Success(Message, oke, func oke) - icon check

const Popup = () => {
  const dataPopup = useSelector((state:any) => state.popup.data);

  const handleCancel = () => {
    if (dataPopup.onCancel) {
      dataPopup.onCancel();
    } else {
      console.log("No onCancel function");
    }
  };

  const handleConfirm = () => {
    if (dataPopup.onConfirm) {
      dataPopup.onConfirm();
    } else {
      console.log("No onConfirm function");
    }
  };

  const HandleImage = () => {
    switch (dataPopup.type) {
      case "loading":
        return (
          <div className="w-full flex justify-center items-center p-6">
            <Image src={waiting} width={100} height={100} alt="MissingIMG" />
          </div>
        );
      case "warning":
        return (
          <div className="w-full flex justify-center items-center">
            <Image src={failure} width={100} height={100} alt="MissingIMG" />
          </div>
        );
      case "success":
        return (
          <div className="w-full flex justify-center items-center p-2">
            <Image src={success} width={100} height={100} alt="MissingIMG" />
          </div>
        );
      default:
        return (
          <div className="w-full flex justify-center items-center p-6">
            <Image src={waiting} width={100} height={100} alt="MissingIMG" />
          </div>
        );
    }
  };

  return (
    dataPopup.show && (
      <div className="w-screen h-screen fixed overflow-hidden flex justify-center items-center bg-black/70 z-50">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.3 }}
          className="w-10/12 md:w-5/12 h-[40vh] relative rounded-3xl flex flex-col gap-5 items-center justify-center text-custBlack pt-24 pb-14 bg-custWhite"
        >
          <div className="absolute -top-1/2 translate-y-1/2 flex justify-center items-center p-2 aspect-square w-32 rounded-full bg-white">
            <HandleImage />
          </div>
          <div className="flex flex-col items-center gap-1">
          <h2
            className={`font-bold text-3xl text-[#525252] ${
              dataPopup.type == "loading" && "animate-pulse"
            }`}
          >
            {dataPopup.title}
          </h2>
          <p
            className={`font-medium text-lg w-10/12 md:w-7/12 text-[#949494] leading-5 text-center ${
              dataPopup.type == "loading" && "animate-pulse"
            }`}
          >
            {dataPopup.message}
          </p>
          </div>

          {/* CONFIRM BUTTON */}
          {dataPopup.type == "confirm" && (
            <div className="w-full flex justify-center items-center gap-5">
              <button
                onClick={handleCancel}
                className="border-2 border-custBackground whitespace-nowrap hover:border-custBackground/70  hover:bg-custBackground/70 text-custBackground hover:text-white text-base font-semibold px-4 sm:px-6 py-2 text-center rounded-lg transition-all duration-150"
              >
                cancel
              </button>
              <button
                onClick={handleConfirm}
                className="text-white bg-custPrimary text-lg font-semibold px-8 sm:px-6 py-2 rounded-lg transition-all duration-150"
              >
                confirm
              </button>
            </div>
          )}

          {/* SUCCESS BUTTON */}
          {dataPopup.type == "success" && (
            <button
              onClick={handleConfirm}
              className="text-white bg-custPrimary text-lg font-semibold w-1/2 px-8 sm:px-6 py-3 sm:py-3 rounded-lg transition-all duration-150"
            >
              OKE
            </button>
          )}

          {/* WARNING BUTTON */}
          {dataPopup.type == "warning" && (
            <button
              onClick={handleConfirm}
              className="text-white bg-custPrimary text-lg font-semibold w-1/2 px-8 sm:px-6 py-3 sm:py-3 rounded-lg transition-all duration-150"
            >
              OKE
            </button>
          )}
        </motion.div>
      </div>
    )
  );
};

export default Popup;
