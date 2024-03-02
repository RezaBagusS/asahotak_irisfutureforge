import hidePassword from "@/app/assets/icons/hidePassword.svg";
import { FaRegEye } from "react-icons/fa";
import Image from "next/image";
import { useState } from "react";
interface CustInputProps {
  type?: string;
  placeholder?: string;
  label?: string;
  value?: string;
  regist?: any;
}

const CustInput = ({
  type,
  placeholder,
  label,
  value,
  regist,
}: CustInputProps) => {
  const [openEye, setOpenEye] = useState(false);

  const lowerLabel = label?.toLowerCase();

  return (
    <div className="flex flex-col gap-2 mt-2">
      <label className="font-medium text-sm md:text-lg">{label}</label>
      <div className="relative">
        <input
          type={type == "password" ? (openEye ? "text" : "password") : type}
          {...regist(lowerLabel)}
          defaultValue={value}
          placeholder={placeholder}
          className="active:outline-none focus:outline-none w-full border-2 border-black font-medium text-gray-700 text-sm md:text-base rounded-md p-2 md:px-4"
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
    </div>
  );
};

export default CustInput;
