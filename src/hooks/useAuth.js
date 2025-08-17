import { useSelector } from "react-redux";
import { selectCurrentToken } from "../feachers/auth/authSlice";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isManager = false;
  let isAdmin = false;
  let status = "Employee";

  if (token) {
    const decoded = jwtDecode(token);
    console.log(decoded.UserInfo);
    const { username, roles } = decoded.UserInfo;
    console.log(typeof roles);

    isManager = roles.includes("Manager");
    isAdmin = roles.includes("Admin");

    if (isManager) status = "Manager";
    if (isAdmin) status = "Admin";

    return { username, roles, isManager, isAdmin, status };
  }

  return { username: "", roles: [], isManager, isAdmin, status };
};

export default useAuth;
