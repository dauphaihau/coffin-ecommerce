import {Image, Text} from "../../../../core";

const Card = ({title, content = '', imgSrc}) => {
  return (
    <div
      className="max-w-sm bg-white rounded-lg">
      <div className='mb-6'>
        <a href="layouts/main/pages/news/Card#">
          <img className="rounded-lg h-56 w-full" src={imgSrc} alt=""/>
          {/*<Image src={imgSrc} classesSize='h-[300px] max-w-[400px] h-full w-full' classes='rounded-lg h-full ' alt='card'/>*/}
        </a>
      </div>
      <div>
        <a href="layouts/main/pages/news/Card#">
          <Text h1 weight='bold' classes="mb-2 text-[18px] ipad:text-2xl font-bold  text-gray-900 dark:text-white">
            {title}
          </Text>
        </a>
        <Text classes="mb-3 font-normal text-[10px] laptop:text-lg text-gray-700 dark:text-gray-400">
          {content.length !== 100 ? <span>{content.slice(0, 100)}...</span> : <span>{content}</span>}
        </Text>
        <a href="layouts/main/pages/news/Card#" className="inline-flex items-center py-2
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
