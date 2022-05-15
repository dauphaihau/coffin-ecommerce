import Cookie from "cookie-cutter";

import Dialog from "../../../../core/Modal/Dialog";
import {Text} from "../../../../core";
import {Row} from "../../../../core/Layout";
import {Button} from "../../../../core/Button";
import {useUIController} from "../../../../context/UIControllerContext";

const ConfirmLogoutDialog = () => {
  const {openConfirmLogout, closeDrawerModal} = useUIController();

  const handleLogout = () => {
    Cookie.set("userInfo", "", {
      path: "/",
      expires: new Date(0),
    });
    window.location.href = '/'
  }

return (
  <Dialog isOpen={openConfirmLogout} closeDialog={closeDrawerModal}>
      <Dialog.Title title='Close this app?'/>
      <Dialog.Content>
        <div className="mt-2">
          <Text sx='sx' classes="text-sm text-gray-500">
            Are you sure you want to Logout ?
          </Text>
        </div>
        <Row classes='mt-4' justify='end'>
          <Button light onClick={closeDrawerModal}>
            Cancel
          </Button>
          <Button variant='warning' shadow onClick={() => handleLogout()}>
            Logout
          </Button>
        </Row>
      </Dialog.Content>
    </Dialog>
  );
}

export default ConfirmLogoutDialog;