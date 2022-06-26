import Dialog from "../../../../core/Dialog/Dialog";
import {Button} from "../../../../core/Button";
import {Row} from "../../../../core/Layout";
import {Text} from "../../../../core";

const ConfirmDeleteDialog = (props) => {
  const {handleRequest, defaultStatus, setShowDialog} = props;
  return (
    <Dialog isOpen={defaultStatus}>
      <Dialog.Title title='Confirm delete'/>
      <Dialog.Content>
        <Text classes="text-sm text-gray-500 mt-2">
          Are you sure you want to delete ? <br/> By doing this, you will not be able to recover the data.
        </Text>
        <Row classes='mt-4' justify='end'>
          <Button light onClick={() => setShowDialog(false)}>
            Cancel
          </Button>
          <Button variant='warning' shadow onClick={() => handleRequest()}>
            Delete
          </Button>
        </Row>
      </Dialog.Content>
    </Dialog>
  );
}

export default ConfirmDeleteDialog;