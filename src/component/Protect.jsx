import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const Protect = ({ children }) => {
  const token = Cookies.get('jwtasset');

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default Protect;
