"use client";

import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setPopupPpt } from "@/app/redux/slices/reduxPopUpPptSlices";

const PopupPPT = () => {
  const dataPopupPpt = useSelector((state: any) => state.popupPpt.data);
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(setPopupPpt({
        show: false,
        link: "",
    }))
  };

  return (
    dataPopupPpt.show && (
      <div className="w-screen h-screen fixed overflow-hidden flex justify-center items-center bg-black/70 z-50">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.3 }}
          className="w-10/12 h-screen py-10 flex items-center justify-center"
        >
            <span 
            onClick={handleCancel}
            className="text-3xl absolute top-4 right-8 bg-custBackground/30 hover:bg-custBackground/20 transition-all duration-200 flex justify-center items-center cursor-pointer w-10 h-10 rounded-full">
                x
            </span>
          <iframe
            src={dataPopupPpt.link}
            className="w-full h-full"
            allow="autoplay"
          ></iframe>
        </motion.div>
      </div>
    )
  );
};

export default PopupPPT;
