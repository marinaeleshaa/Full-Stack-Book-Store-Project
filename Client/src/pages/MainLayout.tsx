import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-800 via-blue-900  to-purple-500">
      <Header />
      <Outlet />
    </div>
  );
};

export default MainLayout;
