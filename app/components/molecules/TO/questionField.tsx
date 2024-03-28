import { getAnswer } from "@/app/helpers/testHelpers";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { FaCircleNodes } from "react-icons/fa6";

interface stateDataQuestions {
  data: any;
  idTryout: string;
  idMaterial: number;
  dataSubmit: {
    id_answer: number;
    id_soal: number;
    answer: string;
  }[];
  setDataSubmit: any;
}

interface dataSubmitProps {
  id_soal: number;
  id_answer: number;
}

const QuestionField = ({ data, idMaterial, idTryout, dataSubmit, setDataSubmit }: stateDataQuestions) => {
  const ViewSoal = dynamic(
    () => import("@/app/components/molecules/viewSoal"),
    {
      ssr: false,
    }
  );

  const [html, setHtml] = useState("");
  const [dataAnswer, setDataAnswer] = useState<any>([]);
  const [answer, setAnswer] = useState("");
  const search = useSearchParams();
  const page = parseInt(search.get("page") || "1") || 1;

  useEffect(() => {
    
    if (typeof window !== "undefined") {
      if (dataSubmit.length > 0) {
        localStorage.setItem("dataSubmit", btoa(JSON.stringify(dataSubmit)));
      }
    }

  }, [dataSubmit]);

  useEffect(() => {
    if (data && data.length > 0) {
      const res = getAnswer(data[page - 1].id_soal);

      res
        .then((res) => {
          setDataAnswer(res.data);
          console.log("DATA ANSWER", res.data);

          const getSoal = data[page - 1].soal;

          setHtml(getSoal);
        })
        .catch((err) => {
          console.log(err);
        });

    }
  }, [data, page]);
  
  const handleChoose = (id_soal: number, id_answer: number) => {
    if (dataSubmit.some((item) => item.id_soal === id_soal)) {
      const index = dataSubmit.findIndex((item) => item.id_soal === id_soal);
      return dataSubmit[index].id_answer == id_answer;
    }
  }

  const memoizedViewSoal = useMemo(
    () =>
      html &&
      dataAnswer && (
        <>
          <ViewSoal html={html} />
          <div className="flex flex-col gap-3">
            <h1 className="text-custBlack/80 text-sm">Pilih satu: </h1>
            <div className="flex flex-col gap-3">
              {dataAnswer.map((item: any, i: number) => {
                return (
                  <div key={item.id_answer} className="flex items-center gap-3">
                    <input
                      type="radio"
                      id={item.id_answer}
                      name="answer"
                      defaultChecked={handleChoose(item.id_soal, item.id_answer)}
                      onChange={() => handleChooseAnswer(item.id_answer)}
                      className="border rounded-sm cursor-pointer aspect-square w-[20px] h-[20px] focus:ring-2 focus:ring-custPrimary"
                    />
                    <ViewSoal html={item.answer} />
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ),
    [html, dataAnswer]
  );

  function updateAnswer(idSoal:number, idAnswer:number) {
   
    const answerIndex = dataSubmit.findIndex((answer:any) => answer.id_soal === idSoal);
  
    if (answerIndex !== -1) {
      dataSubmit[answerIndex].id_answer = idAnswer;
    } else {
      setDataSubmit([
        ...dataSubmit,
        {
          id_soal: idSoal,
          id_answer: idAnswer,
        },
      ])
    }
  
    console.log("DATA SUBMIT", dataSubmit);
  }

  const handleChooseAnswer = (id_answer: number) => {
    setAnswer(answer);
    updateAnswer(data[page - 1].id_soal, id_answer);
  };

  const handlePrev = () => {
    if (page <= 1) {
      return 1;
    } else {
      return page - 1;
    }
  };

  const handleNext = () => {
    if (page >= data.length) {
      return data.length;
    } else {
      return page + 1;
    }
  };

  return (
    data && (
      <div className="col-span-9 border-l-2 px-5 flex flex-col justify-between overflow-y-auto">
        <div className="">
          <div className="col-span-9 flex justify-between items-center py-4">
            <p className="text-xl font-bold text-custPrimary">Soal {page}</p>
          </div>
          <div className="col-span-9 flex flex-col gap-4 items-start">
            {data.length > 0 && memoizedViewSoal}
          </div>
        </div>
        <div className="flex justify-between items-center py-2 mt-5">
          <Link
            href={`test?id=${idTryout}&subtest=${idMaterial}&page=${handlePrev()}`}
            className={`flex items-center gap-2 px-3 py-2 bg-custPrimary hover:bg-custPrimary/80 text-white rounded-md
            ${page == 1 ? "opacity-0 pointer-events-none" : ""}
        `}
          >
            <p className="flex gap-2 items-center">
              <IoIosArrowBack className="text-xl" />
              Sebelumnya
            </p>
          </Link>
          <Link
            href={`test?id=${idTryout}&subtest=${idMaterial}&page=${handleNext()}`}
            onClick={() => {
              if (page == data.length) {
                console.log("DATA SUBMIT", dataSubmit);
              }
            }}
            className={`flex items-center gap-2 px-3 py-2 rounded-md
            ${
              page == data.length
                ? "bg-custFourth text-white"
                : "bg-custPrimary hover:bg-custPrimary/80 text-white"
            }
        `}
          >
            <p className="flex gap-2 items-center">
              {page == data.length ? "Submit" : "Selanjutnya"}
              {page == data.length ? (
                <IoSend className="text-xl" />
              ) : (
                <IoIosArrowBack className="text-xl rotate-180" />
              )}
            </p>
          </Link>
        </div>
      </div>
    )
  );
};

export default QuestionField;
