import { CustInputProps } from "../../types";
import hidePassword from "@/app/assets/icons/hidePassword.svg";
import Image from "next/image";

const CustInput = ({
  type = "text",
  placeholder = "",
  label = "",
  value = "",
}: CustInputProps) => {
  return (
    <div className="flex flex-col gap-2 mt-2">
      <label className="font-medium text-sm md:text-lg">{label}</label>
      <div className="relative">
        <input
          type={type}
          defaultValue={value}
          placeholder={placeholder}
          className="active:outline-none focus:outline-none w-full border-2 border-black font-medium text-gray-700 text-sm md:text-base rounded-md p-2 md:px-4"
        />
        {type === "password" && (
          <Image
            src={hidePassword}
            alt="hidePassword"
            height={15}
            width={15}
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer hover:opacity-70"
          />
        )}
      </div>
    </div>
  );
};

export default CustInput;
