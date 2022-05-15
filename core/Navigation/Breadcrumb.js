import {Text} from "../index";
import {Link} from "../Next";

const Breadcrumb = ({links}) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {links.map((link, id) => {
          if (link.firstLink) {
            return (
              <li className="inline-flex items-center" key={id}>
                <Link
                  href={link.path}
                  className="dark:text-white inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  {link.name}
                </Link>
              </li>
            )
          }
          if (link.lastLink) {
            return (
              <li key={id}>
                <div className="flex items-center">
                  <Text classes='pt-1'>/</Text>
                  <div
                    className='dark:text-gray-custom-501 text-gray-400 ml-1 text-sm font-medium md:ml-2'>
                    {link.name}
                  </div>
                </div>
              </li>

            )
          }
          return (
            <li key={id}>
              <div className="flex items-center">
                <Text classes='pt-1'>/</Text>
                <Link href={link.path} className='dark:text-gray-custom-52 text-gray-700 ml-1 text-sm font-medium hover:text-gray-900 md:ml-2'>
                  {link.name}
                </Link>
              </div>
            </li>
          )
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;