import moment from "moment/moment";
import {useRouter} from "next/router";
import {toast} from "react-hot-toast";
import {useEffect, useState} from "react";

import {userService} from "@services/users";
import {useUIController} from "@context/UIControllerContext";
import {Text} from "../../../core";
import {Button} from "../../../core/Button";
import {MenuDropdown} from "../../../core/Navigation";
import {Helmet} from "../../../layouts/admin/common/Helmet";
import Table from "../../../core/Table";
import {Row} from "../../../core/Layout";
import {Link} from "../../../core/Next";

const UserList = () => {
  const router = useRouter();
  const [users, setUsers] = useState()
  const {progress, dispatch, setProgress, ...res} = useUIController();
  // console.log('res', res)

  useEffect(() => {
    const fetchData = async () => {
      setProgress(progress + 30)
      const res = await userService.getAll();
      setProgress(100)
      setUsers(res.data)
    }
    fetchData();
  }, [])

  const columns = [
    {
      id: 'name', title: 'Name',
      render: (row) => (
        <Row align='center'>
          <div className='rounded-lg '>
            <img src={`https://i.pravatar.cc/150?u=${row._id}`} className='h-9 w-9 rounded-md ' alt='avatar'/>
          </div>
          <Text weight='bold' sx='sm' classes='ml-4'>{row.name}</Text>
        </Row>
      )
    },
    {id: 'email', title: 'Email',},
    {id: 'role', title: 'Role',},
    {
      id: 'verified', title: 'Verified', align: 'center',
      render: (row) => (
        <>
          {row.isVerified ?
            // <i className="fa-solid fa-badge-check"/>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 inline" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"/>
            </svg>
            :
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 inline" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"/>
            </svg>
          }
        </>
      )
    },
    {
      id: 'status', title: 'Status',
      render: (row) => (
        <>
          {row.isBanned ?
            <Text span classes="badge-danger">Banned</Text>
            : <Text span classes="badge-green">Active</Text>
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
      render: (row) => <>
        <MenuDropdown
          options={[
            {
              label: 'Edit',
              element: <i className="fa-solid fa-pen"/>,
              href: `${router.pathname}/${row._id}`
            },
            {
              label: 'Delete',
              element: <i className="fa-solid fa-trash-can"/>,
              feature: () => handleDelete(row._id)
            },
          ]}
        />
      </>
    },
  ];

  const dataBreadcrumb = [
    {path: "/admin", name: "Dashboard", firstLink: true},
    {path: "/admin/users", name: "Users"},
    {path: "", name: "List", lastLink: true}
  ];

  async function handleDelete(id) {
    dispatch({type: 'OPEN_CONFIRM_DELETE', payload: id})
    // const res = await userService.delete(id)
    // if (res.isSuccess) {
    //   const res = await userService.getAll();
    //   setUsers(res.data)
    //   toast.success('Delete success!')
    // } else {
    //   toast.error(res.message)
    // }
  }

  async function handleDeleteMultiItems(optionsChecked) {
    // if (!window.confirm('Are you sure?')) {
    //   return;
    // }
    dispatch({type: 'OPEN_CONFIRM_DELETE'})
    const res = await userService.multiDelete(optionsChecked.map(e => e.id))
    if (res.isSuccess) {
      const res = await userService.getAll();
      setUsers(res.data)
      toast.success('Delete success!')
    } else {
      toast.error(res.message)
    }
  }

  return (
    <>
      <div className='flex items-center justify-between'>
        <Helmet title='List User' dataBreadcrumb={dataBreadcrumb}/>
        <Link href='/admin/users/new'>
          <Button classes='ml-auto mb-4' icon={<i className="fa-solid fa-plus"/>}> New User</Button>
        </Link>
      </div>
      <Table
        onChangeCheckbox={handleDeleteMultiItems}
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