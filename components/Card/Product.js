import {DENOMINATION} from "../../utils/constant";
import {Link} from "../index";

const Product = ({link, title, imageSrc, price}) => {

  return (
    <div className="w-100">
      <Link href={link}>
        <div className="h-[11rem] laptop:h-72 flex justify-center items-center rounded-lg bg-light hover:bg-light-200">
          <div className="flex flex-column justify-center items-center">
            <img alt={title} src={imageSrc} className="w-3/5"/>
            <div className='my-div'>
            </div>
          </div>
        </div>
      </Link>
      <div>
        <p className="m-4 text-center text-sm laptop:text-base font-semibold mb-1">{title}</p>
        <p className="text-sm laptop:text-lg text-center text-gray-700 mb-4">{`${DENOMINATION}${price.toLocaleString()}`}</p>
      </div>
    </div>
  )
}

export default Product
