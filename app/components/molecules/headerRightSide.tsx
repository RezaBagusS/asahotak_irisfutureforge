import { FC, useEffect, useState } from "react";
import bell from "../../assets/icons/bell.svg";
import Image from "next/image";
import profile from "../../assets/defaultprofile.png";
import { useDispatch, useSelector } from "react-redux";
import { setPopup } from "@/app/redux/slices/reduxPopUpSlices";
import { useRouter } from "next/navigation";
import CustBadgeUser from "@/app/components/atoms/custBadgeUser";

interface HeaderProps {}

export default function HeaderRightSide<FC>({}: HeaderProps) {
  const [openProfile,setOpenProfile] = useState(false);
  const dispatch = useDispatch();
  const route = useRouter();
  const user = useSelector((state:any) => state.userData.data);

  const handleLogout = () => {
    dispatch(setPopup({
      title: "Logout",
      message: "Are you sure want to logout?",
      show: true,
      type: "confirm",
      onConfirm: () => {
        localStorage.clear();
        route.push("/auth/login");
      },
      onCancel: () => {
        dispatch(setPopup({
          show: false,
        }))
      }
    }))
  }

  const toggleProfile = () => {
    setOpenProfile((prev) => !prev);
  }

  return (
    <div className="relative flex justify-end items-center gap-4">
      <CustBadgeUser insentif={user.intensif} />
      <Image src={bell} alt="bell" width={30} height={30} />
      <div className="cursor-pointer">
        <Image
          src={profile}
          alt="profile"
          onClick={toggleProfile}
          width={50}
          height={50}
          className="rounded-lg z-40"
        />
        <div className={`absolute right-0 z-30 bg-white border p-2 rounded-md transition-all duration-150
          ${openProfile ? "opacity-100 -bottom-24" : "opacity-0 -bottom-20"}
        `}>
          <p className="text-sm font-semibold">{user.username}</p>
          <p className="text-xs">{user.email}</p>
          <div className="flex justify-end">
            <button 
            onClick={handleLogout}
            className="mt-3 py-1 px-2 text-sm rounded-md bg-custPrimary text-white">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
