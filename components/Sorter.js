import {useFilterContext} from "../context/filterContext";
import {ViewGridIcon, MenuIcon} from "@heroicons/react/outline";
import {Select} from "./Input";

const options = [
  {
    value: '',
    label: 'Sort Options',
  },
  {
    value: 'price-lowest',
    label: 'price (lowest)',
  },
  {
    value: 'price-highest',
    label: 'price (highest)',
  },
  {
    value: 'name-a',
    label: 'name (a-z)',
  },
  {
    value: 'name-z',
    label: 'name (z-a)',
  },
]

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
          options={options}
          onChange={updateSort}
        />
      </div>
    </div>
  );
}

export default Sorter;