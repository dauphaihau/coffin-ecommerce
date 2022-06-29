import Dialog from "../../../../core/Dialog/Dialog";
import {Button} from "../../../../core/Button";
import {Box, Grid, Row} from "../../../../core/Layout";
import {Text} from "../../../../core";

import {Checkbox, Input, Select} from "../../../../core/Input";
import {searchByOptsProducts} from "../../../../assets/data/options";
import {MenuAlt4Icon} from "@heroicons/react/outline";

const CustomizeColumnDialog = (props) => {
  const {handleRequest, defaultStatus, setDialogStatus, columns} = props;

  const handleOnchange = (n, v) => {
    console.log('n', n)
    console.log('v', v)
  }

  return (
    <Dialog
      classes='w-[390px]'
      isOpen={defaultStatus}
      closeDialog={() => setDialogStatus(false)}
    >
      <Dialog.Title title='Customize Columns'/>
      <Dialog.Content>
        {/*<Text classes="text-sm text-gray-500 mt-2">*/}
        {/*  Are you sure you want to delete ? <br/> By doing this, you will not be able to recover the data.*/}
        {/*</Text>*/}
        {/*<Row classes='mt-4' justify='end'>*/}
        {/*  <Button light onClick={() => setDialogStatus(false)}>*/}
        {/*    Cancel*/}
        {/*  </Button>*/}
        {/*  <Button variant='warning' shadow onClick={() => handleRequest()}>*/}
        {/*    Delete*/}
        {/*  </Button>*/}
        {/*</Row>*/}

        {/*<Grid sx={2} gapx={4}>*/}

        {/*<div className='border'></div>*/}
        {
          columns.map(o => (
            <Box classes='p-4 border rounded-lg mb-4' key={o.id}>
              <Row justify='between' align='center'>
                <Checkbox name='rememberMe' label={o.title}/>
                <MenuAlt4Icon className='h-4 w-4'/>
              </Row>
            </Box>
          )).slice(1, -1)
        }
        {/*<Box classes='p-4 border rounded-lg my-4'>*/}
        {/*  <Row justify='between' align='center'>*/}
        {/*    <Checkbox name='rememberMe' label='Remember me'/>*/}
        {/*    <MenuAlt4Icon className='h-4 w-4'/>*/}
        {/*  </Row>*/}
        {/*</Box>*/}
        {/*<Box classes='p-4 border rounded-lg mb-4'>*/}
        {/*  <Row justify='between' align='center'>*/}
        {/*    <Checkbox name='rememberMe' label='Remember me'/>*/}
        {/*    <MenuAlt4Icon className='h-4 w-4'/>*/}
        {/*  </Row>*/}
        {/*</Box>*/}
        {/*<Box classes='p-4 border rounded-lg mb-4'>*/}
        {/*  <Row justify='between' align='center'>*/}
        {/*    <Checkbox name='rememberMe' label='Remember me'/>*/}
        {/*    <MenuAlt4Icon className='h-4 w-4'/>*/}
        {/*  </Row>*/}
        {/*</Box>*/}
        {/*<Box classes='p-4 border rounded-lg mb-4'>*/}
        {/*  <Row justify='between' align='center'>*/}
        {/*    <Checkbox name='rememberMe' label='Remember me'/>*/}
        {/*    <MenuAlt4Icon className='h-4 w-4'/>*/}
        {/*  </Row>*/}
        {/*</Box>*/}

        <Row classes='mt-4' justify='end'>
          <Button light onClick={() => setDialogStatus(false)}>
            Cancel
          </Button>
          <Button shadow>
            Save
          </Button>
        </Row>
      </Dialog.Content>
    </Dialog>
  );
}

export default CustomizeColumnDialog;