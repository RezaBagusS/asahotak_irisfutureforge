import CustListMaterial from "../atoms/custCardMaterial";

// link_ppt: "https://drive.google.com/file/d/1jM5c4gw3-y0ydHT6Kpqt7UKNoRDN2hWH/preview",
//     link_quiz: "https://forms.gle/3S3wy1BN5KQqcoRE9"

interface lesson {
  id_lesson?: number;
  title?: string;
  codeLesson?: string;
  link_ppt?: string | "";
  link_video?: string | "";
  link_quiz?: string | "";
  openLesson?: boolean;
  id_course?: number;
  isDone?: boolean;
  createdAt?: Date;
}

interface ListMaterialProps {
  dataLesson: lesson[]
}

const ListMaterial = ({ dataLesson }: ListMaterialProps ) => {

  return (
    <div className="flex flex-col gap-3 mt-10 text-custBlack">
      <h2 className="text-base text-gray-500 px-5">
        The following is a list of materials & meetings that you can access :
      </h2>

      {dataLesson.map((item, index) => {
        return <CustListMaterial key={index} index={index} data={item} />;
      })}

    </div>
  );
};

export default ListMaterial;
