import {ChangeEvent, useState} from 'react'
import {RadioGroup} from '@headlessui/react'

interface PropsRadioGroup {
  options: [{
    name: string,
    description: string,
  }]
  sx?: string,
  md?: string,
  lg?: string,
  xl?: string,
  directionClasses?: string,
  direction?: string,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function RadioGroupCustom(props: PropsRadioGroup) {
  const {options, direction, onChange, directionClasses,
     sx = '', md = '', lg = '', xl = '',
  } = props;
  const [selected, setSelected] = useState(options[0])

  return (
    <div className="w-full ">
      {/*<div className="w-full py-16">*/}
      <div className="w-full">
        {/*<div className="w-full max-w-md mx-auto">*/}
        <RadioGroup value={selected} onChange={(e: any) => {
          onChange(e)
          setSelected(e)
        }
        }>
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          {/*${sx ? `grid-cols-${sx}` : ''}*/}
          <div className={`
          ${direction === 'row' ? 'flex gap-4' : direction === 'column' ? 'flex flex-col' : 'space-y-2'} 
          ${md === 'row' ? 'flex gap-4' : md === 'column' ? 'flex flex-col' : 'space-y-2'}
          ${lg === 'row' ? 'flex gap-4' : lg === 'column' ? 'flex flex-col' : 'space-y-2'}
          ${xl === 'row' ? 'flex gap-4' : xl === 'column' ? 'flex flex-col' : 'space-y-2'}
          ${directionClasses}
          `}>
            {options.map((option) => (
              <RadioGroup.Option
                key={option.name}
                value={option}
                className={({active, checked}) =>
                  `${
                    active
                      ? 'shadow-2xl'
                      // ? 'ring-2 ring-offset-2 ring-offset-gray-300 ring-white ring-opacity-60'
                      : ''
                  }
                  ${
                    checked ? 'bg-white bg-opacity-75 text-black !drop-shadow-lg border' : 'bg-white border'
                    // checked ? 'bg-black bg-opacity-75 text-white' : 'bg-white'
                  }
                    relative rounded-lg shadow-md w-full px-5 py-4 cursor-pointer flex focus:outline-none`
                }
              >
                {({active, checked}) => (
                  <>
                    <div className="flex items-center justify-between w-full ">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? 'text-black' : 'text-gray-900'
                              // checked ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {option.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              // checked ? 'text-gray-100' : 'text-gray-500'
                              checked ? 'text-black' : 'text-gray-500'
                            }`}
                          >
                            <span>{option.description}</span>
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked ? (
                        // <div className="flex-shrink-0 text-black">
                        <div className="flex-shrink-0 text-white">
                          <CheckIcon className="w-6 h-6 bg-black rounded-full"/>
                        </div>
                      ) : (
                        <div className="flex-shrink-0 text-white">
                          <CheckIcon className="w-6 h-6 bg-white border-2 border-gray-300 rounded-full"/>
                        </div>
                      )
                      }
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2"/>
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
