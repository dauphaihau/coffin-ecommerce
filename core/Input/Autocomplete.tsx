import {ChangeEvent, Fragment, useEffect, useState} from 'react'
import {Combobox, Transition} from '@headlessui/react'
import {CheckIcon, SelectorIcon} from '@heroicons/react/solid'
import {uniqElement} from "../../utils/helpers";


interface AutocompleteProps {
  className: string,
  placeholder: string,
  defaultValue: string,
  value: string | any,
  label: string,
  onChange: (event: { name: string; id: string }[]) => void;
  options: Array<{
    name: string,
    id: string
  }>
}

type Result = {
  name: string,
  id: string
}[]


export default function CustomAutocomplete({label, onChange, options, value}: AutocompleteProps ) {
  const [selected, setSelected] = useState(options[0])
  const [query, setQuery] = useState('')
  const [arrResult, setArrResult] = useState<Result | null>([options[0]])

  useEffect(() => {
    if (value?.length > 0) {
      setArrResult(value)
    }
  }, [value])

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) =>
        option.name
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, ''))
      )


  const handleAutoComplete = (...e) => {
    let tempArr = [...arrResult, ...e];
    tempArr = uniqElement(tempArr)
    setArrResult(tempArr);
    // @ts-ignore
    onChange(tempArr);
  }

  return (
    <div>
      <Combobox value={selected} onChange={(e) => {
        setSelected(e);
        handleAutoComplete(e);
      }}>
        <div className="relative">
          <Combobox.Label>{label}</Combobox.Label>
          <div
            className="relative w-full text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2
            focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-teal-300
            focus-visible:ring-offset-2 sm:text-sm overflow-hidden">
            <Combobox.Input
              className="w-full border-none border-gray-300 focus:ring-0 py-[13px] pl-3 pr-10 text-sm text-gray-900"
              // displayValue={(option) => option.name}
              placeholder='Search ...'
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options
              className="absolute z-[9999] w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredOptions.length === 0 && query !== '' ? (
                <div className="cursor-default select-none relative py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <Combobox.Option
                    key={option.id}
                    className={({active}) =>
                      `cursor-default select-none relative py-2 pl-10 pr-4 ${
                        active ? 'text-gray-700 bg-light-200' : 'text-black'
                      }`
                    }
                    value={option}
                  >
                    {({selected, active}) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {option.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-black' : 'text-black'
                            }`}
                          >
                            <CheckIcon className="w-5 h-5" aria-hidden="true"/>
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
      {arrResult.length > 0 ? (
        <div className='mt-3 border rounded-lg p-2 flex flex-wrap gap-2'>
          {
            arrResult?.map((tag, id) => (
              <div className='py-1 px-2 bg-[#edeff1] rounded-2xl w-fit' key={id}>
                {tag.name}
                <i
                  className="fa-solid fa-circle-xmark text-base text-[#b9bcc0] animate
                                              hover:text-gray-500 cursor-pointer !opacity-1 ml-2 "
                  onClick={() => {
                    const filtered = arrResult.filter(e => e.id !== tag.id);
                    setArrResult(filtered);
                    onChange(filtered)
                  }}
                />
              </div>
            ))
          }
        </div>
      ) : null
      }
    </div>
  )
}
