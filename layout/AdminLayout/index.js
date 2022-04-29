import {Toaster} from "react-hot-toast";
import LoadingBar from "react-top-loading-bar";

import {AdminSidebar} from "../../components/Navigation";
import Navbar from "./Navbar";
import {useUIController} from "../../context/UIControllerContext";

const AdminLayout = ({children}) => {
  const {progress, setProgress} = useUIController();
  return (
    <div className='flex bg-[#f8f9fa] p-4 h-screen'>
      <LoadingBar color="#000000" progress={progress} onLoaderFinished={() => setProgress(0)} height={2}/>
      <Toaster position="top-right" reverseOrder={false}/>
      <AdminSidebar/>
      <div className='w-full px-2 ipad:px-8 !pb-4'>
        <Navbar/>
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;