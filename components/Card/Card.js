const Card = ({title, content = '', imgSrc}) => {
  return (
    <div
      className="max-w-sm bg-white rounded-lg dark:bg-gray-800
      dark:border-gray-700">
      <div className='mb-6'>
        <a href="#">
          <img className="rounded-lg h-56 w-full" src={imgSrc} alt=""/>
        </a>
      </div>
      <div>
        <a href="#">
          <h5 className="mb-2 text-[18px] ipad:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-[15px] laptop:text-lg text-gray-700 dark:text-gray-400">
          {content.length !== 100 ? <span>{content.slice(0, 100)}...</span> : <span>{content}</span>}
        </p>
        <a href="#" className="inline-flex items-center py-2
          text-sm font-medium text-center
          text-black hover:underline
          rounded-lg focus:outline-none">
          Read more
        </a>
      </div>
    </div>
  );
}

export default Card;