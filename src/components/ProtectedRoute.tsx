import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const role = localStorage.getItem("role");
  if (!allowedRoles.includes(role || "")) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;