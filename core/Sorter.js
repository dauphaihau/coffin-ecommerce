import {useFilterContext} from "../context/filterContext";
import {ViewGridIcon, MenuIcon} from "@heroicons/react/outline";
import {Select} from "./Input";
import {sortOpts} from "../assets/data/options";

const Sorter = () => {
  const {
    setGridView,
    setListView,
    gridView,
    updateSort,
  } = useFilterContext()

  return (
    <div className='flex gap-x-8'>
      <div className='hidden ipad:flex items-center'>
        <p className='mr-4'>View:</p>
        <ViewGridIcon className={`btn-icon mr-1 ${gridView && 'text-black bg-gray-200'}`} onClick={() => setGridView()}/>
        <MenuIcon className={`btn-icon ${!gridView && 'text-black bg-gray-200'}`} onClick={() => setListView()}/>
      </div>
      <div className='flex gap-x-4 items-center'>
        <p className='hidden laptop:block'>Short by:</p>
        <Select
          classesSpace='m-0'
          options={sortOpts}
          onChange={updateSort}
        />
      </div>
    </div>
  );
}

export default Sorter;