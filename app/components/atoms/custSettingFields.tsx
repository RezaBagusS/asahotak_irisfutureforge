import React from "react";
import { FaRegEye } from "react-icons/fa";
import Image from "next/image";
import hidePassword from "@/app/assets/icons/hidePassword.svg";
import { useState } from "react";

interface CustSettingFieldProps {
  text?: string;
  label: string;
  desc: string;
  type: string;
  regist?: any;
}

const CustSettingFields = ({
  label,
  desc,
  text,
  type,
  regist,
}: CustSettingFieldProps) => {

  const [openEye, setOpenEye] = useState(false);
  const lowerLabel = label.toLowerCase();

  return (
    <div className="text-custBlack flex flex-col gap-1">
      <label className="font-semibold text-base mb-1">{label}</label>
      <div className="relative">
        <input
          {... regist(label.toLowerCase())}
          type={type == "password" ? (openEye ? "text" : "password") : type}
          defaultValue={text}
          required
          className="w-full text-sm px-3 py-2 text-custBlack/70 rounded-md border active:outline-none focus:outline-none focus:border-custBlack/70 font-medium"
        />
        {type === "password" &&
          (openEye ? (
            <FaRegEye
              onClick={() => setOpenEye((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer hover:opacity-70"
            />
          ) : (
            <Image
              src={hidePassword}
              alt="hidePassword"
              height={15}
              width={15}
              onClick={() => setOpenEye((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer hover:opacity-70"
            />
          ))}
      </div>
      <p className="text-sm text-custBlack/50">{desc}</p>
    </div>
  );
};

export default CustSettingFields;
