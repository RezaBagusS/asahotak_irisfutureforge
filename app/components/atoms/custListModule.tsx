import Link from "next/link";
import Image from "next/image";
import DashboardIcon from "@/app/assets/icons/DashboardIcon";
import { ListModuleProps } from "../../types";

const CustListModule = ({
  title = "dashboard",
  icon = <DashboardIcon height={20} width={20} fill={"white"} />,
  link = "/dashboard",
  isActive = false,
}: ListModuleProps) => {

  return (
    <Link
      href={link}
      className={`${
        isActive
          ? "bg-custPrimary text-custWhite hover:bg-opacity-80"
          : "text-custBlack/70 hover:bg-custBackground/40"
      } px-2 py-3 font-semibold flex gap-2 items-center rounded-md cursor-pointer transition-all duration-200`}
    >
      {icon}
      <h2 className="text-sm">{title}</h2>
    </Link>
  );
};

export default CustListModule;
