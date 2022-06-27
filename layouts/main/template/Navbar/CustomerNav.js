import {ShoppingBagIcon, UserIcon, SearchIcon} from "@heroicons/react/outline";
import {UserIcon as UserIconSolid, UserGroupIcon} from "@heroicons/react/solid";
import {useUIController} from "../../../../context/UIControllerContext";
import {useAuth} from "../../../../context/authContext";
import {Link} from "../../../../core/Next";
import {ROLE_OPTIONS} from "../../../../utils/enums";
import {Box, Row} from "../../../../core/Layout";
import {Text} from "../../../../core";

function CustomerNav() {
  const {dispatch} = useUIController();
  const {user, isAuthorize} = useAuth();

  return (
    <Row>
      <button className='mr-4' onClick={() => dispatch({type: 'OPEN_SEARCH_MODAL'})}>
        <Row justify='end' classes="flex-1 relative">
          <SearchIcon width={35} height={30}/>
        </Row>
      </button>
      <button className='mr-4' onClick={() => dispatch({type: 'OPEN_CART_DRAWER'})}>
        <Row justify='end' classes="flex-1 relative">
          <ShoppingBagIcon width={35} height={30}/>
          {
            user?.numberAllOfItemsInCart > Number(0) && (
              <Box classes='absolute inset-0 left-4 bg-black w-[60%] rounded-2xl h-5 text-[13px]'>
                <Text span color='white' className='text-[10px]'>{user.numberAllOfItemsInCart}</Text>
              </Box>
            )
          }
        </Row>
      </button>
      <Box classes='cursor-pointer'>
        {
          isAuthorize
            ? <>
              {user.role === ROLE_OPTIONS.CUSTOMER
                ? <Link href='/profile'><UserIconSolid width={35} height={30}/></Link>
                : <Link href='/admin'><UserGroupIcon width={35} height={30}/></Link>
              }
            </>
            : <UserIcon width={35} height={30} onClick={() => dispatch({type: 'OPEN_LOGIN_REGISTER'})}/>
        }
      </Box>
    </Row>
  )
}

export default CustomerNav