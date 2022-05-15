import {Toaster} from "react-hot-toast";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

import {useUIController} from "../../../context/UIControllerContext";
import Navbar from "./Navbar/Navbar";
import Contact from "./Contact";
import Footer from "./Footer";
import ChatBox from "./ChatBox";
import BannerHomeCard from "./BannerHomeCard";
import AllDrawer from "./Drawer";
import Backdrop from "../../../core/Navigation/Drawer/Backdrop";
import AllDialog from "./Dialog";
import {Container} from "../../../core/Layout";

export const MainLayout = ({children, categories}) => {
  const [showBanner, setShowBanner] = useState(false)
  const [isMobileScreen, setIsMobileScreen] = useState(false)
  const router = useRouter();

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

  let navItemLength = 5;
  if (categories.length > navItemLength) {
    categories = categories.slice(0, navItemLength)
  }

  const {} = useUIController();

  return (
    <div>
      <Toaster position={isMobileScreen ? 'top-center' : 'bottom-right'} reverseOrder={false}/>
      <AllDialog/>
      <AllDrawer/>
      <ChatBox/>
      <Backdrop/>
      <Navbar categories={categories}/>
      <BannerHomeCard isDisplay={showBanner}/>
      <Container classes='mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16'>
        <main className="pt-28">{children}</main>
        <Contact/>
        <Footer/>
      </Container>
    </div>
  );
}


