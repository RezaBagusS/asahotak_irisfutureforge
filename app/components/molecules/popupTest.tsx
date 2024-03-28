"use client";

import { customLocalStorage, getUser } from "@/app/helpers/localStorage";
import { getInfoTest } from "@/app/helpers/testHelpers";
import { setPopup } from "@/app/redux/slices/reduxPopUpSlices";
import { setPopupTest } from "@/app/redux/slices/reduxPopUpTestSlices";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

interface stateDataInfoTest {
  userTO?: {
    id_user: number;
    id_tryout: number;
    Tryout: {
      name: string;
      start_date: Date;
      end_date: Date;
      countMaterial: number;
      isMiniTO: boolean;
      Material: {
        id_material: number;
        name_material: string;
        time: number;
        countQuestion: number;
      }[];
    };
  };
}

const PopupTest = () => {
  const dataPopupTest = useSelector((state: any) => state.popupTest.data);
  const userData = useSelector((state: any) => state.userData.data);
  const [dataInfoTest, setDataInfoTest] = useState<stateDataInfoTest>({});
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();
  const search = useSearchParams();

  const getSubtest = search.get("subtest") as string;
  const idTryout = search.get("id") as string;

  useEffect(() => {
    if (dataPopupTest.show) {
      const res = getInfoTest(userData.id, idTryout, parseInt(getSubtest));

      res
        .then((data) => {
          if (data.data) {
            setDataInfoTest(data.data);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [dataPopupTest, idTryout, getSubtest, userData.id]);

  const handleCancel = () => {
    dispatch(
      setPopupTest({
        show: false,
      })
    );
  };

  const handleStart = () => {
    dispatch(
      setPopupTest({
        show: false,
      })
    );
    setRedirect(true);

    if (typeof window !== "undefined") {
      localStorage.setItem("dataSubmit", btoa([] as any));
    }

    const payloadTest = {
      id_user: getUser().id,
      id_tryout: parseInt(idTryout || "0"),
      id_material: getSubtest,
      start_test: new Date(),
      end_test: new Date(
        new Date().getTime() +
          (dataInfoTest.userTO?.Tryout.Material[0].time ?? 0) * 60000
      ),
    };

    customLocalStorage("testSession", btoa(JSON.stringify(payloadTest)));
  };

  return (
    dataPopupTest.show && (
      <div className="w-screen h-screen fixed overflow-hidden flex justify-center items-center bg-black/70 z-50">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.3 }}
          className="w-10/12 md:w-7/12 lg:w-5/12 h-[90vh] relative rounded-sm flex flex-col gap-5 items-center justify-center text-custBlack p-5 bg-slate-200"
        >
          {loading ? (
            <>
              <div className="absolute top-2 right-2">
                <button onClick={handleCancel}>
                  <IoIosClose className="text-3xl text-custBlack" />
                </button>
              </div>
              <div className="flex flex-col gap-3">
                <h1 className="text-custBlack/80 text-3xl">Loading...</h1>
              </div>
            </>
          ) : dataInfoTest.userTO ? (
            <div className="border-2 border-gray-600/80 h-full w-full">
              <div className="p-8 h-full flex flex-col justify-between">
                <div className="flex flex-col gap-3">
                  <h1 className="text-custBlack/80 text-3xl">Aturan: </h1>
                  <div className="mt-4 flex flex-col gap-3 text-sm">
                    <p>
                      <strong>{dataInfoTest.userTO.Tryout.name}</strong>{" "}
                      bertujuan untuk menguji pengetahuan terkait{" "}
                      {dataInfoTest.userTO.Tryout.Material[0].name_material} dan
                      menyiapkan diri anda untuk menghadapi SNBT 2024. Ujian ini
                      terdiri dari{" "}
                      {dataInfoTest.userTO.Tryout.Material[0].countQuestion}{" "}
                      soal pilihan ganda dengan waktu pengerjaan{" "}
                      {dataInfoTest.userTO.Tryout.Material[0].time} menit.
                      Setiap soal memiliki bobot nilai berbeda. Jika anda sudah
                      siap, silahkan klik tombol &quot;Mulai Ujian&quot;.
                    </p>
                    <p>
                      <strong>Perhatian: </strong> Disarankan gunakan device
                      yang memiliki koneksi internet yang stabil dan gunakan
                      browser terbaru untuk mengikuti ujian ini.{" "}
                      <strong>(Disarankan menggunakan laptop)</strong>
                    </p>
                    <p>Selamat Mengerjakan !!</p>
                  </div>
                </div>
                <div className="flex justify-around gap-5 items-center">
                  <button
                    onClick={handleCancel}
                    className="flex text-white bg-gray-500 px-5 py-1 hover:underline"
                  >
                    Kembali
                  </button>
                  <Link
                    href={`/dashboard/tryout/test?id=${idTryout}&subtest=${getSubtest}`}
                    onClick={handleStart}
                    className="text-white bg-custPrimary px-5 py-1 hover:underline"
                  >
                    {redirect ? "Redirect . . ." : "Mulai Ujian"}
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3">
              <h1 className="text-custBlack/80 text-3xl">
                Anda belum terdaftar
              </h1>
              <button
                onClick={handleCancel}
                className="text-white bg-custPrimary px-5 py-1 hover:underline"
              >
                Kembali
              </button>
            </div>
          )}
        </motion.div>
      </div>
    )
  );
};

export default PopupTest;
