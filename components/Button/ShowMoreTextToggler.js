import {useMemo, useState} from "react";

const ShowMoreTextToggler = ({text = ''}) => {
  const [showMore, setShowMore] = useState(false);
  const truncateText = useMemo(() => {
    return text.slice(0, 400).concat('...');
  }, [text]);
  return <p>{showMore ? text : truncateText}
    <span className='cursor-pointer font-bold' onClick={() => setShowMore(!showMore)}> {showMore ? 'less' : 'more'}</span></p>
}

export default ShowMoreTextToggler