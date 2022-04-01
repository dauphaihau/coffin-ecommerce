import Link from 'next/link'
import Image from "next/image";
import {slugify} from '../utils/helpers'
import Navbar from "../components/Navbar";
import Login from "../components/form/Login";
import 'react-toastify/dist/ReactToastify.css'
import {Contact, Footer} from "../components";
import {ToastContainer} from "react-toastify";
import Backdrop from "../components/Drawer/Backdrop";
import {useUtil} from "../context/utilContext";
import CartDrawer from "../components/util/CartDrawer";


const contextClass = {
  // success: "bg-blue-600",
  // error: "bg-red-600",
  // info: "bg-gray-600",
  // warning: "bg-orange-400",
  default: "bg-black text-white",
  // dark: "bg-black text-white",
};


const Layout = ({children, categories}) => {

  const {drawerOpen, modalOpen} = useUtil();

  let navItemLength = 5;
  if (categories.length > navItemLength) {
    categories = categories.slice(0, navItemLength)
  }

  return (
    <div className='overflow-y-hidden'>
      <Navbar categories={categories}/>
      {drawerOpen || modalOpen && <Backdrop />}
      {/*<CartDrawer/>*/}
      <CartDrawer/>
      <ToastContainer
        position="bottom-right"
        toastClassName={({type}) => contextClass[type || "default"] +
          " relative flex p-1 min-h-20 rounded-md justify-between overflow-hidden cursor-pointer"
        }
        bodyClassName={() => "text-sm font-white font-med block p-3"}
        progressClassName='text-gray-300'
      />
      <div className='mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16'>
        <Login/>
        <main className="pt-44">{children}</main>
        <Contact/>
        <Footer/>
      </div>
    </div>
  );
}

export default Layout;