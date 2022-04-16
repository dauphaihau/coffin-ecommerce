import moment from "moment/moment";
import {useRouter} from "next/router";
import {toast} from "react-hot-toast";
import {useEffect, useState} from "react";

import {Link, Tooltip, Helmet} from "@components";
import {Table} from "@components/Table";
import {userService} from "@services/users";
import {useUIController} from "@context/UIControllerContext";

const UserList = () => {
  const router = useRouter();
  const [users, setUsers] = useState()
  const {progress, setProgress} = useUIController();

  useEffect(() => {
    const fetchData = async () => {
      setProgress(progress + 30)
      const res = await userService.getAll();
      console.log('res', res)
      setProgress(100)
      setUsers(res.data)
    }
    fetchData();
  }, [])

  const columns = [
    {
      id: 'name', title: 'Name',
      render: (row) => (
        <div className='flex items-center'>
          <div className='rounded-lg '>
            <img src={`https://i.pravatar.cc/150?u=${row._id}`} className='h-9 w-9 rounded-md ' alt='avatar'/>
          </div>
          <p className='ml-4 text-sm font-bold'>{row.name}</p>
        </div>
      )
    },
    {id: 'email', title: 'Email',},
    {id: 'role', title: 'Role',},
    // {id: 'verified', title: 'Verified'},
    // {
    //   id: 'status', title: 'Status',
    //   render: (row) => (<span className="badge-green">{row ? 'Active' : 'Banned'}</span>
    //   )
    // },
    {id: 'createAt', title: 'Date Create', render: (row) => <>{moment(row.createAt).format('DD/MM/YYYY')}</>},
    {
      id: '', title: '',
      render: (row) => <>
        <div className='flex gap-x-4 justify-center'>
          <Tooltip title='Edit'>
            <Link href={`${router.pathname}/${row._id}`}>
              <i className=" fa-solid fa-pen text-xl "/>
            </Link>
          </Tooltip>
          <Tooltip title='Delete'>
            <button onClick={() => handleDelete(row._id)}>
              <i className="fa-solid fa-trash-can text-xl"/>
            </button>
          </Tooltip>
        </div>
      </>
    },
  ];

  const dataBreadcrumb = [
    {path: "/admin", name: "Dashboard", firstLink: true},
    {path: "/admin/users", name: "Users"},
    {path: "", name: "List", lastLink: true}
  ];

  async function handleDelete(id) {
    if (!window.confirm('Are you sure?')) {
      return;
    }
    const res = await userService.delete(id)
    if (res.isSuccess) {
      const res = await userService.getAll();
      setUsers(res.data)
      toast.success('Delete success!')
    } else {
      toast.error(res.message)
    }
  }

  return (
    <Helmet title='List User' dataBreadcrumb={dataBreadcrumb}>
      <Table
        columns={columns}
        itemsPerPage={6}
        rows={users}
      />
    </Helmet>
  )
}

UserList.layout = 'admin';
export default UserList