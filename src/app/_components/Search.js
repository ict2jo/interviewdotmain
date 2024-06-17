import Input from "./Input";

function Search() {
  return (
    <div className="flex justify-center items-center ml-auto">
      <div className="relative">
        <input
          className="w-56 h-8 pl-2 pr-10 border border-gray-700 bg-gray-400 rounded-full placeholder-gray-800 text-xs shadow-md"
          placeholder="궁금한 것을 검색해 보세요."
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 absolute right-2 top-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>
    </div>
  );
}

export default Search;
