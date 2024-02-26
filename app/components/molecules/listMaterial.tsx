import CustListMaterial from "../atoms/custCardMaterial";

const dataMateri = [
  {
    id: 1,
    id_course: 1,
    title: "Introduction to Quantitative Knowledge",
    isDone: true,
    link_ppt: "https://drive.google.com/file/d/1jM5c4gw3-y0ydHT6Kpqt7UKNoRDN2hWH/preview",
    link_quiz: "https://forms.gle/3S3wy1BN5KQqcoRE9"
  },
  {
    id: 2,
    id_course: 1,
    title: "Quantitative Knowledge in Economics and Business",
    isDone: false,
    link_ppt: "https://drive.google.com/file/d/1jM5c4gw3-y0ydHT6Kpqt7UKNoRDN2hWH/preview",
    link_quiz: "https://forms.gle/3S3wy1BN5KQqcoRE9"
  },
  {
    id: 3,
    id_course: 1,
    title: "How to Understand Quantitative Knowledge in Economics and Business",
    isDone: false,
    link_ppt: "https://drive.google.com/file/d/1jM5c4gw3-y0ydHT6Kpqt7UKNoRDN2hWH/preview",
    link_quiz: "https://forms.gle/3S3wy1BN5KQqcoRE9"
  },
  {
    id: 4,
    id_course: 1,
    title: "Implementation of Quantitative Knowledge in Economics and Business",
    isDone: false,
    link_ppt: "https://drive.google.com/file/d/1jM5c4gw3-y0ydHT6Kpqt7UKNoRDN2hWH/preview",
    link_quiz: "https://forms.gle/3S3wy1BN5KQqcoRE9"
  },
  {
    id: 5,
    id_course: 1,
    title: "Key Concepts in Quantitative Knowledge in Economics and Business",
    isDone: false,
    link_ppt: "https://drive.google.com/file/d/1jM5c4gw3-y0ydHT6Kpqt7UKNoRDN2hWH/preview",
    link_quiz: "https://forms.gle/3S3wy1BN5KQqcoRE9"
  },
];

const ListMaterial = () => {
  return (
    <div className="flex flex-col gap-3 mt-10 text-custBlack">
      <h2 className="text-base text-gray-500 px-5">
        The following is a list of materials & meetings that you can access :
      </h2>

      {dataMateri.map((data, index) => {
        return <CustListMaterial key={index} data={data} />;
      })}

    </div>
  );
};

export default ListMaterial;
