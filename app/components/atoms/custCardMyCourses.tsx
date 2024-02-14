import Image from "next/image";
import Link from "next/link";

interface CustCardMyCoursesProps {
    title: string;
    desc: string;
    profile: {
        icon: string;
        name: string;
    }
}

export default function CustCardMyCourses({ title, desc, profile }: CustCardMyCoursesProps) {
    const { icon, name } = profile;

    return (
        <div className="relative bg-white min-w-72 p-7 min-h-40 flex flex-col gap-2 overflow-hidden rounded-3xl">
            <span className="absolute left-0 top-0 bg-custSecondary p-2 w-full"></span>
            <h3 className="text-sm font-semibold">{title}</h3>
            <p className="text-xs">{desc}</p>
            <div className="flex items-center gap-2 mt-6 mb-3">
                <Image src={icon} alt={name} width={20} height={20} />
                <p className="text-xs">{name}</p>
            </div>
            <Link href={"#"} className="cursor-pointer absolute text-[10px] text-custPrimary right-7 bottom-3">
                View Details
            </Link>
        </div>
    )
}