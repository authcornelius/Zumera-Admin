import { Badge, message } from "antd";
import { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { BiBell } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowUp, IoIosLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/slice/userSlice";
import UserLogo from "/male3-512.webp"
import Logo from '/zumera-logo-WHITE.png'

const Topnav = ({toggleSidebar}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const logoutHandler = async () => {
    try {
      dispatch(logout());
      navigate("/");
      message.success('Logged out successfully');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full bg-[#070B1D] text-white sticky top-0 z-10 shadow-sm">
      <div className="w-[95%] h-16 mx-auto flex justify-between items-center">
        <div className="flex items-center ml-[-10px]">
          <HiMenuAlt3
            size={28}
            className="cursor-pointer text-dark-primary"
            onClick={() => toggleSidebar()}
          />
        </div>

        <div className=' flex justify-center items-center'>
        <div className='flex flex-col items-center '>
          <Link to="/overview">
            <img
              src={Logo}
              alt='logo'
              className={`w-20 ${!open && "hidden"} `}
            />
          </Link>
        </div>
      </div>

        <div className="flex gap-9 items-center">
          <Badge dot>
            <BiBell className="text-[#FFFFFF]" size={22} />
          </Badge>
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-4 focus:outline-none relative"
          >
            <img
              src={UserLogo}
              alt="user"
              className="w-[36px] h-[36px] rounded-full object-cover"
            />
            <div className="flex flex-col items-center">
              <h2 className="font-medium capitalize text-sm">
                {user ? user.firstname + " " + user.lastname : ""}
              </h2>
            </div>
            {dropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </button>

          {dropdownOpen && (
            <div className="z-10 absolute top-12 right-0 mt-2 w-40 bg-white dark:bg-dark-primary border border-gray-200 dark:border-gray-700 rounded shadow-md">
              <span
                className="flex gap-2 items-center px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                onClick={logoutHandler}
              >
                <IoIosLogOut size={18} />
                <span>Logout</span>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topnav;
