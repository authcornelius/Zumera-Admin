import { Outlet, useNavigate } from "react-router-dom";
import Sidenav from "./Sidenav";
import { useState } from "react";
import Cookies from "js-cookie";
import Topnav from "./Topnav";

const ProtectedRoute = () => {
  const [open, setOpen] = useState(true);
  const [overlayVisible, setOverlayVisible] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Change initial state based on authentication logic


  const toggleSidebar = () => {
    setOpen(!open);
    setOverlayVisible(!overlayVisible);
  };

  return (
    <div className="w-full flex bg-[#f8f9fc] text-[#1E1E1E] h-screen">   
      <Sidenav open={open} toggleSidebar={toggleSidebar} />
      {overlayVisible && <div className="overlay fixed inset-0 bg-purple-100/30 z-20 lg:hidden" onClick={toggleSidebar}></div>}
      <div className={`absolute top-0 ${open ? 'left-0 lg:left-64' : 'left-0 lg:left-16'} right-0 bottom-0 overflow-auto`}>
        <Topnav toggleSidebar={toggleSidebar} />
        <div className='p-2 md:p-3 lg:p-5'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProtectedRoute;
