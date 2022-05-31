import {Menu, Transition} from '@headlessui/react'
import React, {forwardRef, Fragment, useEffect, useRef} from 'react'
import {Link} from "../Next";

interface MenuDropdownProps {
  options: {
    label: string,
    value: string | number,
    href: string,
    feature: () => {},
    element: React.ReactNode
  }[],
}

const MenuDropdownCustom = forwardRef((props: MenuDropdownProps, ref) => {

  const someInternalRef = useRef('someValue').current;

  useEffect(() => {
    if (!ref) return;
    typeof ref === 'function' ? ref(someInternalRef) : (ref.current = someInternalRef);
    return () => typeof ref === 'function' ? ref(null) : (ref.current = null);
  }, [someInternalRef, ref])

  const {options} = props;

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="focus:outline-none inline-flex w-full justify-center rounded-md
         px-4 py-2 text-sm font-medium text-black hover:bg-gray-400 animate
         hover:bg-opacity-30 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="focus:outline-none absolute z-30 right-0 mt-2 w-36 origin-top-right divide-y
          divide-gray-100 rounded-md bg-white dark:bg-gray-custom-900 shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="px-1 py-1 ">
            {options.map((item, idx) => (
              <Menu.Item key={idx}>
                {({active}) => (
                  <Link href={item.href ?? ''}>
                    <button
                      onClick={item.feature ? () => item.feature() : () => {
                      }}
                      className={`${
                        active ? 'text-gray-700 bg-light-200' : 'text-black'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <div className='text-base ml-2 mr-4'>
                        {item.element}
                      </div>
                      {item.label}
                    </button>
                  </Link>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
})
export default MenuDropdownCustom