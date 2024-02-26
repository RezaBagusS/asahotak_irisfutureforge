"use client";

import CustButton from "@/app/components/atoms/custButton";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setPopup } from "@/app/redux/slices/reduxPopUpSlices";
import { useRouter } from "next/navigation";
import ListMaterial from "@/app/components/molecules/listMaterial";
import CustButtonMenuMobile from "@/app/components/atoms/custButtonMenuMobile";
import FooterModule from "@/app/components/molecules/footerModule";

interface PageProps {
  params: {
    path: string;
  };
}

interface stateDataCourse {
  id: number;
  title: string;
  description: string;
  percentage: number;
  path: string;
}

const dataCourses = [
  {
    id: 1,
    title: "Pengetahuan Kuantitatif",
    description:
      "Pengenalan dan penerapan konsep-konsep dasar matematika dalam ilmu ekonomi",
    percentage: 100,
    path: "/dashboard/courses/pengetahuan-kuantitatif",
  },
  {
    id: 2,
    title: "Penalaran Umum",
    description:
      "Pengenalan dan penerapan konsep-konsep dasar matematika dalam ilmu ekonomi",
    percentage: 80,
    path: "/dashboard/courses/penalaran-umum",
  },
  {
    id: 3,
    title: "Penalaran Matematika",
    description:
      "Pengenalan dan penerapan konsep-konsep dasar matematika dalam ilmu ekonomi",
    percentage: 40,
    path: "/dashboard/courses/penalaran-matematika",
  },
  {
    id: 4,
    title: "Penalaran dan Pemahaman Umum",
    description:
      "Pengenalan dan penerapan konsep-konsep dasar matematika dalam ilmu ekonomi",
    percentage: 0,
    path: "/dashboard/courses/penalaran-dan-pemahaman-umum",
  },
  {
    id: 5,
    title: "Literasi Bahasa Inggris",
    description:
      "Pengenalan dan penerapan konsep-konsep dasar matematika dalam ilmu ekonomi",
    percentage: 60,
    path: "/dashboard/courses/literasi-bahasa-inggris",
  },
  {
    id: 6,
    title: "Literasi Bahasa Indonesia",
    description:
      "Pengenalan dan penerapan konsep-konsep dasar matematika dalam ilmu ekonomi",
    percentage: 10,
    path: "/dashboard/courses/literasi-bahasa-indonesia",
  },
  {
    id: 7,
    title: "Kemampuan Memahami Bacaan dan Menulis",
    description:
      "Pengenalan dan penerapan konsep-konsep dasar matematika dalam ilmu ekonomi",
    percentage: 100,
    path: "/dashboard/courses/kemampuan-memahami-bacaan-dan-menulis",
  },
];

const Page = ({ params }: PageProps) => {
  const [data, setData] = useState<stateDataCourse>({
    id: 1,
    title: "",
    description: "",
    percentage: 100,
    path: "",
  });
  const dispatch = useDispatch();
  const location = useRouter();

  useEffect(() => {
    dispatch(
      setPopup({
        show: true,
        type: "loading",
        title: "Loading",
        message: "Wait a moment . . .",
      })
    );

    const getData = dataCourses.find((item) => {
      return item.path === `/dashboard/courses/${params.path}`;
    });

    if (getData) {
      setData(getData);
      setTimeout(() => {
        dispatch(
          setPopup({
            show: false,
          })
        );
      }, 700);
    } else {
      dispatch(
        setPopup({
          show: true,
          type: "warning",
          title: "Not Found",
          message: "Data not found",
          onConfirm: () => {
            dispatch(setPopup({ show: false }));
            location.push("/dashboard/courses");
          },
        })
      );
    }
  }, []);

  const modifiedPath = params.path
    .toString()
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const handleColorPercentage = (percentage: number) => {
    if (percentage === 100) {
      return "ring-custFourth";
    } else if (percentage >= 50) {
      return "ring-custSecondary";
    } else {
      return "ring-custThird";
    }
  };

  return (
    <div className="w-full relative text-custBlack">
      <CustButtonMenuMobile />
      <div className="flex gap-1.5 items-center">
        <Link
          href={"/dashboard/courses"}
          className="font-semibold text-sm hover:text-slate-500"
        >
          Courses
        </Link>
        <span className="text-gray-400">
          {`/`} {modifiedPath}
        </span>
      </div>
      <div className="w-full grid grid-cols-12 mt-5 rounded-md bg-white py-10 px-5">
        <div className="col-span-8 flex flex-col gap-5">
          <h1 className="text-4xl font-bold">{data?.title}</h1>
          <p className="text-gray-500">{data?.description}</p>
        </div>
        <div className="col-span-4 grid place-content-center">
          <span
            className={`w-20 h-20 rounded-full grid place-content-center ring-4 text-base font-semibold
            ${handleColorPercentage(data?.percentage)}
          `}
          >
            {data?.percentage}%
          </span>
        </div>
      </div>
      <ListMaterial />
      <div className="mt-5">
        <FooterModule />
      </div>
    </div>
  );
};

export default Page;
