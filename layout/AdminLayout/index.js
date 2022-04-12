import {AdminSidebar} from "../../components/Sidebar";
import Navbar from "./Navbar";

const AdminLayout = ({children}) => {
    return (
      <div className='flex bg-[#f8f9fa] p-4 h-screen'>
          <AdminSidebar/>
          <div className='w-[85%] px-8'>
              <Navbar/>
              <div className='' >
                  {children}
              </div>
          </div>
      </div>
    );
}

export default AdminLayout;