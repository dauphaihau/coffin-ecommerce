import {slugify} from "../../utils/helpers";
import {useRouter} from "next/router";
import {Button} from "../Button";

const HomeBannerCard = ({data = '', link}) => {
  const router = useRouter()
  return (
    <div className="w-full">
      <div className="bg-light-200 p-6 pb-10 pb-16 laptop:pb-6 flex laptop:flex-row flex-col rounded-lg">
        <div className="pt-4 pl-2 pt-12 ipad:pl-12 flex flex-col">
          <div className="border-l border-gray-900 px-3 pt-1 mb-10">
            <p className="text-xs tracking-wider m-0 leading-tight">COFFIN</p>
            <p className="text-xs tracking-wider m-0 leading-tight">2022</p>
          </div>
          <div>
            <p className="text-xl ipad:text-3xl laptop:text-4xl font-bold tracking-widest leading-none">
              {data.name}
            </p>
            <p className="py-6 tracking-wide">FROM <span>${data.price}</span></p>
            <Button css='w-auto' onClick={() => router.push(`/product/${slugify(link.name)}`)}>Shop Now</Button>

          </div>
          <div className="flex flex-1 flex-col justify-end pb-10 mt-4">
            <p className="font-light text-xs tracking-tight m-0 leading-tight mb-2">Design by</p>
            <p className="text-xxs font-semibold tracking-tight m-0 leading-tight">Hau</p>
          </div>
        </div>
        <div className="flex flex-1 justify-center items-center relative">
          <div className="z-10">
            <img src={data.image} className="w-[23rem]" alt="Showcase item"/>
          </div>
          <div className="absolute
              w-48 h-48 ipad:h-60 ipad:h-60 laptop:w-64 laptop:w-64
              bg-white z-0 rounded-full"/>
        </div>
      </div>
    </div>
  );
}

export default HomeBannerCard;
