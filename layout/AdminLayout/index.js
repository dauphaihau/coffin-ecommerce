import {Toaster} from "react-hot-toast";
import LoadingBar from "react-top-loading-bar";

import {AdminSidebar} from "../../components/Sidebar";
import Navbar from "./Navbar";
import {useUtil} from "../../context/utilContext";

const AdminLayout = ({children}) => {
  const {progress, setProgress} = useUtil();
  return (
    <div className='flex bg-[#f8f9fa] p-4 h-screen'>
      <LoadingBar color="#000000" progress={progress} onLoaderFinished={() => setProgress(0)} height={2}/>
      <Toaster position="top-right" reverseOrder={false}/>
      <AdminSidebar/>
      <div className='w-[85%] px-8'>
        <Navbar/>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;