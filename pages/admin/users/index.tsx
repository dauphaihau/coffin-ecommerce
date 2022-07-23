import moment from 'moment/moment';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { useCallback, useEffect, useState } from 'react';

import { userService } from '@services/users';
import { useUIController } from '@context/UIControllerContext';
import { Image, Text } from '../../../core';
import { Button } from '../../../core/Button';
import { MenuDropdown } from '../../../core/Navigation';
import { Helmet } from '../../../layouts/admin/common/Helmet';
import Table from '../../../core/Table';
import { Row } from '../../../core/Layout';
import { Link } from '../../../core/Next';
import { capitalize, isNil } from '../../../utils/helpers';
import { ROLE_OPTIONS, USER_STATUS } from '../../../utils/enums';
import ConfirmDeleteDialog from "../../../layouts/admin/template/Dialog/ConfirmDelete";

const dataBreadcrumb = [
  {path: '/admin', name: 'Dashboard', firstLink: true},
  {path: '/admin/users', name: 'Users'},
  {path: '', name: 'List', lastLink: true}
];

const rowsPerPage = [5, 15, 25]

const UserList = () => {
  const router = useRouter();
  const {progress, setProgress} = useUIController();
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showDialog, setShowDialog] = useState(false)
  const [idUser, setIdUser] = useState()
  const [params, setParams] = useState({
    skip: 0, limit: rowsPerPage[0]
  })

  const getAllUsers = useCallback(
    async () => {
      setProgress(progress + 30)
      const res = await userService.getAll(params);
      if (res) {
        setProgress(100)
        setUsers(res.data)
        setLoading(false)
      }
    }, [params]
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
            <Image
              normalTag src={row.avatar ?? '/images/default/avatar-default.jpeg'}
              classesSize='h-9 w-9' classes='rounded-md' alt='avatar'
            />
          </div>
          <Text weight='bold' classes='text-sm ml-4 desktop:hidden'>
            {row.name.length > 9 ? row.name.substring(0, 9) + '...' : row.name}
          </Text>
          <Text weight='bold' classes='text-sm ml-4 hidden desktop:block'>
            {row.name}
          </Text>
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
            //   // feature: () => handleRequest(row._id)
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

  async function handleRequest() {
    const {isSuccess, message} = await userService.delete(idUser)
    if (!isSuccess) {
      toast.error(message)
      return
    }
    getAllUsers();
    setShowDialog(false)
    toast.success('Delete success!')
  }

  const handleOnChangeTable = (values) => {
    setParams({...params, skip: values.skip})
  }

  return (
    <>
      <ConfirmDeleteDialog defaultStatus={showDialog} setShowDialog={setShowDialog} handleRequest={handleRequest}/>
      <Row align='center' justify='between'>
        <Helmet title='List User' dataBreadcrumb={dataBreadcrumb}/>
        <Link href='/admin/users/new'>
          <Button classes='ml-auto mb-4' icon={<Text i classes='fa-solid fa-plus'/>}> New User</Button>
        </Link>
      </Row>
      <Table
        loading={loading}
        columns={columns}
        onChange={handleOnChangeTable}
        rowsPerPageOptions={rowsPerPage}
        totalRows={users?.total}
        rows={users?.list}
      />
    </>
  )
}

UserList.layout = 'admin';
export default UserList