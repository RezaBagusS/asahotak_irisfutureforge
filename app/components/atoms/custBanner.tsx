import Image from "next/image";
import bubble from "../../assets/icons/Bubble.svg";
import { useSelector } from "react-redux";

const CustBanner = () => {

  const user = useSelector((state:any) => state.userData.data);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-custPrimary text-[#EDE6F3] flex items-center px-5 sm:px-9 h-44">
      <div className="flex flex-col gap-3 z-20 justify-center items-start w-full sm:w-7/12">
        <h1 className="font-medium text-xl sm:text-2xl">Hi, {user.username}!</h1>
        <p className="font-normal text-xs sm:text-sm">
          Achieve your future with learning something new everyday. And now,
          start your learning today.
        </p>
      </div>
      <Image className="absolute z-10 -right-20 sm:-right-2 -bottom-20 opacity-30 sm:opacity-100" priority src={bubble} alt="BubbleIcon" width={250} />
    </div>
  );
};

export default CustBanner;