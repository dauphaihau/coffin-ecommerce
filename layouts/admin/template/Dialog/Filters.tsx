import Dialog from "../../../../core/Dialog/Dialog";
import {Button} from "../../../../core/Button";
import {Grid, Row} from "../../../../core/Layout";
import {Text} from "../../../../core";

import {Input, Select} from "../../../../core/Input";
import {searchByOptsProducts} from "../../../../assets/data/options";

const FiltersDialog = (props) => {
  const {handleRequest, defaultStatus, setDialogStatus} = props;

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
      <Dialog.Title title='Filters'/>
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
        <Select
          classesSpace='mt-4'
          size='medium'
          label='Search by'
          options={searchByOptsProducts}
          onChange={(e) => handleOnchange('searchBy', e)}
        />
        <Input
          label='Text search' name='searchValue'
          placeholder='712834657911'
          // classesSpace='mb-0'
        />
        {/*</Grid>*/}
        <Row classes='mt-4' justify='end'>
          <Button light onClick={() => setDialogStatus(false)}>
            Cancel
          </Button>
          <Button shadow>
            Apply filters
          </Button>
        </Row>
      </Dialog.Content>
    </Dialog>
  );
}

export default FiltersDialog;