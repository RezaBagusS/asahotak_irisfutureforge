import { CiClock2 } from "react-icons/ci";
import { SlDocs } from "react-icons/sl";

const CustCardTO = () => {
  return (
    <div className="relative bg-custWhite border rounded-md hover:drop-shadow-md transition-all duration-200 px-3 py-4">
      <p className="font-bold text-lg text-custPrimary">Try Out Paket 1 2023</p>
      <p className="text-xs text-gray-400">27 Februari 2024</p>
      <div className="flex justify-between md:justify-start md:gap-5 mt-5">
        <div className="flex gap-1">
          <CiClock2 className="text-custPrimary" />
          <p className="text-xs md:text-sm text-gray-500 ml-1">60 Minute</p>
        </div>
        <div className="flex gap-1">
          <SlDocs className="text-custPrimary" />
          <p className="text-xs md:text-sm text-gray-500 ml-1">7 Subtest</p>
        </div>
      </div>
        <button className="absolute right-5 -translate-y-1/2 top-1/2 rounded-sm text-xs md:text-sm px-4 py-2 text-custWhite bg-custPrimary hover:bg-custPrimary/90">
            Start Tryout
        </button>
    </div>
  );
};

export default CustCardTO;
