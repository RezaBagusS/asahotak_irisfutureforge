"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CgClose } from "react-icons/cg";
import { IoIosArrowBack } from "react-icons/io";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useState } from "react";

const Test = () => {
  const [answer, setAnswer] = useState<string>("");
  const route = useRouter();
  const search = useSearchParams();
  const idMaterial = search.get("id");
  const location = usePathname();

  const handleChooseAnswer = (answer: string) => {
    setAnswer(answer);
  };

  return (
    <div className="flex flex-col gap-5 min-h-full">
      {/* Header TO */}
      <div className="border h-full w-full grid grid-cols-12 bg-slate-100">
        <div className="col-span-6 flex justify-start p-4">
          <h1 className="flex flex-col justify-center text-2xl font-bold text-custPrimary">
            PRE-SNBT 2024
            <span className="text-base font-medium">Ujian Penalaran Umum</span>
          </h1>
        </div>
        <div className="col-span-6 flex justify-end p-4">
          <Link
            href={"/dashboard/tryout"}
            className="flex items-center gap-1 text-base font-semibold text-custPrimary"
          >
            Akhiri Ujian
            <CgClose className="text-2xl text-custPrimary" />
          </Link>
        </div>
      </div>

      {/* Content TO */}
      <div className="grid grid-cols-12 w-full h-[70vh]">
        {/* Left Content */}
        <div className="col-span-3 flex flex-col gap-3 pe-5">
          <div className="px-5 py-3 flex gap-2 items-center border bg-slate-100">
            <IoPersonCircleOutline className="text-6xl text-custPrimary" />
            <div>
              <h1 className="text-xl font-bold text-custPrimary">MuezzaID</h1>
              <p className="text-sm text-gray-500">rezabagus@gmail.com</p>
            </div>
          </div>
          <div className="grid grid-cols-5 h-fit gap-3">
            {Array.from({ length: 30 }, (_, i) => (
              <a
                key={i}
                href={`${location}?id=${idMaterial}&page=${i + 1}`}
                className="flex gap-2 items-center justify-center rounded-sm cursor-pointer hover:bg-slate-200 col-span-1 aspect-square p-2 border bg-slate-100"
              >
                <h1 className="text-sm font-bold text-custBlack">{i + 1}</h1>
              </a>
            ))}
          </div>
        </div>

        {/* Right Content */}
        <div className="col-span-9 border-l-2 px-5 flex flex-col justify-between">
          <div className="">
            <div className="col-span-9 flex justify-between items-center py-4">
              <p className="text-xl font-bold text-custPrimary">Soal 1</p>
              <p className="text-xl font-bold text-custPrimary">00:00</p>
            </div>
            <div className="col-span-9 flex flex-col gap-4 items-start">
              <h2>
                Ani membeli buku seharga 100 juta. Siapakah nama Bapak Ani?
              </h2>
              <div className="flex flex-col gap-3 overflow-y-auto">
                {Array.from({ length: 4 }, (_, i) => (
                  <div
                    key={i}
                    onClick={() => handleChooseAnswer(String.fromCharCode(65 + i))}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div
                      className={`flex gap-2 items-center col-span-2 justify-center rounded-sm aspect-square w-[45px] h-[45px] border
                      ${
                        answer == String.fromCharCode(65 + i)
                          ? "bg-custPrimary text-white"
                          : "bg-slate-100 text-custBlack group-hover:bg-slate-200"
                      }
                    `}
                    >
                      <h1 className="text-sm font-bold">
                        {String.fromCharCode(65 + i)}
                      </h1>
                    </div>
                    <div className="col-span-10">
                      <p>Bapak Anton</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center py-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-custPrimary hover:bg-custPrimary/80 text-white rounded-md">
              <p className="flex gap-2 items-center">
                <IoIosArrowBack className="text-xl" />
                Sebelumnya
              </p>
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-custPrimary hover:bg-custPrimary/80 text-white rounded-md">
              <p className="flex gap-2 items-center">
                Selanjutnya
                <IoIosArrowBack className="text-xl rotate-180" />
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
