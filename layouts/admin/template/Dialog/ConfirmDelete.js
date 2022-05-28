import {toast} from "react-hot-toast";

import Dialog from "../../../../core/Modal/Dialog";
import {Button} from "../../../../core/Button";
import {Row} from "../../../../core/Layout";
import {Text} from "../../../../core";
import {useUIController} from "../../../../context/UIControllerContext";
import {userService} from "../../../../services/users";
import {useEffect, useState} from "react";
import {uiControllerActionsType} from "../../../../store/reducers/uiControllerReducer";

const ConfirmDeleteDialog = () => {
  const {confirmDeleteUser, dispatch, closeDrawerModal} = useUIController();
  const {progress, setProgress} = useUIController();
  // const [isSuccess, setIsSuccess] = useState(false)
  // console.log('confirm-delete', confirmDeleteUser)

  const handleDelete = async () => {
    const res = await userService.delete(confirmDeleteUser.id)
    console.log('res', res)
    if (res.isSuccess) {
      // setIsSuccess(true)
      dispatch({type: uiControllerActionsType.OPEN_CONFIRM_DELETE_USER, payload: {status: true}} )
      const res = await userService.getAll();
      // setUsers(res.data)
      closeDrawerModal();
      toast.success('Delete success!')
    } else {
      toast.error(res.message)
    }
  }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setProgress(progress + 30)
  //     // const res = await productService.getAll(params);
  //     const res = await productService.getAll();
  //     setProgress(100)
  //     setProducts(res?.data)
  //   }
  //   fetchData();
  // }, [isSuccess])

  return (
    <Dialog isOpen={confirmDeleteUser.openDialog} closeDialog={closeDrawerModal}>
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