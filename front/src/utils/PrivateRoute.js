import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Helper/Context";

const PrivateRoutes = () => {
  const {isLoggedIn} = useContext(AuthContext)

  return isLoggedIn  === true ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;