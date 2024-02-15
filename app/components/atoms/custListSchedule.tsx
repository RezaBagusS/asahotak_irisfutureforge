interface CustListScheduleProps {
    title:string,
    date:string
}

const CustListSchedule = ({ 
    title,
    date
}: CustListScheduleProps) => {
    return (
        <div className="bg-white flex gap-5 items-center rounded-3xl p-7">
            <span className="h-2 w-2 rounded-full bg-[#9056BF]"></span>
            <div className="flex flex-col gap-1 text-sm">
                <h3 className="font-bold">{title}</h3>
                <p className="text-custBackground">{date}</p>
            </div>
        </div>
    )
}

export default CustListSchedule;