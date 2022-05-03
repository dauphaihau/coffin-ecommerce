import {Link} from "../../../../core";

const ProductCard = (props) => {

  const {
    imageSrc,
    title,
    price, salePrice,
    description, link, full
  } = props;

  return (
    <div className="lg:mb-0 bg-gray-custom-50 p-4 laptop:p-6 hover:bg-light-200 rounded-lg h-full">
      <Link href={link}>
        {
          salePrice
            ? <span className="
                  bg-black text-white text-sm font-medium mr-2
                  px-2.5 py-1 rounded
                ">
                  {(((price - salePrice) / price) * 100).toFixed()}%
                </span>
            : <div className='h-5'/>
        }
        <div>
          <img
            src={imageSrc} alt={title}
            className={`w-[15rem] m-auto ${full && '!w-[70%] h-[40rem]'} `}
          />
          <div className='flex justify-between mt-0 laptop:mt-6'>
            <div>
              <p className="text-xl font-semibold">{title.slice(0, 23)}</p>
              <p className="text-gray-600">
                {description?.length > 25 ?
                  <span>{description.slice(0, 25)}...</span> : <span>{description}</span>
                }
              </p>
            </div>
            <div className='text-right'>
              {salePrice ?
                <>
                  <p className="ml-[10px] line-through text-gray-700 text-sm
                          ipad:text-base laptop:text-base ps-2"
                  >
                    ${price}
                  </p>
                  <h2 className="text-xl font-bold tracking-wide">
                    ${salePrice}
                  </h2>
                </>
                :
                <h2 className="text-xl pt-[26px] font-bold tracking-wide">
                  ${price}
                </h2>
              }
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard;
