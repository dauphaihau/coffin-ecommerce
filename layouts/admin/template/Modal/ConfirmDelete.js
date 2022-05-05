import CustomModal from "../../../../core/Modal/MyModal";
import {useState} from "react";
import {Button} from "../../../../core/Button";
import {Row} from "../../../../core/Layout";
import {Text} from "../../../../core";

const ConfirmDeleteModal = () => {

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
          <Text classes="text-sm text-gray-500">
            Are you sure you want to delete this product ? <br/> By doing this, you will not be able to recover the data.
          </Text>
        </div>
        <Row classes='mt-4' justify='end'>
          <Button light onClick={closeModal}>
            Cancel
          </Button>
          <Button variant='warning'>
            Delete
          </Button>
        </Row>
      </CustomModal.Content>
    </CustomModal>
  );
}

export default ConfirmDeleteModal;