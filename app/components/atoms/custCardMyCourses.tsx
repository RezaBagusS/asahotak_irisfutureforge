import Image from "next/image";
import Link from "next/link";
import profileIcon from "../../assets/icons/profileIcon.svg";

interface CustCardMyCoursesProps {
  dataInfo: {
    id: number;
    id_course: number;
    course: string | undefined;
    commit_message: string;
    admin: string;
    createdAt: Date;
    link: string;
  };
}

export default function CustCardMyCourses({
  dataInfo,
}: CustCardMyCoursesProps) {
  const { course, commit_message, link, admin, createdAt } = dataInfo;

  return (
    <div className="relative bg-white min-w-72 px-7 pt-7 pb-3 min-h-40 flex flex-col justify-between gap-2 overflow-hidden rounded-3xl">
      <div className="">
        <span className="absolute left-0 top-0 bg-custSecondary p-2 w-full"></span>
        <h3 className="text-sm font-semibold">{course}</h3>
        <p className="text-xs">{commit_message}</p>
      </div>
      <div className="flex justify-between items-end">
        <div className="flex items-center gap-2">
            <Image src={profileIcon} alt={course || ""} width={20} height={20} />
            <p className="text-xs">{admin}</p>
        </div>
        <Link
            href={link}
            className="cursor-pointer text-[10px] text-custPrimary"
        >
            View Details
        </Link>
      </div>
    </div>
  );
}
