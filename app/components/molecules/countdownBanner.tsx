import dayjs from "dayjs";
import { useEffect, useState } from "react";

interface CountDownBannerProps {
    targetDate: string;
}

const CountDownBanner = ({ targetDate }: CountDownBannerProps) => {
    const [countDown, setCountDown] = useState<number | undefined>(undefined);

    const getToday = () => {

        const today = dayjs();

        const day = today.date();
        const month = today.month()+1;
        const year = today.year();

        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        const currentDate = dayjs(getToday());
        const targetDateObject = dayjs(targetDate);

        const differenceInDay = targetDateObject.diff(currentDate, 'day');

        setCountDown(differenceInDay);

    }, [targetDate, getToday]);

    return (
        <div className="w-full rounded-xl p-5 bg-custThird text-custWhite flex flex-col gap-3">
            <p className="text-xs">Countdown SNBT 2024</p>
            <p className="text-3xl font-bold">D - {countDown} days</p>
        </div>
    );
};

export default CountDownBanner;
