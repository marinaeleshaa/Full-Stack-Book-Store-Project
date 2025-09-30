import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/Store";

interface ProtectedRouteProps {
  redirectPath: string;
  children: ReactNode;
  isForAdmin?: boolean;
  isMustLogin?: boolean;
}

export default function ProtectedRoute({
  redirectPath,
  children,
  isForAdmin = false,
  isMustLogin = false,
}: ProtectedRouteProps) {
  const { isLogin, user } = useSelector((state: RootState) => state.user);

  if (isMustLogin && !isLogin) {
    return <Navigate to={redirectPath} replace />;
  }

  if (isForAdmin && user?.role !== "admin") {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
}
