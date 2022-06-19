import {Toaster} from "react-hot-toast";
import LoadingBar from "react-top-loading-bar";

import {useUIController} from "../../../context/UIControllerContext";
import {Col, Container} from "../../../core/Layout";
import Navbar from "./Navbar";
import Sidebar from "./AdminSidebar";
import Footer from "./Footer";

const AdminLayout = ({children}) => {
  const {progress, setProgress} = useUIController();
  return (
    <>
      <LoadingBar color="#000000" progress={progress} onLoaderFinished={() => setProgress(0)} height={2}/>
      <Toaster position="top-right" reverseOrder={false}/>
      <Container display='flex' classes='bg-[#f8f9fa] dark:bg-gray-custom-903 h-screen'>
        <Sidebar/>
        <Col classes='p-[24px] ml-[18rem] desktop:ml-[16%] monitor:ml-[12%] w-[calc(100%-280px)] relative'>
          <Navbar/>
          <main className='laptop:pt-[70px] w-full'>
            {children}
            {/*<Footer/>*/}
          </main>
        </Col>
      </Container>
    </>
  );
}

export default AdminLayout;