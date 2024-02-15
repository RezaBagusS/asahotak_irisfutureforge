import { FC } from "react";
import bell from '../../assets/icons/bell.svg';
import Image from "next/image";
import profile from '../../assets/defaultprofile.png';

interface HeaderProps {}

export default function HeaderRightSide<FC>({ }: HeaderProps) {
  return (
    <div className="flex justify-end items-center gap-4">
        <Image src={bell} alt="bell" width={30} height={30} />
        <Image src={profile} alt="profile" width={50} height={50} className="rounded-lg" />
    </div>
  );
}