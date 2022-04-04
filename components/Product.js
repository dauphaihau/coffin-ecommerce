import {DENOMINATION} from "../utils/settings";
import {Link} from "./index";

const Product = ({link, title, imageSrc, price}) => {

  return (
    <div className="w-100 p1 p-2
      ipad:w-1/2
      laptop:w-1/4
    ">
      <Link href={link}>
        <div className="h-72 flex justify-center items-center rounded-lg bg-light hover:bg-light-200">
          <div className="flex flex-column justify-center items-center">
            <img alt={title} src={imageSrc} className="w-3/5"/>
            <div className='my-div'>
            </div>
          </div>
        </div>
      </Link>
      <div>
        <p className="m-4 text-center text-l font-semibold mb-1">{title}</p>
        <p className="text-center text-gray-700 mb-4">{`${DENOMINATION}${price}`}</p>
      </div>
    </div>

  )
}

export default Product
