import { NavLink } from "react-router-dom";
import { IoPricetagOutline } from "react-icons/io5";
import { HiUser, HiUsers, } from "react-icons/hi";
import { MdOutlineSettings } from "react-icons/md";
import { FaRegBell, FaRegFolder, FaRegStar } from "react-icons/fa";
import { CiHome } from "react-icons/ci";

const Sidenav = ({ open, toggleSidebar }) => {

    const handleNavLinkClick = () => {
        if (window.innerWidth <= 912) {
        // Check if screen width is less than or equal to 768px (adjust as needed)
        toggleSidebar();
        }
    };

    const navlinks = [
      {
          name: "Overview",
          path: "/overview",
          icon: <CiHome size={20} />,
      },
      {
          name: "Investors",
          path: "/investors",
          icon: <HiUsers size={20} />,
      },
      {
          name: "Blog",
          path: "/blog",
          icon: <FaRegFolder size={20} />,
      },
      {
          name: "Subscribers",
          path: "/subscribers",
          icon: <HiUser size={20} />,
      },
      {
          name: "Career",
          path: "/career",
          icon: <FaRegStar size={20} />,
      },
      {
          name: "Application",
          path: "/application",
          icon: <IoPricetagOutline size={20} />,
      },
      {
          name: "Team",
          path: "/team",
          icon: <FaRegStar size={20} />,
      },
    ]
  return (
    <div
      className={`!h-screen ease-in-out ${
        open ? "w-72 md:w-64 lg:w-64" : "hidden lg:block w-16"
      } bg-[#8d0a1f] p-3 relative z-50 text-white`}
    >
      
      <div
          className={`pt-16 flex flex-col gap-4 relative ${
          open ? "h-[90vh] overflow-y-scroll scrollbar-hide" : "h-auto"
          }`}
      >
          {navlinks.map((link, index) => (
            <NavLink
            key={index}
            to={link.path}
            onClick={handleNavLinkClick}
            className={({ isActive }) =>
                isActive
                ? "bg-white text-[#8d0a1f] font-medium flex items-center text-sm gap-3 p-2 rounded-md group"
                : "flex items-center text-sm gap-3 font-medium p-2 hover:bg-primary/10 rounded-md group"
            }
            >
              <div>
                  {link.icon}
              </div>
              <h2
                  className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                  style={{
                  transitionDelay: "300ms",
                  }}
              >
                  {link.name}
              </h2>
              <h2
                  className={`${
                  open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit z-10 text-black`}
              >
                  {link.name}
              </h2>
            </NavLink>
          ))}
      </div>
    </div>
  );
};

export default Sidenav;