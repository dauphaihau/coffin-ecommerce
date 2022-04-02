import {useState, useEffect} from 'react'

import {ShoppingBagIcon, UserIcon} from "@heroicons/react/outline";
import {UserIcon as UserIconSolid} from "@heroicons/react/solid";
import {Link} from "./index";
import {useUtil} from "../context/utilContext";

function CartLink() {
  const [authorized, setAuthorized] = useState(false);
  const {drawerToggle, modalToggle, user} = useUtil();

  useEffect(() => {
    if (user.token) {
      setAuthorized(true)
    }
  }, [user.token])

  return (
    <div>
      <div className="sm:top-53 right-[44px] top-40 flex">
        <button onClick={() => drawerToggle()}>
          <div className="flex flex-1 justify-end relative">
            <ShoppingBagIcon width={35} height={30}/>
            {
              user.numberAllOfItemsInCart > Number(0) && (
                <div className='absolute inset-0 left-4 bg-black w-[60%] rounded-2xl h-5 text-[13px]'>
                  <span className='text-white text-[10px]'>{user.numberAllOfItemsInCart}</span></div>
              )
            }
          </div>
        </button>
        <div className='ml-4 cursor-pointer'>
          {
            authorized
              ? <Link href={'/account'}><UserIconSolid width={35} height={30}/></Link>
              : <UserIcon width={35} height={30} onClick={() => modalToggle()}/>
          }
        </div>
      </div>
    </div>
  )
}

export default CartLink