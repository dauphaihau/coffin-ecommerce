import {ShoppingBagIcon, UserIcon, SearchIcon} from "@heroicons/react/outline";
import {UserIcon as UserIconSolid, UserGroupIcon} from "@heroicons/react/solid";
import {Link} from "./index";
import {useUtil} from "../context/utilContext";
import {useAuth} from "../context/authContext";

function NavControl() {
  const {drawerToggle, modalToggle, modalSearchToggle} = useUtil();
  const {user, isAuthorize} = useAuth();

  return (
    <div className="flex">
      <button className='mr-4' onClick={() => modalSearchToggle()}>
        <div className="flex flex-1 justify-end relative">
          <SearchIcon width={35} height={30}/>
        </div>
      </button>
      <button className='mr-4' onClick={() => drawerToggle()}>
        <div className="flex flex-1 justify-end relative">
          <ShoppingBagIcon width={35} height={30}/>
          {
            user?.numberAllOfItemsInCart > Number(0) && (
              <div className='absolute inset-0 left-4 bg-black w-[60%] rounded-2xl h-5 text-[13px]'>
                <span className='text-white text-[10px]'>{user.numberAllOfItemsInCart}</span></div>
            )
          }
        </div>
      </button>
      <div className='cursor-pointer'>
        {
          isAuthorize
            ?
            <>
              {user.role === 'customer'
                ? <Link href='/account'><UserIconSolid width={35} height={30}/></Link>
                : <Link href='/admin'><UserGroupIcon width={35} height={30}/></Link>
              }
            </>
            : <UserIcon width={35} height={30} onClick={() => modalToggle()}/>
        }
      </div>
    </div>
  )
}

export default NavControl