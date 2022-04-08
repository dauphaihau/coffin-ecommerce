import {useState, useEffect} from 'react'
import {XIcon} from "@heroicons/react/solid";
import {useUtil} from "../../context/utilContext";
import Filters from "../Filters";

const FiltersDrawer = () => {

  const [renderClientSideComponent, setRenderClientSideComponent] = useState(false)
  const {drawerFiltersToggle, drawerFiltersOpen, categories} = useUtil();

  useEffect(() => {
    setRenderClientSideComponent(true)
  }, [])

  if (!renderClientSideComponent) return null

  return (
    <>
      <aside className={`drawer ${drawerFiltersOpen && 'open'} w-[70%] ipad:w-1/3`}>
        <div className="flex flex-col w-full h-full py-4 px-5 laptop:px-8 laptop:p-8">
          <div className='flex justify-between items-center h-[9%] ipad:h-[6.6%] laptop:h-[7%] '>
            <h1 className="text-2xl font-black">Filter</h1>
            <XIcon className='btn-icon' onClick={() => drawerFiltersToggle()}/>
          </div>
          <div className='border-b'></div>
          <div className='mt-8'>
            <Filters categories={categories}/>
          </div>
        </div>
      </aside>
    </>
  )
}

export default FiltersDrawer;