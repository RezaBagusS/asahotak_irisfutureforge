import React from "react";
import CustButtonMenuMobile from "../atoms/custButtonMenuMobile";
import SearchField from "../molecules/searchField";

const HeaderCourses = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex md:hidden">
        <CustButtonMenuMobile />
      </div>
      <SearchField />
    </div>
  );
};

export default HeaderCourses;
