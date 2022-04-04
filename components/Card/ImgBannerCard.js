const ImgBannerCard = ({srcImg, title}) => (
  <div
    className='
        flex justify-center items-center
        p-6 h-56 md:p-10 2xl:p-8
        relative bg-no-repeat bg-center bg-cover rounded-lg
        before:absolute before:top-0 before:left-0 before:z-10
        before:w-full before:h-full
        before:bg-black before:opacity-[0.4]
        before:rounded-2xl
    '
    style={{
      backgroundImage: `url(${srcImg.src})`,
      width: '100%',
      height: '300px',
    }}
  >
     <span className='text-4xl text-white font-bold space-x-1 z-20'>
        {title}
     </span>
  </div>
);


export default ImgBannerCard;