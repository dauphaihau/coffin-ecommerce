import {Dialog} from '@headlessui/react'
import {Transition} from '@headlessui/react'
import {Fragment, ReactNode} from 'react'
import {Row} from "../Layout";

interface Props {
  isOpen: boolean,
  children: ReactNode,
  width?: number,
  noPadding?: boolean,
  nonDarkMode?: boolean,
  preventClose?: boolean,
  closeDialog?: () => {}
}

export default function CustomDialog(props: Props) {
  const {
    children,
    isOpen = true,
    noPadding, width, nonDarkMode,
    closeDialog = () => {},
    preventClose,
  } = props;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div" className="relative z-30"
        onClose={preventClose ? () => {
        } : closeDialog}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25"/>
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <Row
            align='center' justify='center'
            classes="min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                style={{width: width ?? '100%'}}
                className={`dialog-content
                  ${noPadding ? 'p-0' : 'p-8'}
                  ${nonDarkMode && 'dialog-content--nonDarkMode'}
                  `}>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </Row>
        </div>
      </Dialog>
    </Transition>
  )
}

const Title = ({title}) => {
  return (
    <Dialog.Title as="h3" className='dialog-title'>
      {title}
    </Dialog.Title>
  )
}

const Content = ({children}) => <>{children}</>;

CustomDialog.Title = Title;
CustomDialog.Content = Content;
