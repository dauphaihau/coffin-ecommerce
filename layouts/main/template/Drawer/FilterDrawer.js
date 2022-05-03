import {useState, useEffect} from 'react'
import {useUIController} from "../../../../context/UIControllerContext";
import Filters from "../../pages/products/Filters";
import Drawer from "../../../../core/Navigation/Drawer";
import {useFilterContext} from "../../../../context/filterContext";
import {Button} from "../../../../core/Button";

const FiltersDrawer = () => {

  const [renderClientSideComponent, setRenderClientSideComponent] = useState(false)
  const {openFiltersDrawer, categories} = useUIController();

  const {clearFilters} = useFilterContext()

  useEffect(() => {
    setRenderClientSideComponent(true)
  }, [])

  if (!renderClientSideComponent) return null

  return (
    <>
      <Drawer isOpen={openFiltersDrawer} classes='w-[70%] ipad:w-1/3'>
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
            <Button classes='w-fit pt-4' onClick={() => clearFilters()}>clear all</Button>
          </div>
        </Drawer.Footer>
      </Drawer>
    </>
  )
}

export default FiltersDrawer;