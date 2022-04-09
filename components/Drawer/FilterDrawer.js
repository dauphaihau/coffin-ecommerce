import {useState, useEffect} from 'react'
import {useUtil} from "../../context/utilContext";
import Filters from "../Filters";
import Drawer from "./Drawer";

const FiltersDrawer = () => {

  const [renderClientSideComponent, setRenderClientSideComponent] = useState(false)
  const {drawerFiltersToggle, drawerFiltersOpen, categories} = useUtil();

  useEffect(() => {
    setRenderClientSideComponent(true)
  }, [])

  if (!renderClientSideComponent) return null

  return (
    <>
      <Drawer isOpen={drawerFiltersOpen} classes='w-[70%] ipad:w-1/3'>
        <Drawer.Title title='Filters'/>
        <Drawer.Content>
          <div className='mt-6'>
            <Filters categories={categories}/>
          </div>
        </Drawer.Content>
      </Drawer>
    </>
  )
}

export default FiltersDrawer;