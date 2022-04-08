import {useMemo, useState} from "react";

const ShowMoreTextToggler = ({text = '', classes = '', limit}) => {
  const [showMore, setShowMore] = useState(false);
  const truncateText = useMemo(() => {
    return text.slice(0, limit).concat('...');
  }, [text]);
  return <p className={`text-gray-600 leading-7 pb-6 ${classes}`}>{showMore ? text : truncateText}
    <span className='cursor-pointer font-bold'
          onClick={() => setShowMore(!showMore)}> {showMore ? 'See less' : 'See more'}</span></p>
}

export default ShowMoreTextToggler