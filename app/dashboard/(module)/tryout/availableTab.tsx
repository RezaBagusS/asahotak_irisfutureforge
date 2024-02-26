import CustCardTO from "@/app/components/atoms/custCardTO";
import BannerTryout from "@/app/components/molecules/bannerTryout";

const AvailableTab = () => {
  return (
    <div className="w-full flex flex-col gap-3 relative">
      <BannerTryout />
      <CustCardTO />
      <CustCardTO />
      <CustCardTO />
    </div>
  );
};

export default AvailableTab;
