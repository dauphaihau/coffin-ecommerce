import {Disclosure} from '@headlessui/react'
import {ChevronUpIcon} from '@heroicons/react/solid'
import {Text} from "./index";

interface DisclosureProps {
  data: {
    title: string,
    content: string,
  }[]
}

export default function DisclosureCustom(props: DisclosureProps) {
  const {data} = props;

  return (
    <div className="w-full px-4">
      <div className="mx-auto w-full max-w-4xl mx-auto rounded-2xl bg-white p-2">
        {
          data?.map(obj => {
            return <Disclosure key={obj.title} as='div' className='mt-2'>
              {({open}) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between rounded-lg
               bg-gray-custom-50 px-4 py-2 text-left text-sm font-medium text-gray-custom-903
                hover:bg-gray-custom-hover focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                    <Text span>{obj.title}</Text>
                    {/*<Text span>How do I know if death has occurred?</Text>*/}
                    <ChevronUpIcon
                      className={`${
                        open ? 'rotate-180 transform' : ''
                      } h-5 w-5 text-gray-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                    {obj.content}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          })
        }
      </div>
    </div>
  )
}
