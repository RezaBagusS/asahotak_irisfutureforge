import Link from 'next/link';
import tripleDot from '../../assets/icons/tripleDot.svg';
import Image from 'next/image';

interface CustCardBoardProps {
    title: string;
    score: number;
}

export default function CustCardBoard({title, score}: CustCardBoardProps){
    
    return (
        <div className="relative flex flex-col p-3 items-start justify-center w-full sm:w-1/3 h-20 sm:h-28 bg-custSecondary text-custPrimary rounded-3xl shadow-md">
            <p className="text-xs sm:text-sm font-normal">{title || 0}</p>
            <p className="text-base sm:text-lg font-bold">{score || 0}</p>
            <Link href={"/dashboard/tryout?active=mytryout"}>
                <Image src={tripleDot}  className='absolute cursor-pointer top-4 sm:top-7 right-4 h-auto w-1' alt="tripleDot" />
            </Link>
        </div>
    );
}