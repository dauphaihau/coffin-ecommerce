import {Toaster} from 'react-hot-toast';
import LoadingBar from 'react-top-loading-bar';

import {useUIController} from '../../../context/UIControllerContext';
import {Box, Col, Container} from '../../../core/Layout';
import Navbar from './Navbar';
// import Sidebar from './AdminSidebarTest';
import Sidebar from './AdminSidebar';

import Footer from './Footer';
import {useEffect, useState} from 'react';
import useHover from '../../../utils/hooks/useHover';
import {KBarProvider} from "kbar";
import {Kbar} from "./Kbar";
import {useRouter} from "next/router";

const AdminLayout = ({children}) => {
  const {progress, setProgress} = useUIController();
  const [minimizeSidebar, setMinimizeSidebar] = useState(false)
  const [hoverRef, isHovered] = useHover()
  const router = useRouter();
  // console.log('is-hovered', isHovered)

  useEffect(() => {
    document.querySelector('body').classList.add('dark:bg-gray-custom-903', 'bg-gray-custom-498')
  });

  const actions = [
    {
      id: "createUser",
      name: "Create User",
      shortcut: ["cu"],
      keywords: "create user",
      perform: () => router.push("/admin/users/new")
    },
    {
      id: "createProducts",
      name: "Create products",
      shortcut: ["cp"],
      keywords: "create products",
      perform: () => router.push("/admin/products/new")
    },
  ]

  return (
    <KBarProvider actions={actions}>
      <Kbar/>
      <LoadingBar color='#000000' progress={progress} onLoaderFinished={() => setProgress(0)} height={2}/>
      <Toaster position='top-right' reverseOrder={false}/>
      <Container display='flex' classes=' h-screen'>
        <Sidebar
          hoverRef={hoverRef}
          isHovered={isHovered}
          minimizeSidebar={minimizeSidebar}/>
        {/*<Col classes={`p-[24px] ml-[18rem] desktop:ml-[16%] monitor:ml-[12%]*/}
        {/* w-[calc(100%-280px)] animate*/}
        {/* ${minimizeSidebar && 'w-[calc(100%-140px)] ml-[8rem]'}*/}
        {/* `}>*/}
        <Col classes={`p-[24px] ml-[18rem] desktop:ml-[16%] monitor:ml-[11%]
         w-[calc(100%-280px)] animate
         ${minimizeSidebar && 'w-[calc(100%-140px)] ml-[8rem] desktop:ml-[7%] monitor:ml-[5%]'}
         ${minimizeSidebar && isHovered && '!w-[calc(100%-280px)] !ml-[18rem]'}
         relative`}>
          <Navbar setMinimizeSidebar={setMinimizeSidebar} minimizeSidebar={minimizeSidebar}/>
          <Box main classes='laptop:pt-[70px] w-full'>
            {children}
            {/*<Footer/>*/}
          </Box>
        </Col>
      </Container>
    </KBarProvider>
  );
}

export default AdminLayout;