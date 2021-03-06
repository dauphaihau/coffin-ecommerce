import React, {ChangeEvent, Fragment, useEffect, useState} from 'react'
import {Listbox, Transition} from '@headlessui/react'
import {CheckIcon, SelectorIcon} from '@heroicons/react/solid'
import {classNames} from "../../utils/helpers";

type OptionValue = number | string;

type Option<Type extends OptionValue> = {
  value: Type;
  label: string;
};

interface SelectProps<Type extends OptionValue> {
  options: Option<Type>[];
  label?: string,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  size?: string,
  borderLight?: boolean,
  hideIconOptions?: boolean,
  value?: string,
  classesSpace?: string,
  classesBtn?: string,
}

function Select<Type extends OptionValue>(props: SelectProps<Type>) {
  const {
    options = [{label: '', value: ''}],
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
    <Listbox value={selected} onChange={(e: any) => {
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
               ${size === 'medium' ? 'py-[10px]' : 'py-2'}`}>
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
                        active ? 'text-gray-700 bg-light-200 dark:hover:bg-gray-custom-502 dark:text-white' : 'text-black dark:text-white',
                        'cursor-default select-none relative py-2 rounded-lg pl-3 pr-0'
                      )
                        // 'cursor-default select-none relative py-2 pl-3 pr-0'
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
                                  active ? 'text-black dark:text-white' : 'text-black dark:text-white',
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

export default Select