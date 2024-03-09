import Link from "next/link";
import getSlug from "@/app/helpers/getSlug";

interface ListCourse {
  data: {
    id: number;
    title: string;
    description: string;
    codeCourse: string;
    countCourse: number;
    createdAt: Date;
    percentage?: number | 0;
  };
}

const CustListCourse = ({ data }: ListCourse) => {
  const { id, title, description, percentage } = data;
  
  const path = `/dashboard/courses/${id}/${getSlug(title)}`;

  const handleColorPercentage = (percentage: number) => {
    if (percentage === 100) {
      return "ring-custFourth";
    } else if (percentage >= 50) {
      return "ring-custSecondary";
    } else {
      return "ring-custThird";
    }
  };

  const handleColorLeftCard = (percentage: number) => {
    if (percentage === 100) {
      return "bg-custFourth";
    } else if (percentage >= 50) {
      return "bg-custSecondary";
    } else {
      return "bg-custThird";
    }
  };

  return (
    <Link
      href={path}
      className="w-full relative flex overflow-hidden cursor-pointer bg-[#FAFAFA] ring-1 hover:ring-2 ring-custBlack/20 hover:ring-custBlack/40 rounded-md transition-all duration-200 group"
    >
      <span className={`w-3 ${handleColorLeftCard(percentage || 0)}`}></span>
      <div className="ps-4 pe-16 py-3">
        <p className="text-sm font-bold text-gray-600">{title}</p>
        <p className="text-sm text-gray-300">
          {description.slice(0, 38) + "..."}
        </p>
      </div>
      <span
        className={`absolute top-1/2 w-10 h-10 grid place-content-center ring-2 rounded-full -translate-y-1/2 right-3 font-semibold text-[10px]
        ${handleColorPercentage(percentage || 0)}
      `}
      >
        {percentage}%
      </span>
    </Link>
  )
};

export default CustListCourse;
