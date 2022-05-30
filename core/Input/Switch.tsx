import {ChangeEvent, useEffect, useState} from 'react'
import {Switch} from '@headlessui/react'

interface SwitchProps {
  label?: string,
  value?: boolean,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function CustomSwitch({label, onChange, value}: SwitchProps) {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    setEnabled(value)
  }, [value])

  return (
    <div className="pb-4">
      <div className="flex items-center">
        <Switch
          checked={enabled}
          onChange={(e: any) => {
            setEnabled(e)
            onChange(e)
          }}
          className={`${enabled ? 'bg-gray-500' : 'bg-[#939eaa]'}
          relative inline-flex flex-shrink-0 h-[17px] w-[45px] border-2 border-transparent
           rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none
            focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={`${enabled ? 'translate-x-7 translate-y-[-6px] bg-black' : 'bg-white translate-x-[-4px] translate-y-[-6px]'}
            pointer-events-none inline-block h-[25px] w-[25px] rounded-full  shadow-lg 
            transform ring-0 transition ease-in-out duration-200`}
          />
        </Switch>
        <label className="ml-4">{label}</label>
      </div>
    </div>
  )
}
