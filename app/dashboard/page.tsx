import { title } from "process";
import CustBanner from "../components/atoms/custBanner";
import CustCardBoard from "../components/atoms/custCardBoard";
import SearchField from "../components/molecules/searchField";
import profileIcon from "../assets/icons/profileIcon.svg";
import CustCardMyCourses from "../components/atoms/custCardMyCourses";

const dataBoard = [
  {
    title: "Your Score",
    score: 825,
  },
  {
    title: "Complete Try Out",
    score: 2,
  },
  {
    title: "Upcoming Try Out",
    score: 1,
  },
];

const dataMyCourse = [
  {
    title: "Kemampuan Kuantitif",
    desc: "Record Materi Pertemuan ke-4",
    profile: {
      icon: profileIcon,
      name: "Rehan Risqi Saputra",
    },
  },
  {
    title: "Kemampuan Kuantitif",
    desc: "Record Materi Pertemuan ke-4",
    profile: {
      icon: profileIcon,
      name: "Rehan Risqi Saputra",
    },
  },
  {
    title: "Kemampuan Kuantitif",
    desc: "Record Materi Pertemuan ke-4",
    profile: {
      icon: profileIcon,
      name: "Rehan Risqi Saputra",
    },
  },
  {
    title: "Kemampuan Kuantitif",
    desc: "Record Materi Pertemuan ke-4",
    profile: {
      icon: profileIcon,
      name: "Rehan Risqi Saputra",
    },
  },
];

interface DashboardPageProps {}

export default function DashboardPage({}: DashboardPageProps) {
  return (
    <div className="flex flex-col gap-5">
      <SearchField />
      <div className="flex flex-col gap-14">
        <CustBanner />
        <div className="flex gap-7">
          {dataBoard.map((item, index) => {
            const { title, score } = item;
            return <CustCardBoard title={title} score={score} key={index} />;
          })}
        </div>
        <div className="py-5">
          <div className="flex justify-between items-end">
            <h2 className="text-custPrimary font-bold text-3xl">My Course</h2>
            <p className="text-custPrimary text-sm cursor-pointer">See all</p>
          </div>
          <div className="w-auto overflow-x-auto flex gap-7 py-4">
            {
              dataMyCourse.map((item, index) => {
                const { title, desc, profile } = item;
                return <CustCardMyCourses title={title} desc={desc} profile={profile} key={index} />;
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}
