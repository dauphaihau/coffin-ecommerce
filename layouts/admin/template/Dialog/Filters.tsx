import Dialog from "../../../../core/Dialog/Dialog";
import {Button} from "../../../../core/Button";
import {Grid, Row} from "../../../../core/Layout";
import {Text} from "../../../../core";

import {Input, Select} from "../../../../core/Input";
import {searchByOptsProducts, sortByOpts} from "../../../../assets/data/options";
import {useState} from "react";

const FiltersDialog = (props) => {
  const {onChangeFilter, defaultStatus, setDialogStatus} = props;
  const [state, setState] = useState({
    searchBy: 'name',
    // searchBy: searchByOptsProducts[0].value,
    searchValue: '',
    sortBy: 'desc',
    by: 'name',
  })

  const handleOnchange = (name, value) => {
    setState({...state, [name]: value})
  }

  const handleSave = () => {
    onChangeFilter(state)
    setDialogStatus(false)
  }

  return (
    <Dialog
      classes='w-[490px]'
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

        <Grid sx={2} gap={4} classes='mt-4'>
          <Select
            size='medium'
            label='Sort'
            options={sortByOpts}
            onChange={({value}) => handleOnchange('sort', value)}
          />
          <Select
            size='medium'
            label='By'
            options={searchByOptsProducts}
            onChange={({value}) => handleOnchange('by', value)}
          />
        </Grid>
        <Grid sx={2} gap={4}>
          <Select
            // classesSpace='mt-4'
            size='medium'
            label='Search by'
            options={searchByOptsProducts}
            onChange={({value}) => handleOnchange('searchBy', value)}
          />
          <Input
            label='Text search' name='searchValue'
            onChange={handleOnchange}
            // classesSpace='mb-0'
          />
        </Grid>
        <Row classes='mt-4' justify='end'>
          <Button light onClick={() => setDialogStatus(false)}>Cancel</Button>
          <Button shadow onClick={() => handleSave()}>Apply filters</Button>
        </Row>
      </Dialog.Content>
    </Dialog>
  );
}

export default FiltersDialog;