import {Toaster} from "react-hot-toast";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

import AllModal from "../../core/Modal";
import AllDrawer, {Backdrop} from "../../core/Navigation/Drawer";
import {useUIController} from "../../context/UIControllerContext";
import Navbar from "./Navbar/Navbar";
import Contact from "./Contact";
import Footer from "./Footer";
import BannerHomeCard from "../../core/Card/BannerHomeCard";
import ChatBox from "./ChatBox";

const MainLayout = ({children, categories}) => {
  const [showBanner, setShowBanner] = useState(false)
  const [isMobileScreen, setIsMobileScreen] = useState(false)
  const router = useRouter();

  let navItemLength = 5;
  if (categories.length > navItemLength) {
    categories = categories.slice(0, navItemLength)
  }

  useEffect(() => {
    if (window.matchMedia('(max-width: 414px)').matches) {
      setIsMobileScreen(true)
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0);
    if (router.pathname === '/') {
      setShowBanner(true)
    } else {
      setShowBanner(false)
    }
  }, [router.asPath])

  const {} = useUIController();

  return (
    <div>
      <Toaster position={isMobileScreen ? 'top-center' : 'bottom-right'} reverseOrder={false}/>
      <AllModal/>
      <AllDrawer/>
      <ChatBox/>
      <Backdrop/>
      <Navbar categories={categories}/>
      <BannerHomeCard isDisplay={showBanner}/>
      <div className='mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16'>
        <main className="pt-28">{children}</main>
        <Contact/>
        <Footer/>
      </div>
    </div>
  );
}

export default MainLayout;

