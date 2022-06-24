import {Toaster} from "react-hot-toast";
import LoadingBar from "react-top-loading-bar";

import {useUIController} from "../../../context/UIControllerContext";
import {Box, Col, Container} from "../../../core/Layout";
import Navbar from "./Navbar";
// import Sidebar from "./AdminSidebarTest";
import Sidebar from "./AdminSidebar";

import Footer from "./Footer";
import {useState} from "react";
import useHover from "../../../utils/hooks/useHover";

const AdminLayout = ({children}) => {
  const {progress, setProgress} = useUIController();
  const [minimizeSidebar, setMinimizeSidebar] = useState(false)
  const [hoverRef, isHovered] = useHover()
  console.log('is-hovered', isHovered)

  return (
    <>
      <LoadingBar color="#000000" progress={progress} onLoaderFinished={() => setProgress(0)} height={2}/>
      <Toaster position="top-right" reverseOrder={false}/>
      <Container display='flex' classes='bg-[#f8f9fa] dark:bg-gray-custom-903 h-screen'>
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
    </>
  );
}

export default AdminLayout;