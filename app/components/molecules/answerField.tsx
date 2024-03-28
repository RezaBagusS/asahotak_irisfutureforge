import Link from "next/link";
import { useState } from "react";

interface AnswerFieldProps {
    idTryout?: string;
    idMaterial?: string;
}

const AnswerField = ({ idTryout, idMaterial }: AnswerFieldProps) => {

    const [answer, setAnswer] = useState<string>("");

    return (
        <div className="flex flex-col gap-3 overflow-y-auto">
            {Array.from({ length: 5 }, (_, i) => (
                <Link
                    key={i}
                    onClick={() => setAnswer(String.fromCharCode(65 + i))}
                    href={`/dashboard/tryout/test?id=${idTryout}&subtest=${idMaterial}&answer=${answer}`}
                    className="flex items-center gap-3 cursor-pointer group"
                >
                    <div
                        className={`flex gap-2 items-center col-span-2 justify-center rounded-sm aspect-square w-[45px] h-[45px] border
                ${
                            answer == String.fromCharCode(65 + i)
                                ? "bg-custPrimary text-white"
                                : "bg-slate-100 text-custBlack group-hover:bg-slate-200"
                        }
            `}
                    >
                        <h1 className="text-sm font-bold">{String.fromCharCode(65 + i)}</h1>
                    </div>
                    <div className="col-span-10">
                        <p>Bapak Anton</p>
                    </div>
                </Link>
            ))}
        </div>
    );

  return (
    <div className="flex flex-col gap-3 overflow-y-auto">
      {Array.from({ length: 5 }, (_, i) => (
        <Link
          key={i}
          href={`/dashboard/tryout/test?id=${idTryout}&subtest=${idMaterial}&answer=${String.fromCharCode(65 + i)}`}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div
            className={`flex gap-2 items-center col-span-2 justify-center rounded-sm aspect-square w-[45px] h-[45px] border
                ${
                  answer == String.fromCharCode(65 + i)
                    ? "bg-custPrimary text-white"
                    : "bg-slate-100 text-custBlack group-hover:bg-slate-200"
                }
            `}
          >
            <h1 className="text-sm font-bold">{String.fromCharCode(65 + i)}</h1>
          </div>
          <div className="col-span-10">
            <p>Bapak Anton</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AnswerField;