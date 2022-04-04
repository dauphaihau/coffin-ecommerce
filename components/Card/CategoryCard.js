import {Link} from "../index";

const CategoryCard = ({imageSrc, title, subtitle, link}) => {
  return (
    <div className="mb-4 laptop:mb-0 bg-light p-8 pb-0 hover:bg-light-200 rounded-lg">
      <Link href={link}>
        <div className="flex flex-column justify-center items-center h-56">
          <img src={imageSrc} alt={title} className="w-3/5"/>
        </div>
        <div className="mb-8">
          <p className="text-3xl font-semibold mb-1">{title}</p>
          <p className="text-xs text-gray-700">{subtitle}</p>
        </div>
      </Link>
    </div>
  )
}

export default CategoryCard;