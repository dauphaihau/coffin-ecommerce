import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'

export default function Example() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="focus:outline-none inline-flex w-full justify-center rounded-md
         px-4 py-2 text-sm font-medium text-black hover:bg-gray-400 animate
         hover:bg-opacity-30 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          <i className="fa-solid fa-ellipsis-vertical"></i>
          {/*Options*/}
          {/*<ChevronDownIcon*/}
          {/*  className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"*/}
          {/*  aria-hidden="true"*/}
          {/*/>*/}
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
        <Menu.Items className="focus:outline-none absolute z-30 right-0 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'text-gray-700 bg-light-200' : 'text-black'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {active ? (

                            <i className="fa-solid block fa-pen text-base ml-2 mr-4"/>
                    // <EditActiveIcon
                    //   className="mr-4 h-5 w-5"
                    //   aria-hidden="true"
                    // />
                  ) : (

                    <i className="fa-solid block fa-pen text-base ml-2 mr-4"/>
                    // <EditInactiveIcon
                    //   className="mr-2 h-5 w-5"
                    //   aria-hidden="true"
                    // />
                  )}
                  Edit
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'text-gray-700 bg-light-200' : 'text-black'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {active ? (
                          <i className="fa-solid fa-trash-can cursor-pointer text-base ml-2 mr-4"/>
                    // <EditActiveIcon
                    //   className="mr-4 h-5 w-5"
                    //   aria-hidden="true"
                    // />
                  ) : (
                    <i className="fa-solid fa-trash-can cursor-pointer text-base ml-2 mr-4"/>
                    // <EditInactiveIcon
                    //   className="mr-2 h-5 w-5"
                    //   aria-hidden="true"
                    // />
                  )}
                  Edit
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
