import {useRouter} from "next/router";
import {TrashIcon} from "@heroicons/react/outline";
import {EyeIcon} from "@heroicons/react/outline";

import {Link} from "../../../components";
import {Table} from "../../../components/Table";
import Helmet from "../../../layout/AdminLayout/Content";
import {UsersProvider, UsersContext} from "../../../context/userContext";
import moment from "moment/moment";

const UserList = ({context}) => {

  const router = useRouter();

  function handleDelete(id) {}

  const columns = [
    {
      id: 'name', title: 'Name',
      render: (row) => {
        return <div className='flex items-center'>
          <div className='rounded-lg '>
            <img src={`https://i.pravatar.cc/150?u=${row._id}`} className='h-9 w-9 rounded-md ' alt='avatar'/>
          </div>
          <p className='ml-4 text-sm font-bold'>{row.name}</p>
        </div>
      }
    },
    {id: 'email', title: 'Email',},
    {id: 'role', title: 'Role',},
    // {id: 'verified', title: 'Verified'},
    {
      id: 'status', title: 'Status',
      render: (row) => (
        <span className="badge-green">{row ? 'Active' : 'Banned'}</span>
      )
    },
    {id: 'createAt', title: 'Date Create', render: (row) => <>{moment(row.createAt).format('DD/MM/YYYY')}</>},
    {
      id: '', title: '',
      render: (row) => <>
        <div className='flex gap-x-4 justify-center'>
          <Link href={`${router.pathname}/${row._id}`}>
            <EyeIcon className='cursor-pointer' height={30} width={30}/>
          </Link>
          <button onClick={() => handleDelete(row.id)}>
            <TrashIcon height={30} width={30}/>
          </button>
        </div>
      </>
    },
  ];

  const dataBreadcrumb = [
    {path: "/admin", name: "Dashboard", firstLink: true},
    {path: "/admin/users", name: "Users"},
    {path: "", name: "List", lastLink: true}
  ];

  return (
    <div>
      <Helmet title='User List' dataBreadcrumb={dataBreadcrumb}>
        <Table
          itemsPerPage={6}
          columns={columns}
          rows={context?.users}
        />
      </Helmet>
    </div>
  )
}

UsersWithContext.layout = 'admin';

function UsersWithContext(props) {
  return (
    <UsersProvider>
      <UsersContext.Consumer>
        {context => <UserList {...props} context={context}/>}
      </UsersContext.Consumer>
    </UsersProvider>
  )
}

export default UsersWithContext