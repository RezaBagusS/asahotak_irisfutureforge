'use client'

import Image from "next/image";
import search from "../../assets/icons/search.svg";
import { useDispatch } from "react-redux";
import { setKeyword } from "@/app/redux/slices/reduxKeywordSearchSlices";

const SearchField = () => {

    const dispatch = useDispatch();

    const handleSearch = (e: any) => {
        setTimeout(() => {
            dispatch(setKeyword({ keyword: e.target.value }));
        }, 1000);
    }

    return (
        <div className="w-full flex items-center relative rounded-full overflow-hidden">
            <Image src={search} priority className="absolute left-5 top-1/2 -translate-y-1/2" alt="SearchIcon" width={20} height={20} />
            <input type="text" onChange={
                handleSearch
            } className="w-full ps-14 text-sm pe-4 py-3 active:outline-none focus:outline-none" placeholder="Search" />
        </div>
    );
}

export default SearchField;