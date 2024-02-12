"use client";

import Image from "next/image";
import AOlogo from "../assets/AO.png";
import AOBlue from "../assets/AOBlue.png";
import bottomLogo from "../assets/buttomLogo.png";
import CustInput from "../components/custInput";
import CustButton from "../components/custButton";
import { useState } from "react";

function Login() {
  const [checkbox, setCheckbox] = useState(false);

  const handleCheckbox = () => {
    setCheckbox((prev) => !prev);
  };

  return (
    <div className="cust-outer-container w-full flex h-screen">
      <div className="relative hidden lg:w-7/12 bg-custPrimary lg:flex justify-center items-center">
        <Image src={AOlogo} alt="AOLogo" height={120} />
        <div className="flex flex-col items-center gap-3 absolute bottom-7">
          <h3>Supported By:</h3>
          <Image src={bottomLogo} alt="bottomLogo" height={40} />
        </div>
      </div>
      <div className="w-full lg:w-5/12 bg-white text-black flex flex-col justify-center">
        <div className="w-9/12 flex flex-col gap-10 mx-auto font-nunitoSans">
          <div className="flex lg:hidden justify-center">
            <Image src={AOBlue} alt="AOLogo" height={60} />
          </div>
          <div className="flex flex-col items-center lg:items-start gap-3">
            <h1 className="text-4xl md:text-6xl font-semibold md:font-medium">
              Welcome!
            </h1>
            <p className="text-base md:text-lg">Log in to your account</p>
          </div>
          <div className="flex flex-col gap-2 md:gap-4">
            <CustInput
              type="text"
              label="Email / Username"
              placeholder="ahmadzuki"
            />
            <CustInput type="password" label="Password" placeholder="xxxxxxx" />
            <div className="flex justify-between items-center">
              <div
                onClick={handleCheckbox}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  id="checkbox"
                  checked={checkbox}
                  readOnly
                  className="pointer-events-none"
                />
                <p className="text-xs md:text-base whitespace-nowrap">
                  Remember me
                </p>
              </div>
              <p className="text-[#5E9EFF] cursor-pointer text-xs md:text-base">
                Forgot password?
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <CustButton text="Login" />
            <p className="text-xs sm:text-sm text-center text-gray-600">
              If there are problems, contact CP immediately
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
