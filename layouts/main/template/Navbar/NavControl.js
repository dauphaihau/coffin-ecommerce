import {ShoppingBagIcon, UserIcon, SearchIcon} from "@heroicons/react/outline";
import {UserIcon as UserIconSolid, UserGroupIcon} from "@heroicons/react/solid";
import {useUIController} from "../../../../context/UIControllerContext";
import {useAuth} from "../../../../context/authContext";
import {Link} from "../../../../core/Next";
import {ROLE_OPTIONS} from "../../../../utils/enums";

function NavControl() {
  const {dispatch} = useUIController();
  const {user, isAuthorize} = useAuth();

  return (
    <div className="flex">
      <button className='mr-4' onClick={() => dispatch({type: 'OPEN_SEARCH_MODAL'})}>
        <div className="flex flex-1 justify-end relative">
          <SearchIcon width={35} height={30}/>
        </div>
      </button>
      <button className='mr-4' onClick={() => dispatch({type: 'OPEN_CART_DRAWER'})}>
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
            ? <>
              {user?.role === ROLE_OPTIONS.CUSTOMER
                ? <Link href='/account'><UserIconSolid width={35} height={30}/></Link>
                : <Link href='/admin'><UserGroupIcon width={35} height={30}/></Link>
              }
            </>
            : <UserIcon width={35} height={30} onClick={() => dispatch({type: 'OPEN_LOGIN_REGISTER'})}/>
        }
      </div>
    </div>
  )
}

export default NavControl