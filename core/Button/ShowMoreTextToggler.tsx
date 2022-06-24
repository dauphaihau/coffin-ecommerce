import {useMemo, useState} from "react";
import Text from "../../core/Text";

interface ShowMoreTextTogglerProps {
  text: string,
  classes: string,
  limit: number,
}

const ShowMoreTextToggler = (props: ShowMoreTextTogglerProps) => {
  const {text = '', classes = '', limit} = props;
  const [showMore, setShowMore] = useState(false);

  const truncateText = useMemo(() => {
    return text.slice(0, limit).concat('...');
  }, [text]);

  return (
    <p className={`text-gray-600 leading-7 pb-6 ${classes}`}>
      {showMore ? text : truncateText}
      <Text span
        classes='cursor-pointer font-bold'
        onClick={() => setShowMore(!showMore)}>
        {showMore ? 'See less' : 'See more'}
      </Text>
    </p>
  )
}

export default ShowMoreTextToggler