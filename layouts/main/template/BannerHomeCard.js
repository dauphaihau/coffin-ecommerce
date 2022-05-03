import banner from "../../../public/images/banners/banner-homepage.png";

const BannerHomeCard = ({isDisplay}) => {
  return (
    <div className={`${isDisplay ? 'block' : 'hidden'}  `}>
      <div
        className='
          hidden ipad:block
              pt-48
              flex justify-center items-center
              p-6 h-56 md:p-10 2xl:p-8
              relative bg-no-repeat bg-center bg-cover
              before:absolute before:top-0 before:left-0 before:z-10
              before:w-full before:h-full
              before:bg-black before:opacity-[0.4]
              ipad:h-[50vh]
              laptop:h-[70vh]
          '
        style={{
          backgroundImage: `url(${banner.src})`,
          backgroundAttachment: 'fixed',
        }}
      >
        <p className='absolute ipad:top-[34%] laptop:top-[39%]
             left-[9%] ipad:text-[45px] laptop:text-[72px] w-[30%]
             text-white font-bold z-20 laptop:leading-[76px]'>
          Dignity and compassion guaranteed.
        </p>
      </div>
    </div>
  );
}

export default BannerHomeCard;