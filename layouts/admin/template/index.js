import {Toaster} from "react-hot-toast";
import LoadingBar from "react-top-loading-bar";

import {useUIController} from "../../../context/UIControllerContext";
import {Col, Container} from "../../../core/Layout";
import Sidenav from "./Sidenav";
import Sidebar from "./AdminSidebar";

const AdminLayout = ({children}) => {
  const {progress, setProgress} = useUIController();
  return (
    <>
      <LoadingBar color="#000000" progress={progress} onLoaderFinished={() => setProgress(0)} height={2}/>
      <Toaster position="top-right" reverseOrder={false}/>
      <Container display='flex' classes='bg-[#f8f9fa] h-screen '>
        <Sidebar/>
        <Col classes=' p-[24px] ml-[18rem] w-[calc(100%-280px)]'>
          <Sidenav/>
          <main className='laptop:pt-[70px]'>
            {children}
          </main>
        </Col>
      </Container>
    </>
  );
}

export default AdminLayout;