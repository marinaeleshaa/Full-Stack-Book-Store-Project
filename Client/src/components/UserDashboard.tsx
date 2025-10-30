import { useEffect, useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  GetUsersAction,
  UpdateUserRoleAction,
} from "../redux/slices/UserSlice";
import type { AppDispatch, RootState } from "../redux/Store";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(GetUsersAction());
  }, [dispatch]);

  const { users, user: loginUser } = useSelector(
    (state: RootState) => state.user
  );

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleRoleChange = (userId: string, newRole: "user" | "admin") => {
    dispatch(UpdateUserRoleAction({ id: userId, role: newRole }));
    setOpenDropdown(null);
  };

  const toggleDropdown = (userId: string) => {
    setOpenDropdown(openDropdown === userId ? null : userId);
  };

  const { lang } = useSelector((state: RootState) => state.language);
  const dirForHeader = lang === "en" ? "ltr" : "rtl";

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-indigo-50/40 py-12 px-4"
      dir={dirForHeader}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-cyan-600 to-slate-800 p-2">
                {t("Users Dashboard")}
              </h1>
              <div className="flex items-center space-x-2 mt-3">
                <div className="h-1 w-16 bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-full"></div>
                <div className="h-1 w-8 bg-gradient-to-r from-cyan-500 to-slate-600 rounded-full"></div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4">
              <div className="px-5 py-3 bg-white border border-indigo-200 rounded-xl shadow-md">
                <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600">
                  {users.length}
                </div>
                <div className="text-xs text-slate-600 font-semibold">
                  {t("Total Users")}
                </div>
              </div>
              <div className="px-5 py-3 bg-white border border-cyan-200 rounded-xl shadow-md">
                <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-slate-600">
                  {users.filter((u) => u.role === "admin").length}
                </div>
                <div className="text-xs text-slate-600 font-semibold">
                  {t("Admins")}
                </div>
              </div>
            </div>
          </div>
          <p className="text-slate-600">
            {t("Manage user accounts and permissions")}
          </p>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-xl border border-indigo-100 ">
          <div className="h-1.5 bg-gradient-to-r from-indigo-600 via-cyan-500 to-slate-800"></div>

          {/* Table Header */}
          <div className="bg-gradient-to-r from-slate-50 to-cyan-50/50 px-8 py-4 border-b border-slate-200">
            <div className="grid grid-cols-12 gap-4 font-semibold text-sm text-slate-700 uppercase tracking-wider">
              <div className="col-span-1">#</div>
              <div className="col-span-4">{t("Name")}</div>
              <div className="col-span-4">{t("Email")}</div>
              <div className="col-span-3 text-center">{t("Role")}</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-slate-100">
            {users.map((user, index) => (
              <div
                key={user._id}
                className="px-8 py-5 hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-cyan-50/30 transition-all duration-300 group"
              >
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* Index */}
                  <div className="col-span-1">
                    <span className="text-slate-500 font-semibold">
                      {index + 1}
                    </span>
                  </div>

                  {/* Name */}
                  <div className="col-span-4 flex items-center ">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold shadow-md">
                      {user.username.charAt(0)}
                    </div>
                    <span
                      className={`font-semibold ${lang === "en" ? "ml-4" : "mr-4"} text-slate-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-cyan-600 transition-all`}
                    >
                      {user.username}
                    </span>
                  </div>

                  {/* Email */}
                  <div className="col-span-4">
                    <span className="text-slate-600 text-sm">{user.email}</span>
                  </div>

                  {/* Role */}
                  <div className="col-span-3 flex justify-center">
                    {loginUser?._id === user._id ? (
                      <p className="text-sm font-semibold text-slate-600">
                        {t("Current User")}
                      </p>
                    ) : (
                      <div className="relative w-32 z-10">
                        <button
                          onClick={() => toggleDropdown(user._id)}
                          className={`w-full flex items-center justify-between px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                            user.role === "admin"
                              ? "bg-gradient-to-r from-indigo-600 via-cyan-600 to-slate-800 text-white shadow-md hover:shadow-lg hover:shadow-cyan-500/30"
                              : "bg-white border-2 border-indigo-200 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600 hover:border-cyan-400 shadow-sm hover:shadow-md"
                          }`}
                        >
                          <span className="capitalize">
                            {t(user.role === "admin" ? "Admin" : "User")}
                          </span>
                          <IoChevronDown
                            className={`text-base transition-transform duration-300 ${
                              openDropdown === user._id ? "rotate-180" : ""
                            } ${
                              user.role === "admin"
                                ? "text-white"
                                : "text-cyan-600"
                            }`}
                          />
                        </button>

                        {/* Dropdown Menu */}
                        {openDropdown === user._id && (
                          <div className="absolute z-50 mt-2 w-full bg-white border-2 border-indigo-200 rounded-xl shadow-xl overflow-hidden animate-fadeIn">
                            <button
                              onClick={() => handleRoleChange(user._id, "user")}
                              className={`w-full px-4 py-3 text-left text-sm font-semibold transition-all duration-200 ${
                                user.role === "user"
                                  ? "bg-gradient-to-r from-indigo-600 via-cyan-600 to-slate-800 text-white"
                                  : "text-slate-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-cyan-50"
                              }`}
                            >
                              {t("User")}
                            </button>
                            <button
                              onClick={() =>
                                handleRoleChange(user._id, "admin")
                              }
                              className={`w-full px-4 py-3 text-left text-sm font-semibold transition-all duration-200 ${
                                user.role === "admin"
                                  ? "bg-gradient-to-r from-indigo-600 via-cyan-600 to-slate-800 text-white"
                                  : "text-slate-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-cyan-50"
                              }`}
                            >
                              {t("Admin")}
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {users.length === 0 && (
            <div className="py-20 text-center">
              <svg
                className="w-16 h-16 text-slate-300 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-cyan-600 to-slate-800">
                {t("No Users Found")}
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default Dashboard;
