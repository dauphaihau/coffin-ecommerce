import {useRouter} from "next/router";
import {TrashIcon} from "@heroicons/react/outline";
import {EyeIcon} from "@heroicons/react/outline";

import {Button, Link} from "../../../components";
import {Table} from "../../../components/Table";
import Helmet from "../../../layout/AdminLayout/Content";
import {UsersProvider, UsersContext} from "../../../context/userContext";

const UserList = ({context}) => {

  const router = useRouter();

  function handleDelete(id) {
  }

  const columns = [
    {id: 'name', title: 'Name'},
    {id: 'email', title: 'Email',},
    {id: 'role', title: 'Role',},
    {id: 'verified', title: 'Verified',},
    {
      id: 'status', title: 'Status',
      render: (row) => (
        <span className="badge-green">{row ? 'Active' : 'Banned'}</span>
      )
    },
    // {id: 'dateDie', title: 'Date Die', render: (row) => <>{moment(row.dateDie).format('DD/MM/YYYY')}</>},
    {
      id: '', title: '',
      render: (row) => <>
        <div className='flex gap-x-4 justify-center'>
          <Link href={`${router.pathname}/${row.id}`}>
            <EyeIcon className='cursor-pointer' height={30} width={30}/>
          </Link>
          <button onClick={() => handleDelete(row.id)}>
            <TrashIcon height={30} width={30}/>
          </button>
        </div>
      </>
    },
  ];

  return (
    <div>
      <div className='flex justify-between items-center'>
        <Helmet title='User List'></Helmet>
        <Button css='h-1/2' >Add User</Button>
      </div>

      <Table
        itemsPerPage={4}
        columns={columns}
        rows={context?.users}
      />
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