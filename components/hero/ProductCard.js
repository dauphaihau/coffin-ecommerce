import Link from 'next/link'

const ProductCard = ({imageSrc, title, subtitle, link}) => {
  return (
    <div className="mb-4 lg:mb-0 bg-light p-8 hover:bg-light-200 rounded-lg h-full">
      <Link href={`${link}`}>
        <a aria-label={title}>
          <div className="h-full">
            <img src={imageSrc} alt={title} className=""/>
            <div className='flex justify-between mt-6'>
              <div>
                <p className="text-3xl font-semibold mb-1">Name</p>
                <p className="text-gray-600 leading-7 pb-6">acbaca
                  {/*{description}*/}
                </p>

                {/*<p className="text-3xl font-semibold mb-1">{title}</p>*/}
                <p className="text-xs text-gray-700">{subtitle}</p>

              </div>
              <div>
                <h2 className="text-4xl font-bold tracking-wide">
                  50
                  {/*${price}*/}
                  {/*{salePrice && <span*/}
                  {/*  className="absolute ml-[10px] line-through text-gray-400 text-sm md:text-base lg:text-sm xl:text-xl ps-2">*/}
                  {/*  ${salePrice}</span>}*/}
                </h2>
                <p
                  className="absolute ml-[10px] line-through text-gray-400 text-sm md:text-base lg:text-sm xl:text-xl ps-2">
                  45</p>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  )
}

export default ProductCard;
