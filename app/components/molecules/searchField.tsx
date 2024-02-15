import Image from "next/image";
import search from "../../assets/icons/search.svg";

const SearchField = () => {
    return (
        <div className="w-full flex items-center relative rounded-full overflow-hidden">
            <Image src={search} priority className="absolute left-5 top-1/2 -translate-y-1/2" alt="SearchIcon" width={20} height={20} />
            <input type="text" className="w-full ps-14 text-sm pe-4 py-3 active:outline-none focus:outline-none" placeholder="Search" />
        </div>
    );
}

export default SearchField;