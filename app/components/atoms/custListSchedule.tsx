import Link from "next/link"

interface CustListScheduleProps {
    title:string,
    date:string
}

const CustListSchedule = ({ 
    title,
    date
}: CustListScheduleProps) => {
    return (
        <Link 
        href={"/dashboard/tryout?active=mytryout"}
        className="bg-white flex gap-5 items-center rounded-xl p-7 hover:drop-shadow-md">
            <span className="h-2 w-2 rounded-full bg-[#9056BF]"></span>
            <div className="flex flex-col gap-1 text-sm">
                <h3 className="font-bold">{title}</h3>
                <p className="text-custBackground">{date}</p>
            </div>
        </Link>
    )
}

export default CustListSchedule;