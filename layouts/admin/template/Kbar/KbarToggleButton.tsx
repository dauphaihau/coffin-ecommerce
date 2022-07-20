import {useKBar} from 'kbar';
import {SearchIcon} from "@heroicons/react/solid";

export function KBarToggleButton() {
  const {query} = useKBar();

  return (
    <button
      onClick={() => query.toggle()}
      className="
       relative inline-flex items-center justify-center
       py-[7px] px-5 overflow-hidden text-sm
       font-medium text-gray-custom-506a rounded-lg group
       bg-white hover:bg-gray-custom-497 group-hover:from-purple-600 group-hover:to-blue-500
       border border-gray-300 dark:text-white
     ">
      <SearchIcon className="w-4 h-4 mr-2 -ml-1"/>
      <span className="
            pr-10 transition-all ease-in duration-75
            bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
       Quick search...
      </span>
      <span>⌘ K</span>
    </button>
  );
}
