import {Toaster} from "react-hot-toast";
import AllModal from "../../components/Modal";
import AllDrawer, {Backdrop} from "../../components/Drawer";
import {useUtil} from "../../context/utilContext";
import {useEffect} from "react";
import Navbar from "./Navbar";
import Contact from "./Contact";
import Footer from "./Footer";

const MainLayout = ({ children, categories }) => {

  let navItemLength = 5;
  if (categories.length > navItemLength) {
    categories = categories.slice(0, navItemLength)
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const {} = useUtil();

  return (
    <div>
      <AllModal/>
      <AllDrawer/>
      <Backdrop/>
      <Navbar categories={categories}/>
      <Toaster position="bottom-right" reverseOrder={false}/>
      <div className='mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16'>
        <main className="pt-28">{children}</main>
        <Contact/>
        <Footer/>
      </div>
    </div>
  );
}

export default MainLayout;

