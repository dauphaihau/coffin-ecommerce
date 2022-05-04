import {XIcon} from "@heroicons/react/solid";
import {useUIController} from "../../context/UIControllerContext";

export function Modal(props) {

  const {isOpen, children, classes, width} = props;
  const {closeDrawerModal} = useUIController();

  return (
    <>
      <div className={`${!isOpen && 'hidden'}
          fixed z-[200] justify-center items-center
          p-4 w-full h-full 
          inset-0 
          top-[10%]
          ipad:left-[23%] ipad:top-[15%] 
          laptop:left-[36%]
          ${width ? width : 'ipad:max-w-md'}
          ipad:h-fit
          ${classes}
           `}>
        <div className="bg-white rounded-lg shadow">
          <div className="flex justify-end p-2">
            <XIcon className='btn-icon' onClick={() => closeDrawerModal()}/>
          </div>
          {children}
        </div>
      </div>
    </>
  )
}
