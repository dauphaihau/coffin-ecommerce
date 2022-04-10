import {DENOMINATION} from "../../utils/constant";
import {Button, Link} from "../index";

const ProductListView = ({link, title, imageSrc, price, description}) => {

  return (
    <div className="w-full
      ipad:w-1/2 mb-8 flex
      laptop:w-full
    ">
      <Link href={link}>
        <div className="h-full w-[300px] flex justify-center items-center rounded-lg bg-light hover:bg-light-200">
          <div className="flex flex-column justify-center items-center">
            <img alt={title} src={imageSrc} className="w-3/5"/>
          </div>
        </div>
      </Link>
      <div className='text-left pl-4'>
        <Link href={link}>
          <p className="text-sm laptop:text-xl font-semibold mb-1">{title}</p>
        </Link>
        <p className="text-sm laptop:text-lg  text-gray-700 mb-4">{`${DENOMINATION}${price.toLocaleString()}`}</p>
        <p className='text-gray-600 leading-7 pb-2'>
          {description.slice(0, 400)}...
        </p>
        <Link href={link} className="inline-flex items-center
          text-sm font-medium text-center
          text-black hover:underline
          rounded-lg focus:outline-none">
          View detail
        </Link>
      </div>
    </div>
  )
}

export default ProductListView
