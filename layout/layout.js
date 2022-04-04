import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from "react-toastify";

import Navbar from "../components/Layout/Navbar";
import {Contact, Footer} from "../components";
import Backdrop from "../components/Drawer/Backdrop";
import {useUtil} from "../context/utilContext";
import CartDrawer from "../components/Drawer/CartDrawer";
import {LoginModal, SearchModal} from "../components/Modal";

const contextClass = {
  default: "bg-black text-white",
};

const Layout = ({children, categories}) => {

  const {drawerOpen, modalOpen,modalSearchOpen} = useUtil();

  let navItemLength = 5;
  if (categories.length > navItemLength) {
    categories = categories.slice(0, navItemLength)
  }

  return (
    <div>
      <SearchModal/>
      <LoginModal/>
      <Navbar categories={categories}/>
      {
        drawerOpen && <Backdrop /> ||
        modalOpen && <Backdrop/> ||
        modalSearchOpen && <Backdrop/>
      }
      <CartDrawer/>
      <ToastContainer
        autoClose={1500}
        position="bottom-right"
        toastClassName={({type}) => contextClass[type || "default"] +
          " relative flex p-1 min-h-20 rounded-md justify-between overflow-hidden cursor-pointer"
        }
        bodyClassName={() => "text-sm font-white font-med block p-3"}
        progressClassName='text-gray-300'
      />
      <div className='mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16'>
        <main className="pt-28">{children}</main>
        <Contact/>
        <Footer/>
      </div>
    </div>
  );
}

export default Layout;