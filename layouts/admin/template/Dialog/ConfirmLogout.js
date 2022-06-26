import Dialog from "../../../../core/Dialog/Dialog";
import {Text} from "../../../../core";
import {Row} from "../../../../core/Layout";
import {Button} from "../../../../core/Button";
import {destroyCookie} from "nookies";
import {hashMD5} from "../../../../utils/helpers";
import config from "../../../../config.json";
import {useRouter} from "next/router";
import {useAuth} from "../../../../context/authContext";

const ConfirmLogoutDialog = (props) => {
  const {defaultStatus, setShowDialog} = props;
  const {setIsAuthorize} = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    destroyCookie(null, hashMD5(config.cookies.auth), {
      path: "/",
      expires: new Date(0),
    });
    destroyCookie(null, hashMD5(config.cookies.profile), {
      path: "/",
      expires: new Date(0),
    });
    router.push('/');
    setIsAuthorize(false);
  }

  return (
    <Dialog
      classes='w-[400px]'
      isOpen={defaultStatus}>
      <Dialog.Title title='Close this app?'/>
      <Dialog.Content>
        <div className="mt-2">
          <Text sx='sx' classes="text-sm text-gray-500">
            Are you sure you want to Logout ?
          </Text>
        </div>
        <Row classes='mt-4' justify='end'>
          <Button light onClick={() => setShowDialog(false)}>
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