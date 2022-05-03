import React, {Fragment, useEffect, useState} from 'react'
import {Listbox, Transition} from '@headlessui/react'
import {CheckIcon, SelectorIcon} from '@heroicons/react/solid'

interface Props {
  options: {
    label: string,
    value: string | number,
  }[],
  label?: string,
  onChange?: (e: string) => {},
  size: string,
  borderLight?: boolean,
  hideIconOptions?: boolean,
  value: string,
  classesSpace: string,
  classesBtn: string,
}


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Select(props: Props) {
  const {
    options,
    onChange,
    value,
    label = '',
    size = '',
    hideIconOptions,
    classesSpace = '',
    classesBtn = '',
    borderLight,
  } = props

  const [selected, setSelected] = useState(options[0])

  const opt = options.find(opt => opt.value === value)
  useEffect(() => {
    if (opt) setSelected(opt)
  }, [value])

  return (
    <Listbox value={selected} onChange={(e) => {
      setSelected(e)
      onChange(e)
    }}
    >
      {({open}) => (
        <>
          <div className={`form-select-input ${classesSpace}`}>
            {label && <Listbox.Label className="form-select-input__title">{label}</Listbox.Label>}
            <Listbox.Button
              className={`form-select-input__btn
               ${classesBtn}
               ${borderLight && 'border-none shadow-none focus:ring-0 focus:border-gray-200'}
               ${size === 'medium' ? 'py-[13px]' : 'py-2'}`}>
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
                className='form-select-input__options'>
                {options.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    className={({active}) =>
                      classNames(
                        active ? 'text-gray-700 bg-light-200' : 'text-black',
                        'cursor-default select-none relative py-2 pl-3 pr-0'
                      )
                    }
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
                        {!hideIconOptions &&
                          <>
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
                        }
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