import {DENOMINATION} from "../../../../utils/constant";
import {Link} from "../../../../core";
import {useEffect, useRef} from "react";
// import HoverEffect from 'hover-effect';
// import {useEffect, useRef} from "react";

// import dynamic from "next/dynamic";
// const HoverEffect = dynamic(() => import('hover-effect'), {ssr: false});


export const Product = ({link, title, imageSrc, price, imageHover}) => {
  // console.log('image-src', imageSrc)

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
  //       "https://raw.githubusercontent.com/robin-dela/hover-effect/master/images/fluid.jpg",
  //   });
  // }, [container]);

  return (
    <div className="w-100">
      <Link href={link}>
        <div className="h-[11rem] laptop:h-72 flex justify-center items-center rounded-lg bg-light hover:bg-light-200">
          <div className="flex flex-column justify-center items-center"
            // ref={container}
          >
            {
              imageHover ?
                <img alt={title} src={imageSrc} className="w-3/5"
                     onMouseOver={event => event.currentTarget.src = imageHover}
                     onMouseOut={event => event.currentTarget.src = imageSrc}
                />
                : <img alt={title} src={imageSrc} className="w-3/5"/>
            }

            {/*<img alt={title} src={imageSrc} className="w-3/5"/>*/}
            <div className='my-div'></div>
          </div>
        </div>
      </Link>
      <div>
        <p className="m-4 text-center text-sm laptop:text-base font-semibold mb-1">{title}</p>
        <p
          className="text-sm laptop:text-lg text-center text-gray-700 mb-4">{`${DENOMINATION}${price.toLocaleString()}`}</p>
      </div>
    </div>
  )
}
