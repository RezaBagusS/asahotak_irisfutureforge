import CustCardTO from "@/app/components/atoms/custCardTO";

const MyTryoutTab = () => {
  return (
    <div className="w-full flex flex-col gap-3 relative">
      <div className="mb-5">
        <h1 className="text-2xl text-custPrimary font-bold">
          Lets, Complete your try out now!!
        </h1>
        <p className="text-gray-500 text-sm">
          Complete all the tryout you have received
        </p>
      </div>
      <CustCardTO />
      <CustCardTO />
      <CustCardTO />
    </div>
  );
};

export default MyTryoutTab;
