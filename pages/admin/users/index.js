import moment from 'moment/moment';
import {useRouter} from 'next/router';
import {toast} from 'react-hot-toast';
import {useCallback, useEffect, useState} from 'react';

import {userService} from '@services/users';
import {useUIController} from '@context/UIControllerContext';
import {Text} from '../../../core';
import {Button} from '../../../core/Button';
import {MenuDropdown} from '../../../core/Navigation';
import {Helmet} from '../../../layouts/admin/common/Helmet';
import Table from '../../../core/Table';
import {Row} from '../../../core/Layout';
import {Link} from '../../../core/Next';
import {capitalize, isNil} from '../../../utils/helpers';
import {ROLE_OPTIONS, USER_STATUS} from '../../../utils/enums';
import ConfirmDeleteDialog from "../../../layouts/admin/template/Dialog/ConfirmDelete";


const dataBreadcrumb = [
  {path: '/admin', name: 'Dashboard', firstLink: true},
  {path: '/admin/users', name: 'Users'},
  {path: '', name: 'List', lastLink: true}
];


const UserList = () => {
  const router = useRouter();
  const {progress, dispatch, setProgress} = useUIController();
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showDialog, setShowDialog] = useState(false)
  const [idUser, setIdUser] = useState()

  const getAllUsers = useCallback(
    async () => {
      setProgress(progress + 30)
      const res = await userService.getAll();
      if (res) {
        setProgress(100)
        setUsers(res.data)
        setLoading(false)
      }
    }, []
  )

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers])

  const columns = [
    {
      id: 'name', title: 'Name',
      render: (row) => (
        <Row align='center'>
          <div className='rounded-lg '>
            <img src={row.avatar ?? '/images/default/avatar-default.jpeg'} className='h-9 w-9 rounded-md '
                 alt='avatar'/>
          </div>
          <Text weight='bold' sx='sm' classes='ml-4'>{row.name}</Text>
        </Row>
      )
    },
    {id: 'email', title: 'Email',},
    {
      id: 'role', title: 'Role',
      render: (row) => !isNil(row.role) ? capitalize(ROLE_OPTIONS[row.role].toLowerCase()) : '-'
    },
    {
      id: 'status', title: 'Status',
      render: ({status}) => (
        <>
          {status === USER_STATUS.LOCKED ?
            <Text span classes='badge-danger'>Locked</Text>
            : <Text span classes='badge-green'>Active</Text>
          }
        </>
      )
    },
    {
      id: 'createAt', title: 'Date Create', render: (row) => {
        return <>{moment(row.createAt).format('DD/MM/YYYY')}</>
      }
    },
    {
      id: 'actions', align: 'center',
      render: (row) => (
        <MenuDropdown
          ref={null}
          options={[
            // {
            //   label: 'Lock',
            //   element: <i className='fa-solid fa-lock'/>,
            //   // feature: () => handleDelete(row._id)
            // },
            {
              label: 'Edit',
              element: <i className='fa-solid fa-pen'/>,
              href: `${router.pathname}/${row._id}`
            },
            {
              label: 'Delete',
              element: <i className='fa-solid fa-trash-can'/>,
              feature: () => {
                setShowDialog(true)
                setIdUser(row._id);
              }
            },
          ]}
        />
      )
    },
  ];


  async function handleDelete() {
    const {isSuccess} = await userService.delete(idUser)
    if (isSuccess) {
      getAllUsers();
      setShowDialog(false)
      toast.success('Delete success!')
    } else {
      toast.error(message)
    }
  }

  async function handleDeleteMultiItems(optionsChecked) {
    // if (!window.confirm('Are you sure?')) {
    //   return;
    // }
    dispatch({type: 'OPEN_CONFIRM_DELETE'})
    const res = await userService.multiDelete(optionsChecked.map(e => e.id))
    if (isSuccess) {
      const res = await userService.getAll();
      setUsers(res.data)
      toast.success('Delete success!')
    } else {
      toast.error(res.message)
    }
  }

  return (
    <>
      <ConfirmDeleteDialog defaultStatus={showDialog} setShowDialog={setShowDialog} handleDelete={handleDelete}/>
      <Row align='center' justify='between'>
        <Helmet title='List User' dataBreadcrumb={dataBreadcrumb}/>
        <Link href='/admin/users/new'>
          <Button classes='ml-auto mb-4' icon={<i className='fa-solid fa-plus'/>}> New User</Button>
        </Link>
      </Row>
      <Table
        onChangeCheckbox={handleDeleteMultiItems}
        loading={loading}
        // checkboxSelection
        columns={columns}
        // rowsPerPage={5}
        // rowsPerPageOptions={[5, 10, 25]}
        rowsPerPageOptions={[3, 5, 25]}
        totalRows={users?.total}
        rows={users?.list}
      />
    </>
  )
}

UserList.layout = 'admin';
export default UserList