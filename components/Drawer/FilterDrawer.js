import {useState, useEffect} from 'react'
import {useUtil} from "../../context/utilContext";
import Filters from "../Filters";
import Drawer from "./Drawer";
import {Button} from "../index";
import {useFilterContext} from "../../context/filterContext";

const FiltersDrawer = () => {

  const [renderClientSideComponent, setRenderClientSideComponent] = useState(false)
  const {drawerFiltersToggle, drawerFiltersOpen, categories} = useUtil();

  const {clearFilters} = useFilterContext()

  useEffect(() => {
    setRenderClientSideComponent(true)
  }, [])

  if (!renderClientSideComponent) return null

  return (
    <>
      <Drawer isOpen={drawerFiltersOpen} classes='w-[70%] ipad:w-1/3'>
        <Drawer.Title title='Filters'/>
        <Drawer.Content>
          <div className="flex flex-col mt-6 h-full overflow-x-hidden">
            <div>
              <Filters categories={categories}/>
            </div>
          </div>
        </Drawer.Content>
        <Drawer.Footer>
          <div className='pt-4'>

            <Button className='w-fit pt-4' onClick={() => clearFilters()}>clear all</Button>
          </div>

        </Drawer.Footer>
      </Drawer>
    </>
  )
}

export default FiltersDrawer;