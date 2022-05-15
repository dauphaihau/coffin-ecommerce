import {toast} from "react-hot-toast";

import Dialog from "../../../../core/Modal/Dialog";
import {Button} from "../../../../core/Button";
import {Row} from "../../../../core/Layout";
import {Text} from "../../../../core";
import {useUIController} from "../../../../context/UIControllerContext";
import {userService} from "../../../../services/users";

const ConfirmDeleteDialog = () => {
  const {confirmDelete, dispatch, closeDrawerModal} = useUIController();
  // console.log('confirm-delete', confirmDelete)

  const handleDelete = async () => {
    const res = await userService.delete(confirmDelete.id)
    if (res.isSuccess) {
      dispatch({type: 'OPEN_CONFIRM_DELETE', payload: {status: true}} )
      const res = await userService.getAll();
      // setUsers(res.data)
      closeDrawerModal();
      toast.success('Delete success!')
    } else {
      toast.error(res.message)
    }
  }

  return (
    <Dialog isOpen={confirmDelete.openDialog} closeDialog={closeDrawerModal}>
      <Dialog.Title title='Confirm delete'/>
      <Dialog.Content>
        <Text classes="text-sm text-gray-500 mt-2">
          Are you sure you want to delete ? <br/> By doing this, you will not be able to recover the data.
        </Text>
        <Row classes='mt-4' justify='end'>
          <Button light onClick={closeDrawerModal}>
            Cancel
          </Button>
          <Button variant='warning' shadow onClick={() => handleDelete()}>
            Delete
          </Button>
        </Row>
      </Dialog.Content>
    </Dialog>
  );
}

export default ConfirmDeleteDialog;