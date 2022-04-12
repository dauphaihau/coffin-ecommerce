import {Fragment, useEffect, useState} from 'react'
import {Listbox, Transition} from '@headlessui/react'
import {CheckIcon, SelectorIcon} from '@heroicons/react/solid'
import PropTypes from "prop-types";

const propTypes = {
  options: PropTypes.array.isRequired,
  title: PropTypes.string,
  onChange: PropTypes.func,
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function SelectFormEdit(props) {
  const {options, title = '', onChange, size = '', value} = props
  const [selected, setSelected] = useState(options[0])

  const opt = options.find(opt => opt.value === value)
  useEffect(() => {
    if (opt) {
      setSelected(opt)
    }
  }, [value])

  return (
    <Listbox value={selected} onChange={(e) => {
      setSelected(e)
      onChange(e)
    }}>
      {({open}) => (
        <>
          {title !== '' &&
            <Listbox.Label className="block text-base font-medium text-gray-700">
              {title}</Listbox.Label>
          }
          <div className="relative">
            <Listbox.Button
              className={`relative w-full bg-white border border-gray-300 rounded-md shadow-sm
               pl-3 pr-16 ipad:pr-12 laptop:pr-[4.5rem] py-2 text-left cursor-default focus:outline-none focus:ring-1
                focus:ring-black focus:border-black text-sm ${size === 'medium' && '!py-4'}`}>
              <span className="flex items-center">
                <span className="block truncate">{selected.label}</span>
              </span>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
              </span>
            </Listbox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none text-sm">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    className={({active}) =>
                      classNames(
                        active ? 'text-gray-700 bg-light-200' : 'text-black',
                        'cursor-default select-none relative py-2 pl-3 pr-9'
                      )
                    }
                    // value={value}
                    value={option}
                  >
                    {({selected, active}) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', ' block truncate')}
                          >
                            {option.label}
                          </span>
                        </div>
                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-black' : 'text-black',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}

SelectFormEdit.propTypes = propTypes;
