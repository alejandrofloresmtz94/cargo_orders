import searchImg from '../../assets/Search/Group/search.svg';
import './SearchBar.css';

const SearchBar = ( { filter, setFilter } : any) => {

    return (
        <div className="flex flex-row min-w-full mt-12 pb-4 border-b border-[#2C2C2C]">
            <div className='flex items-center justify-center ml-2 mr-5 text-center rounded-full oval'>
                <img src={searchImg} alt="Search Image" />
            </div>
            <input type="search" placeholder="Search..." value={filter} onChange={(event) => setFilter(event.target.value)} className="w-10/12 text-base bg-black searchInput font-AvenirMedium" />
        </div>
    )
}

export default SearchBar;