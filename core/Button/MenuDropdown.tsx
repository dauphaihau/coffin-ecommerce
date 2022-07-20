import {Menu, Transition} from '@headlessui/react'
import React, {forwardRef, Fragment, useEffect, useRef} from 'react'
import {Link} from '../Next';

interface MenuDropdownProps {
  options: {
    label: string,
    value?: string | number,
    href?: string,
    feature?: () => void,
    element?: React.ReactNode,
  }[],
  trigger?: React.ReactNode
}

const MenuDropdownCustom = forwardRef((props: MenuDropdownProps, ref) => {
  const {options, trigger} = props;
  const someInternalRef = useRef('someValue').current;

  useEffect(() => {
    if (!ref) return;
    typeof ref === 'function' ? ref(someInternalRef) : (ref.current = someInternalRef);
    return () => typeof ref === 'function' ? ref(null) : (ref.current = null);
  }, [someInternalRef, ref])

  return (
    <Menu as='div' className='menu'>
      <div>
        {
          trigger
            ? <Menu.Button className='menu-dropdown'>{trigger}</Menu.Button>
            : <Menu.Button className='menu-dropdown--dotIcon'><i className='fa-solid fa-ellipsis-vertical'/></Menu.Button>
        }
      </div>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='menu-items'>
          <div className='p-1'>
            {options.map((item, idx) => (
              <Menu.Item key={idx}>
                {({active}) => (
                  <Link href={item.href ?? ''}>
                    <button
                      onClick={item.feature ? () => item.feature() : () => {
                      }}
                      className={`menu-items__item group
                      ${active ? 'text-gray-700 bg-light-200' : 'text-black'}
                       `}
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