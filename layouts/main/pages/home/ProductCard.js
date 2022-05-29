import {Link} from "../../../../core/Next";
import {useEffect, useRef} from "react";
// import HoverEffect from 'hover-effect';

const ProductCard = (props) => {

  const {
    imageSrc,
    title,
    price, salePrice,
    description, link, full, imageHover
  } = props;

  // const container = useRef();
  // useEffect(() => {
  //   // console.log(container.current);
  //
  //   new HoverEffect({
  //     parent: container.current,
  //     intensity: 0.4,
  //     image1: '/images/products/cremation-urn5.png',
  //     image2: '/images/products/coffin14.png',
  //     displacementImage:
  //            '/images/hover-effect/distortion.jpeg',
  //          // "https://cdn.rawgit.com/robin-dela/hover-effect/b6c6fd26/images/stripe1mul.png?raw=true",
  //     //     "https://raw.githubusercontent.com/robin-dela/hover-effect/master/images/fluid.jpg",
  //   });
  // }, [container]);

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

          <div className="flex flex-column justify-center items-center"
            // ref={container}
          >
            <img
              src={imageSrc} alt={title}
              className={`w-[15rem] m-auto ${full && '!w-[70%] h-[40rem]'} `}
            />
            {/*{*/}
            {/*  imageHover ?*/}
            {/*    <img alt={title} src={imageSrc} className="w-3/5"*/}
            {/*         onMouseOver={event => event.currentTarget.src = imageHover}*/}
            {/*         onMouseOut={event => event.currentTarget.src = imageSrc}*/}
            {/*    />*/}
            {/*    : <img alt={title} src={imageSrc} className="w-3/5"/>*/}
            {/*}*/}
          </div>
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
