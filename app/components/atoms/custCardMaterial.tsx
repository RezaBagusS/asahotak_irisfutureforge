import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPopupPpt } from "@/app/redux/slices/reduxPopUpPptSlices";
import { CiLock } from "react-icons/ci";
import { CiUnlock } from "react-icons/ci";
import { BsCheckSquareFill } from "react-icons/bs";
import { setCompleteLesson } from "@/app/helpers/setCompleteLesson";
import { setPopup } from "@/app/redux/slices/reduxPopUpSlices";

interface lesson {
  id_lesson?: number;
  title?: string;
  codeLesson?: string;
  link_ppt?: string | "";
  link_video?: string | "";
  link_quiz?: string | "";
  openLesson?: boolean;
  id_course?: number;
  isDone?: boolean;
  createdAt?: Date;
}

interface CustListMaterialProps {
  data: lesson;
  index: number;
}

const CustListMaterial = ({ data, index }: CustListMaterialProps) => {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.userData.data);

  const {
    id_lesson,
    id_course,
    title,
    link_ppt,
    link_quiz,
    link_video,
    openLesson,
    isDone,
  } = data;

  const toggleOpen = () => {
    openLesson && setOpen((prev) => !prev);
  };

  const handleClickPpt = () => {
    dispatch(
      setPopupPpt({
        show: true,
        link: link_ppt,
      })
    );
  };

  const handleClickVideo = () => {
    dispatch(
      setPopupPpt({
        show: true,
        link: link_video,
      })
    );
  };

  const handleClickQuiz = () => {
    window.open(link_quiz, "_blank");
  };

  const onComplete = async (id_course: number, id_lesson: number, id_user: number) => {
    setDisabled((prev) => !prev);
    const res = await setCompleteLesson(id_course, id_lesson, id_user);

    if (res.status) {
      dispatch(
        setPopup({
          title: "Success",
          message: res.message,
          show: true,
          type: "success",
          onConfirm: () => {
            dispatch(setPopup({ show: false }));
            window.location.reload();
          },
        })
      );
    } else {
      dispatch(
        setPopup({
          title: "Failed",
          message: res.message,
          show: true,
          type: "warning",
          onConfirm: () => {
            dispatch(setPopup({ show: false }));
          },
        })
      );
    }

    setTimeout(() => {
      setDisabled((prev) => !prev);
    }, 500);
  };

  return (
    <div
      onClick={toggleOpen}
      className="transition-all duration-500 ease-out overflow-hidden cursor-pointer rounded-md group"
    >
      <div
        className={`relative flex z-30
        ${openLesson ? "bg-white" : "bg-gray-300"}
      `}
      >
        <span
          className={`absolute group-hover:left-1 group-hover:-top-3 w-3 h-10 rotate-45 bg-custPrimary transition-all duration-300 ease-in-out
            ${open ? "-top-3 left-1" : "-left-3 -top-5"}
        `}
        ></span>
        <p className="text-sm py-4 px-5 w-11/12">
          {index + 1} : {title}
        </p>
        <div className="absolute top-1/2 -translate-y-1/2 right-3">
          {openLesson ? (
            isDone ? (
              <BsCheckSquareFill className="text-green-600 text-xl" />
            ) : (
              <BsCheckSquareFill className="text-green-300 text-xl" />
            )
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
        <div className="flex flex-row justify-center gap-2 text-xs md:text-sm h-auto w-full">
          <div
            onClick={handleClickPpt}
            className="flex justify-center items-center w-1/2 h-9/12 py-3 px-5 hover:bg-sky-200 bg-sky-300 transition-all duration-150"
          >
            PPT Materi
          </div>
          <div
            onClick={handleClickQuiz}
            className="flex justify-center items-center w-1/2 h-9/12 py-3 px-5 hover:bg-sky-200 bg-sky-300 transition-all duration-150"
          >
            Link Quiz
          </div>
          <div
            onClick={handleClickVideo}
            className="flex justify-center items-center w-1/2 h-9/12 py-3 px-5 hover:bg-sky-200 bg-sky-300 transition-all duration-150"
          >
            Record Video
          </div>
        </div>
        <div className="w-full flex justify-end">
          <button
            onClick={() => id_lesson && id_course && onComplete(id_course, id_lesson, userData.id)}
            disabled={isDone || disabled}
            className="px-5 py-2 text-xs disabled:pointer-events-none rounded-md disabled:bg-slate-300 bg-custPrimary hover:bg-custPrimary/80 text-custWhite"
          >
            Mark Complete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustListMaterial;
