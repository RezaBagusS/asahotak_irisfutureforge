import Image from "next/image";
import bubble from "../../assets/icons/Bubble.svg"

const CustBanner = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-custPrimary text-[#EDE6F3] flex items-center px-9 h-44">
      <div className="flex flex-col gap-3 justify-center items-start w-7/12">
        <h1 className="font-medium text-2xl">Hi, Rehan!</h1>
        <p className="font-normal text-sm">
          Achieve your future with learning something new everyday. And now,
          start your learning today.
        </p>
      </div>
      <Image className="absolute -right-2 -bottom-20" priority src={bubble} alt="BubbleIcon" width={250} />
    </div>
  );
};

export default CustBanner;
