import HeaderRightSide from "./headerRightSide";
import CustButtonMenuMobile from "../atoms/custButtonMenuMobile";

const HeaderDashboard = () => {
  return (
    <div className="xl:hidden flex flex-col gap-2">
        <div className="flex items-center justify-between md:justify-end gap-10">
            <div className="flex md:hidden">
                <CustButtonMenuMobile />
            </div>
            <div className="flex xl:hidden">
                <HeaderRightSide />
            </div>
        </div>
    </div>
  );
};

export default HeaderDashboard;
