"use client";

import { useEffect, useState } from "react";
import CustListCourse from "../atoms/custListCourse";
import { useSelector } from "react-redux";
import { getUserCourse } from "@/app/helpers/getCourse";
import { IoIosWarning } from "react-icons/io";

const dataCourses = [
  {
    id: 1,
    title: "Pengetahuan Kuantitatif",
    description:
      "Pengenalan dan penerapan konsep-konsep dasar matematika dalam ilmu ekonomi",
    percentage: 100,
    path: "/dashboard/courses/pengetahuan-kuantitatif",
  },
  {
    id: 2,
    title: "Penalaran Umum",
    description:
      "Pengenalan dan penerapan konsep-konsep dasar matematika dalam ilmu ekonomi",
    percentage: 80,
    path: "/dashboard/courses/penalaran-umum",
  },
  {
    id: 3,
    title: "Penalaran Matematika",
    description:
      "Pengenalan dan penerapan konsep-konsep dasar matematika dalam ilmu ekonomi",
    percentage: 40,
    path: "/dashboard/courses/penalaran-matematika",
  },
  {
    id: 4,
    title: "Penalaran dan Pemahaman Umum",
    description:
      "Pengenalan dan penerapan konsep-konsep dasar matematika dalam ilmu ekonomi",
    percentage: 0,
    path: "/dashboard/courses/penalaran-dan-pemahaman-umum",
  },
  {
    id: 5,
    title: "Literasi Bahasa Inggris",
    description:
      "Pengenalan dan penerapan konsep-konsep dasar matematika dalam ilmu ekonomi",
    percentage: 60,
    path: "/dashboard/courses/literasi-bahasa-inggris",
  },
  {
    id: 6,
    title: "Literasi Bahasa Indonesia",
    description:
      "Pengenalan dan penerapan konsep-konsep dasar matematika dalam ilmu ekonomi",
    percentage: 10,
    path: "/dashboard/courses/literasi-bahasa-indonesia",
  },
  {
    id: 7,
    title: "Kemampuan Memahami Bacaan dan Menulis",
    description:
      "Pengenalan dan penerapan konsep-konsep dasar matematika dalam ilmu ekonomi",
    percentage: 100,
    path: "/dashboard/courses/kemampuan-memahami-bacaan-dan-menulis",
  },
];

interface ListCourse {
  id: number;
  title: string;
  description: string;
  codeCourse: string;
  countCourse: number;
  createdAt: Date;
  percentage?: number;
}

interface ListCoursesProps {
  dataCourse: ListCourse[];
}

interface UserCourse {
  id: number;
  id_user: number;
  id_course: number;
  percentage: number;
  createdAt: Date;
}

const ListCourses = ({ dataCourse }: ListCoursesProps) => {
  const [sortedData, setSortedData] = useState<ListCourse[]>([]);
  const [userCourse, setUserCourse] = useState<UserCourse[]>([
    {
        id: 0,
        id_user: 0,
        id_course: 0,
        percentage: 0,
        createdAt: new Date(),
    }
  ]);
  const [loading, setLoading] = useState(true);
  const keyword = useSelector((state: any) => state.keywordSearch.data.keyword);
  const userData = useSelector((state: any) => state.userData.data);

  useEffect(() => {
    setTimeout(() => {
        userCourse && setLoading(false);
    }, 700);
  }, [userCourse]);

  useEffect(() => {
    // Percentage
    const getPercentage = (id_course: number) => {
      const percentage = userCourse.find(
        (data) => data.id_course === id_course
      );

      if (percentage) {
        return percentage.percentage;
      }

      return 0;
    };

    //   Sort Data
    const handleSortData = (data: ListCourse[]) => {
      const sortData = data.map((item) => {
        return {
          id: item.id,
          title: item.title,
          description: item.description,
          codeCourse: item.codeCourse,
          countCourse: item.countCourse,
          createdAt: item.createdAt,
          percentage: getPercentage(item.id),
        };
      });

      sortData.sort((a, b) => {
        return a.percentage - b.percentage;
      });

      setSortedData(sortData);
    };

    // Get User Courses
    const getUserCourses = async () => {
      const res = await getUserCourse(userData.id);
      if (res) {
        setUserCourse(res);
      }
    };

    getUserCourses();
    handleSortData(dataCourse);
  }, [keyword, dataCourse, userData]);

  return (
    <div className="w-full bg-white rounded-md px-4 py-6">
      <p className="text-sm text-gray-500 border-b pb-1">
        Search by: {keyword}
      </p>
      <div className="flex flex-col gap-3 mt-5">
        {loading ? (
          <div className="py-6 w-full rounded-md bg-gray-300 animate-pulse flex justify-center">
            <span>
                Loading . . .
            </span>
          </div>
        ) : userCourse.length == 0 ? (
          <div className="bg-red-600 rounded-md py-6 px-4 text-white">
            <p className="text-sm flex items-center gap-3">
              <IoIosWarning className="text-white text-3xl" />
              You have not joined any courses yet
            </p>
          </div>
        ) : (
          sortedData.map((data, index) => {
            return <CustListCourse key={index} data={data} />;
          })
        )}
      </div>
    </div>
  );
};

export default ListCourses;
