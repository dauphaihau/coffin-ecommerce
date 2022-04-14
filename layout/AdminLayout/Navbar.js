import {useEffect, useRef, useState} from "react";
import {Link} from "../../components";
import Cookie from "cookie-cutter";
import {useAuth} from "../../context/authContext";

function useOuterClick(callback) {
  const innerRef = useRef();
  const callbackRef = useRef();

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);

    function handleClick(e) {
      if (
        innerRef.current &&
        callbackRef.current &&
        !innerRef.current.contains(e.target)
      ) {
        callbackRef.current(e);
      }
    }
  }, []);

  return innerRef;
}

const Navbar = () => {

  const [dropdown, setDropdown] = useState(false)
  const {setIsAuthorize, user} = useAuth();
  const innerRef = useOuterClick(() => {
    setDropdown(false)
  });

  const navigation = [
    {name: 'Profile', href: '/profile'},
    {name: 'Settings', href: '/'},
    {
      name: 'Logout', href: '/account/login',
      logout: () => {
        Cookie.set("userInfo", "", {
          path: "/",
          expires: new Date(0),
        });
        setIsAuthorize(false);
      }
    },
  ]

  return (
    <nav className="border-gray-200 bg-transparent dark:border-gray-700 py-4">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <div className="flex ">
          {/*<MenuIcon className='btn-icon w-10 h-10 mr-4 text-gray-600' onClick={() => {}}/>*/}
          <div className="hidden relative mr-3 md:mr-0 md:block">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20"
                   xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"/>
              </svg>

            </div>
            <input type="text" id="email-adress-icon"
                   className="block p-2 pl-10 w-full text-gray-900 rounded-lg border border-gray-300 sm:text-sm focus:ring-black focus:border-black dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black dark:focus:border-black"
                   placeholder="Search..."/>
          </div>
        </div>
        <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
          <div className='navbar-admin'>
            <div className="navbar-admin__notification">
              <i className="fa-solid fa-message"/>
              <i className="fa-solid fa-bell"/>
            </div>
            <div className='navbar-admin__info' ref={innerRef} onClick={() => setDropdown(!dropdown)}>
              <img
                className="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="profile"
              />
              {/*<p>{user?.name}</p>*/}
            </div>
            {/*Dropdown profile*/}
            <div className={`navbar-admin__profile ${dropdown ? 'block' : 'hidden'} `}>
              <div>
                {navigation.map(item => {
                    if (item.logout) {
                      return <Link
                        onClick={() => item.logout()}
                        href={item.href} key={item.name}>
                        {item.name}
                      </Link>
                    }
                    return (
                      <Link href={item.href} key={item.name}>
                        {item.name}
                      </Link>
                    )
                  }
                )}
              </div>
            </div>
            {/*end Dropdown profile*/}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
