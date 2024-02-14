import tripleDot from '../../assets/icons/tripleDot.svg';
import Image from 'next/image';

interface CustCardBoardProps {
    title: string;
    score: number;
}

export default function CustCardBoard({title, score}: CustCardBoardProps){
    return (
        <div className="relative flex flex-col p-3 items-start justify-center w-1/3 h-28 bg-custSecondary text-custPrimary rounded-3xl shadow-md">
            <p className="text-sm font-normal">{title}</p>
            <p className="text-3xl font-bold">{score}</p>
            <Image src={tripleDot} className='absolute cursor-pointer top-7 right-4 h-auto' width={5} alt="tripleDot" />
        </div>
    );
}