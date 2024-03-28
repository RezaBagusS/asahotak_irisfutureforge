"use client";

import CustSettingFields from "@/app/components/atoms/custSettingFields";
import { uploadSoal } from "@/app/helpers/uploadSoal";
import { setPopup } from "@/app/redux/slices/reduxPopUpSlices";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

interface PageProps {}

export default function Page({}: PageProps) {
  const { handleSubmit, register, reset } = useForm();

  const dispatch = useDispatch();

  const onSubmit = async (data: any) => {
    const res = await uploadSoal(data);

    if (res.error) {
      dispatch(
        setPopup({
          title: "Failed",
          message: res.message || "Update Failed",
          show: true,
          type: "warning",
          onConfirm: () => {
            dispatch(
              setPopup({
                show: false,
              })
            );
          },
        })
      );
    } else {
      dispatch(
        setPopup({
          title: "Success",
          message: res.message || "Update Success",
          show: true,
          type: "success",
          onConfirm: () => {
            reset();
            dispatch(
              setPopup({
                show: false,
              })
            );
          },
        })
      );
    }
  };

  const Editor = dynamic(() => import("@/app/components/molecules/editor"), {
    ssr: false,
  });

  return (
    <div className="w-full relative flex flex-col gap-5">
      <div className="App">
        <h2>Simple Editor</h2>
        <Editor
          value={"Foo"}
          onChange={(v: any) => {
            console.log(v);
          }}
        />
      </div>

      <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
        {/* SoalFields */}
        <div className="flex flex-col gap-2">
          <CustSettingFields
            regist={register}
            label="soal"
            desc="Soal yang akan di upload"
            type="text"
          />
        </div>
        {/* ID MaterialFields */}
        <div className="flex flex-col gap-2">
          <CustSettingFields
            regist={register}
            label="id_material"
            desc="ID Material yang akan di upload"
            type="text"
          />
        </div>
        <button
          className="bg-custPrimary mt-4 w-fit text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-150 hover:bg-custPrimary/70 hover:text-white"
          type="submit"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
