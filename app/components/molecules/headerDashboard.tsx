import SearchField from "./searchField";
import HeaderRightSide from "./headerRightSide";
import CustButtonMenuMobile from "../atoms/custButtonMenuMobile";

const HeaderDashboard = () => {
  return (
    <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-10">
            <div className="flex md:hidden">
                <CustButtonMenuMobile />
            </div>
            <div className="hidden sm:flex sm:w-full">
                <SearchField />
            </div>
            <div className="flex xl:hidden">
                <HeaderRightSide />
            </div>
        </div>
        <div className="w-full mt-5 sm:hidden">
            <SearchField />
        </div>
    </div>
  );
};

export default HeaderDashboard;
