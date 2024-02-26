import { useState } from "react";
import { useDispatch } from "react-redux";
import { setPopupPpt } from "@/app/redux/slices/reduxPopUpPptSlices";
import { CiLock } from "react-icons/ci";
import { CiUnlock } from "react-icons/ci";

interface CustListMaterialProps {
  data: {
    id: number;
    id_course: number;
    title: string;
    isDone: boolean;
    link_ppt: string;
    link_quiz: string;
  };
}

const CustListMaterial = ({ data }: CustListMaterialProps) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const { title, id, isDone, link_ppt, link_quiz } = data;

  const toggleOpen = () => {
     isDone && setOpen((prev) => !prev);
  };

  const handleClickPpt = () => {
    dispatch(
      setPopupPpt({
        show: true,
        link: link_ppt,
      })
    );
  };

  const handleClickQuiz = () => {
    window.open(link_quiz, "_blank");
  };

  return (
    <div
      onClick={toggleOpen}
      className="transition-all duration-500 ease-out overflow-hidden cursor-pointer rounded-md group">
      <div className={`relative flex z-30
        ${isDone ? "bg-white" : "bg-gray-300"}
      `}>
        <span
          className={`absolute group-hover:left-1 group-hover:-top-3 w-3 h-10 rotate-45 bg-custPrimary transition-all duration-300 ease-in-out
            ${open ? "-top-3 left-1" : "-left-3 -top-5"}
        `}
        ></span>
        <p className="text-sm py-4 px-5 w-11/12">
          {id} : {title}
        </p>
        <div className="absolute top-1/2 -translate-y-1/2 right-3">
          {isDone ? (
            <CiUnlock className="text-custPrimary text-xl" />
          ) : (
            <CiLock className="text-custBlack text-xl" />
          )}
        </div>
      </div>
      <div
        className={`flex flex-col gap-3 px-5 items-center justify-center transition-all duration-300 ease-out
            ${open ? "h-28 pb-3" : "h-0"}
      `}
      >
        <div className="grid grid-cols-2 gap-2 text-xs md:text-sm h-auto w-full">
          <div
            onClick={handleClickPpt}
            className="flex justify-center items-center h-9/12 py-3 px-5 hover:bg-sky-200 bg-sky-300 transition-all duration-150"
          >
            PPT Materi
          </div>
          <div
            onClick={handleClickQuiz}
            className="flex justify-center items-center h-9/12 py-3 px-5 hover:bg-sky-200 bg-sky-300 transition-all duration-150"
          >
            Link Quiz
          </div>
        </div>
        <div className="w-full flex justify-end">
          <button className="px-5 py-2 text-xs rounded-md bg-custPrimary hover:bg-custPrimary/80 text-custWhite">
            Mark Complete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustListMaterial;
