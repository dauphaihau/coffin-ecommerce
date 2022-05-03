import {Link} from "../index";
import Text from "../Text";

const CategoryCard = ({imageSrc, title, subtitle, link}) => {
  return (
    <div className="mb-4 laptop:mb-0 bg-light p-8 pb-0 hover:bg-light-200 rounded-lg">
      <Link href={link}>
        <div className="flex flex-column justify-center items-center h-56">
          <img src={imageSrc} alt={title} className="w-3/5"/>
        </div>
        <div className="mb-8">
          <Text sx='xl' weight='semibold' classes='mb-1'>{title}</Text>
          <Text sx='xs' color='gray-700'>{subtitle}</Text>
        </div>
      </Link>
    </div>
  )
}

export default CategoryCard;