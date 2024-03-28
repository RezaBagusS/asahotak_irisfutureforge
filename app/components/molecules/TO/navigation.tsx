import { IoPersonCircleOutline } from "react-icons/io5";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUser } from "@/app/helpers/localStorage";
import { getCountQuestion } from "@/app/helpers/testHelpers";

interface NavigationProps {
  count: number;
  idTryout: string;
  idMaterial: number;
  dataSubmit: {
    id_answer: number;
    id_soal: number;
  }[];
  page: number;
}

interface stateDataQuestions {
  id_soal: number;
  id_material: number;
  soal: string;
}

const Navigation = ({
  count,
  idTryout,
  idMaterial,
  dataSubmit,
  page,
}: NavigationProps) => {
  const [userData, setUserData] = useState<any>();
  const [countQuestion, setCountQuestion] = useState<stateDataQuestions[]>([]);

  useEffect(() => {
    const res = getCountQuestion(idMaterial);

    res
      .then((res) => {
        console.log("COUNT QUESTION", res.data);
        setCountQuestion(res.data as stateDataQuestions[]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleStyled = (i: number) => {
    if (page == 0 && i == 0) {
      return "ring-2 ring-custPrimary";
    }
    if (page == i + 1) {
      return "ring-2 ring-custPrimary";
    }
    return "";
  };

  useEffect(() => {
    const getUserLocalStorage = async () => {
      const data = await getUser();
      setUserData(data);
    };

    getUserLocalStorage();
  }, []);

  const handleChoose = (id_soal: number) => {
    if (dataSubmit.some((item) => item.id_soal === id_soal)) {
      return true;
    }

    return false;
  };

  return (
    <div className="col-span-3 flex flex-col gap-3 pe-5">
      <div className="px-5 py-3 flex gap-2 items-center border bg-slate-100">
        <IoPersonCircleOutline className="text-6xl text-custPrimary" />
        <div>
          <h1 className="text-xl font-bold text-custPrimary">
            {userData?.username}
          </h1>
          <p className="text-sm text-gray-500">{userData?.email}</p>
        </div>
      </div>
      <div className="grid grid-cols-5 h-fit gap-3">
        {countQuestion.map((item, i) => {
          return (
            <Link
              key={i}
              href={`test?id=${idTryout}&subtest=${idMaterial}&page=${i + 1}`}
              className={`flex gap-2 items-center text-sm font-bold justify-center rounded-sm cursor-pointer col-span-1 aspect-square p-2 border 
                ${handleStyled(i)} ${
                handleChoose(item.id_soal)
                  ? "bg-custPrimary text-white"
                  : "text-custBlack bg-slate-100 hover:bg-slate-200"
              }
                `}
            >
              {i + 1}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;
