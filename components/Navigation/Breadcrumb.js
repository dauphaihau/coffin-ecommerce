import {Link} from "../index";

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
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
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
                  <p className='pt-1'>/</p>
                  <div
                    className='text-gray-400 ml-1 text-sm font-medium md:ml-2'>
                    {link.name}
                  </div>
                </div>
              </li>

            )
          }
          return (
            <li key={id}>
              <div className="flex items-center">
                <p className='pt-1'>/</p>
                <Link href={link.path}
                      className='text-gray-700 ml-1 text-sm font-medium hover:text-gray-900 md:ml-2'>
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