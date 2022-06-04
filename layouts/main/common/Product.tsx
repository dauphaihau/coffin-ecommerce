import {useEffect, useRef} from "react";
// import HoverEffect from 'hover-effect';
// import {useEffect, useRef} from "react";

import dynamic from "next/dynamic";
import { Link } from "../../../core/Next";
import {DENOMINATION} from "../../../utils/enums";
const HoverEffect = dynamic(() => import('hover-effect'), {ssr: false});

interface ProductProps {
  link: string,
  title: string,
  imageSrc: string,
  imageHover?: string,
  price: number,
}

// export const Product = ({link, title, imageSrc, price, imageHover}) => {
//   // console.log('image-src', imageSrc)

const Product = (props: ProductProps) => {
  const {link, title, imageSrc, price, imageHover} = props;

  const container = useRef();
  useEffect(() => {
    // console.log(container.current);

    // new HoverEffect({
    //   parent: container.current,
    //   intensity: 0.4,
    //   image1: '/images/products/cremation-urn5.png',
    //   image2: '/images/products/coffin14.png',
    //   displacementImage:
    //     '/images/hover-effect/distortion.jpeg',
    //   // "https://cdn.rawgit.com/robin-dela/hover-effect/b6c6fd26/images/stripe1mul.png?raw=true",
    //   //     "https://raw.githubusercontent.com/robin-dela/hover-effect/master/images/fluid.jpg",
    // });
  }, [container]);

  return (
    <div className="w-100">
      <Link href={link}>
        <div className="h-[11rem] laptop:h-72 flex justify-center items-center rounded-lg bg-light hover:bg-light-200">
          <div className="flex flex-column justify-center items-center"
            // ref={container}
          >
            {
              imageHover ?
                <img
                  ref={container}
                  alt={title} src={imageSrc} className="w-3/5"
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
export default Product