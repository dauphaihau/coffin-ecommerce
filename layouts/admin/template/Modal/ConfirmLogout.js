import CustomModal from "../../../../core/Modal/MyModal";
import {useState} from "react";
import {Text} from "../../../../core";

const ConfirmLogoutDialog = () => {

  let [isOpen, setIsOpen] = useState(true)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <CustomModal isOpen={isOpen}>
      <CustomModal.Title title='Are u sure delete this ?'/>
      <CustomModal.Content>
        <div className="mt-2">
          <Text sx='sx' classes="text-sm text-gray-500">
            Your payment has been successfully submitted. We’ve sent
            you an email with all of the details of your order.
          </Text>
        </div>
        <div className="mt-4">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100
                             px-4 py-2 text-sm font-medium
                             text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2
                              focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={closeModal}
          >
            Got it, thanks!
          </button>
        </div>
      </CustomModal.Content>
    </CustomModal>
  );
}

export default ConfirmLogoutDialog;