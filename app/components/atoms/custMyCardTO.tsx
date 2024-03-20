
import { setPopup } from "@/app/redux/slices/reduxPopUpSlices";
import Link from "next/link";
import { CiClock2 } from "react-icons/ci";
import { SlDocs } from "react-icons/sl";
import { useDispatch } from "react-redux";
import { hashLink } from "@/app/helpers/URLhelpers";

interface dataTryout {
  data: {
    id_tryout: number;
    name: string;
    start_date: Date;
    end_date: Date;
    countMaterial: number;
  };
}

const CustMyCardTO = ({ data }: dataTryout) => {

  const formatDate = (date: Date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <div className="relative bg-custWhite border rounded-md hover:drop-shadow-md transition-all duration-200 px-3 py-4">
      <p className="font-bold text-lg text-custPrimary">{data.name}</p>
      <p className="text-xs text-gray-400">{formatDate(data.start_date)}</p>
      <div className="flex justify-between md:justify-start md:gap-5 mt-5">
        <div className="flex gap-1">
          <CiClock2 className="text-custPrimary" />
          <p className="text-xs md:text-sm text-gray-500 ml-1">60 Minute</p>
        </div>
        <div className="flex gap-1">
          <SlDocs className="text-custPrimary" />
          <p className="text-xs md:text-sm text-gray-500 ml-1">{data.countMaterial} Subtest</p>
        </div>
      </div>
      <Link href={`/dashboard/tryout?id=${hashLink(data.id_tryout.toString())}`}
      className="absolute right-5 -translate-y-1/2 top-1/2 rounded-sm text-xs md:text-sm px-4 py-2 text-custWhite bg-custPrimary hover:bg-custPrimary/90">
        Open TO
      </Link>
    </div>
  );
};

export default CustMyCardTO;
