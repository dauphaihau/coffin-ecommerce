import Dialog from "../../../../core/Dialog/Dialog";
import {Text} from "../../../../core";
import {Row} from "../../../../core/Layout";
import {Button} from "../../../../core/Button";
import {destroyCookie} from "nookies";
import {hashMD5} from "../../../../utils/helpers";
import config from "../../../../config.json";
import {useRouter} from "next/router";
import {useAuth} from "../../../../context/authContext";
import {useEffect, useState} from "react";
import {XIcon} from "@heroicons/react/solid";

const SubscribeDialog = (props) => {

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setTimeout(() => setIsOpen(true), 5000)
  }, [])

  return (
    <Dialog isOpen={isOpen}>
      {/*<Dialog.Title title='Confirm delete'/>*/}
      <Dialog.Content>

        <Row justify='end' classes="p-2 mb-[-44px]">
          <XIcon className='btn-icon' onClick={() => setIsOpen(false)}/>
        </Row>
        <form
          // onSubmit={handleSubmit(onSubmit)}
          className=" px-6 pb-4 space-y-6 pt-4 lg:px-8 pb-6 xl:pb-8"
        >
          <Button
            type="submit" width='full'
            // classes={currentForm === 'forgotPassword' && '!mt-[5px]'}
            size='lg'
          >
            Subscribe
          </Button>
        </form>



        {/*<Text classes="text-sm text-gray-500 mt-2">*/}
        {/*  Are you sure you want to delete ? <br/> By doing this, you will not be able to recover the data.*/}
        {/*</Text>*/}
        {/*<Row classes='mt-4' justify='end'>*/}
        {/*  <Button light onClick={() => setIsOpen(false)}>*/}
        {/*    Cancel*/}
        {/*  </Button>*/}
        {/*  /!*<Button variant='warning' shadow onClick={() => handleDelete()}>*!/*/}
        {/*  /!*  Delete*!/*/}
        {/*  /!*</Button>*!/*/}
        {/*</Row>*/}

      </Dialog.Content>
    </Dialog>
  );
}

export default SubscribeDialog;