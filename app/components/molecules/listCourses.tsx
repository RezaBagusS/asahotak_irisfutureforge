import { useEffect, useState } from "react";
import CustListCourse from "../atoms/custListCourse";
import { useSelector } from "react-redux";

const dataCourses = [
    {
        id: 1,
        title: 'Pengetahuan Kuantitatif',
        description: 'Pengenalan dan penerapan konsep-konsep dasar matematika dalam ilmu ekonomi',
        percentage: 100,
        path: "/dashboard/courses/pengetahuan-kuantitatif"
    },
    {
        id: 2,
        title: 'Penalaran Umum',
        description: 'Pengenalan dan penerapan konsep-konsep dasar matematika dalam ilmu ekonomi',
        percentage: 80,
        path: "/dashboard/courses/penalaran-umum"
    },
    {
        id: 3,
        title: 'Penalaran Matematika',
        description: 'Pengenalan dan penerapan konsep-konsep dasar matematika dalam ilmu ekonomi',
        percentage: 40,
        path: "/dashboard/courses/penalaran-matematika"
    },
    {
        id: 4,
        title: 'Penalaran dan Pemahaman Umum',
        description: 'Pengenalan dan penerapan konsep-konsep dasar matematika dalam ilmu ekonomi',
        percentage: 0,
        path: "/dashboard/courses/penalaran-dan-pemahaman-umum"
    },
    {
        id: 5,
        title: 'Literasi Bahasa Inggris',
        description: 'Pengenalan dan penerapan konsep-konsep dasar matematika dalam ilmu ekonomi',
        percentage: 60,
        path: "/dashboard/courses/literasi-bahasa-inggris"
    },
    {
        id: 6,
        title: 'Literasi Bahasa Indonesia',
        description: 'Pengenalan dan penerapan konsep-konsep dasar matematika dalam ilmu ekonomi',
        percentage: 10,
        path: "/dashboard/courses/literasi-bahasa-indonesia"
    },
    {
        id: 7,
        title: 'Kemampuan Memahami Bacaan dan Menulis',
        description: 'Pengenalan dan penerapan konsep-konsep dasar matematika dalam ilmu ekonomi',
        percentage: 100,
        path: "/dashboard/courses/kemampuan-memahami-bacaan-dan-menulis"
    }
]

interface ListCoursesProps {
    id?: number;
    title: string;
    description: string;
    percentage: number;
    path: string;
}

const ListCourses = () => {

    const [sortedData, setSortedData] = useState<ListCoursesProps[]>([])
    const keyword = useSelector((state: any) => state.keywordSearch.data.keyword);

    const handleSortData = (data: ListCoursesProps[]) => {
        return data.sort((a, b) => {
            return a.percentage - b.percentage;
        })
    }

    useEffect(() => {
    
        const handleSearch = (dataCourses:ListCoursesProps[], keyword: string) => {
            return dataCourses.filter((data) => {
                return data.title.toLowerCase().includes(keyword.toLowerCase())
            })
        }

        setSortedData(handleSortData(handleSearch(dataCourses, keyword)))
        
    },[keyword])

    return (
        <div className="w-full bg-white rounded-md px-4 py-6">  
            <p className="text-sm text-gray-500 border-b pb-1">Search by: {keyword}</p>
            <div className="flex flex-col gap-3 mt-5">
                {
                    sortedData.map((data, index) => {
                        return(
                            <CustListCourse key={index} data={data} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ListCourses;
