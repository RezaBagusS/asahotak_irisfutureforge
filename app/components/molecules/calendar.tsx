"use client";

import dayjs from "dayjs";
import formatDate from "dayjs";
import { useEffect, useState } from "react";
import chevron from "../../assets/icons/chevron.svg";
import Image from "next/image";

const arrMonth = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Agustus",
  "September",
  "October",
  "November",
  "December",
];

const generateDate = (
  month = formatDate().month(),
  year = formatDate().year()
) => {
  const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
  const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");

  const arrayOfDates = [];

  // Generate pre-date
  for (let i = 0; i < firstDateOfMonth.day(); i++) {
    arrayOfDates.push({
      date: firstDateOfMonth.subtract(i + 1, "day"),
      currentMonth: false,
    });
  }

  // Generate current date
  for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
    const currentDate = firstDateOfMonth.date(i);
    arrayOfDates.push({
      date: currentDate,
      currentMonth: true,
      today: currentDate.isSame(dayjs(), "day"),
    });
  }

  const postDate = 42 - arrayOfDates.length;

  // Generate post-date
  for (let i = 1; i <= postDate; i++) {
    arrayOfDates.push({
      date: lastDateOfMonth.add(i, "day"),
      currentMonth: false,
    });
  }

  return arrayOfDates;
};

const anotherDay = (...clasess: Array<String>) => {
  return clasess.filter(Boolean).join(" ");
};

interface IBookingDetail {
  name?: string;
  phoneNumber?: string;
  instagram?: string;
  session?: string;
  date?: string;
}

interface PropsBookingDetail {
  setBookingDetail: React.Dispatch<React.SetStateAction<IBookingDetail>>;
}

const Calendar = () => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectedDate, setSelectedDate] = useState(currentDate);

  const prevDay = () => {
    setToday(today.month(today.month() - 1));
  };

  const nextDay = () => {
    setToday(today.month(today.month() + 1));
  };

  const getSelectedDate = (date: dayjs.Dayjs) => {
    setSelectedDate(date);
  };

  return (
    <div className="bg-white rounded-md text-custBlack flex flex-col gap-5 p-5 w-full max-h-72">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-base">
          {arrMonth[today.month()]}, {today.year()}
        </h1>
        <div className="flex gap-2">
          <Image
            src={chevron}
            alt="chevron"
            height={2}
            onClick={prevDay}
            className="cursor-pointer w-auto ring-1 ring-[#B1B1B1] hover:bg-gray-300 rounded-full grid place-content-center hover:-translate-x-1 transition-all ease-out "
          />
          <Image
            src={chevron}
            alt="chevron"
            height={2}
            onClick={nextDay}
            className="rotate-180 cursor-pointer w-auto ring-1 ring-[#B1B1B1] hover:bg-gray-300 rounded-full grid place-content-center hover:translate-x-1 transition-all ease-out"
          />
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          return (
            <div
              key={index}
              className="flex justify-center items-center mb-2 text-sm font-bold"
            >
              <p>{day}</p>
            </div>
          );
        })}
        {generateDate(today.month(), today.year()).map(
          ({ date, currentMonth, today }, index) => {
            return (
              <div
                key={index}
                className="flex justify-center items-center"
              >
                <p
                  className={anotherDay(
                    currentMonth ? "" : "text-gray-400",
                    today ? "bg-red-600 text-white" : "",
                    selectedDate.toDate().toDateString() ===
                      date.toDate().toDateString()
                      ? "bg-black text-white"
                      : "",
                    "h-6 w-6 text-xs rounded-full grid place-content-center hover:bg-black/70 hover:text-white cursor-pointer transition-all"
                  )}
                  onClick={() => getSelectedDate(date)}
                >
                  {date.date()}
                </p>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Calendar;
