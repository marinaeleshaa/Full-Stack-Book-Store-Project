// import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/Store";

// interface IUserProfile {
//   name: string;
//   email: string;
//   avatar: string;
//   role: string;
//   joinedDate: string;
//   booksRead: number;
//   favorites: number;
// }

const UserProfile = () => {
  //   const [user] = useState<IUserProfile>({
  //     name: "Alexandra Morgan",
  //     email: "alexandra.morgan@example.com",
  //     avatar:
  //       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  //     role: "Book Enthusiast",
  //     joinedDate: "January 2024",
  //     booksRead: 47,
  //     favorites: 23,
  //   });

  const { user } = useSelector((state: RootState) => state.user);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-indigo-50/40 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Main Profile Card */}
        <div className="relative">
          {/* Background decorative elements */}
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-tl from-cyan-400/20 to-slate-400/20 rounded-full blur-3xl"></div>

          {/* Card Container */}
          <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-indigo-100">
            {/* Top gradient accent */}
            <div className="h-2 bg-gradient-to-r from-indigo-600 via-cyan-500 to-slate-800"></div>

            {/* Cover Section with Pattern */}
            <div className="relative h-48 bg-gradient-to-br from-indigo-600 via-cyan-600 to-slate-800 overflow-hidden">
              {/* Floating decorative elements */}
              <div className="absolute top-6 right-6 w-20 h-20 border-2 border-white/30 rounded-full"></div>
              <div className="absolute bottom-6 left-6 w-16 h-16 border-2 border-white/30 rounded-full"></div>
            </div>

            {/* Profile Content */}
            <div className="relative px-8 pb-8 -mt-[100px]">
              {/* Avatar Section */}
              <div className="flex flex-col md:flex-row items-center md:items-end -mt-10 mb-6 relative z-10">
                <div className="relative group">
                  {/* Avatar with border and shadow */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                    <img
                      src={"userIcon.png"}
                      alt={user?.username}
                      className="relative w-40 h-40 rounded-full border-8 border-white object-cover shadow-2xl group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Online status indicator */}
                  <div className="absolute bottom-4 right-4 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full border-4 border-white shadow-lg">
                    <div className="w-full h-full bg-green-400 rounded-full animate-ping opacity-75"></div>
                  </div>
                </div>

                {/* Name and Role */}
                <div className="md:ml-8 mt-4 md:mt-0 text-center md:text-left flex-1">
                  <h1 className="text-4xl  font-black text-transparent bg-clip-text bg-gradient-to-r from-white/80 via-cyan-600 to-slate-400 mb-2">
                    {user?.username}
                  </h1>
                  <div className="flex items-center justify-center md:justify-start space-x-2 mb-3 ">
                    <span className="px-4 py-1.5 bg-gradient-to-r from-indigo-100 to-cyan-100 border border-indigo-200 rounded-full text-sm font-semibold text-indigo-70 capitalize">
                      {user?.role}
                    </span>
                    <span className="text-slate-500 text-sm">
                      {/* • Joined {user.joinedDate} */}• Joined 23 Jun
                    </span>
                  </div>

                  {/* Email with icon */}
                  <div className="flex items-center justify-center md:justify-start space-x-2 text-slate-600">
                    <svg
                      className="w-5 h-5 text-cyan-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-sm">{user?.email}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 mt-4 md:mt-0">
                  <button className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 via-cyan-600 to-slate-800 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/30 hover:scale-105 transition-all duration-300">
                    Edit Profile
                  </button>
                  {/* <button className="px-6 py-3 rounded-xl font-semibold bg-white border-2 border-indigo-300 hover:border-cyan-400 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600">
                      Settings
                    </span>
                  </button> */}
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                {/* Books Read Card */}
                <div className="group relative overflow-hidden bg-gradient-to-br from-indigo-50 to-cyan-50 border border-indigo-200/50 rounded-2xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-400/10 to-transparent rounded-full blur-2xl"></div>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-3 bg-gradient-to-br from-indigo-600 to-cyan-600 rounded-xl shadow-lg">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                      </div>
                      <svg
                        className="w-6 h-6 text-indigo-300 group-hover:text-indigo-500 transition-colors"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-cyan-600 mb-1">
                      {/* {user.booksRead} */}
                      10
                    </div>
                    <div className="text-sm font-semibold text-slate-600">
                      Books Read
                    </div>
                  </div>
                </div>

                {/* Favorites Card */}
                <div className="group relative overflow-hidden bg-gradient-to-br from-cyan-50 to-slate-50 border border-cyan-200/50 rounded-2xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-400/10 to-transparent rounded-full blur-2xl"></div>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-3 bg-gradient-to-br from-cyan-600 to-slate-600 rounded-xl shadow-lg">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <svg
                        className="w-6 h-6 text-cyan-300 group-hover:text-cyan-500 transition-colors"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-600 to-slate-600 mb-1">
                      {/* {user.favorites} */}
                      16
                    </div>
                    <div className="text-sm font-semibold text-slate-600">
                      Favorites
                    </div>
                  </div>
                </div>

                {/* Achievement Card */}
                <div className="group relative overflow-hidden bg-gradient-to-br from-slate-50 to-indigo-50 border border-slate-200/50 rounded-2xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-slate-400/10 to-transparent rounded-full blur-2xl"></div>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-3 bg-gradient-to-br from-slate-600 to-indigo-600 rounded-xl shadow-lg">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <svg
                        className="w-6 h-6 text-slate-300 group-hover:text-slate-500 transition-colors"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-600 to-indigo-600 mb-1">
                      12
                    </div>
                    <div className="text-sm font-semibold text-slate-600">
                      Achievements
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
                <button className="group flex flex-col items-center p-4 bg-gradient-to-br from-white to-indigo-50/50 border border-indigo-200/50 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <div className="p-3 bg-gradient-to-br from-indigo-100 to-cyan-100 rounded-full mb-2 group-hover:shadow-md transition-shadow">
                    <svg
                      className="w-6 h-6 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-slate-700">
                    Add Book
                  </span>
                </button>

                <button className="group flex flex-col items-center p-4 bg-gradient-to-br from-white to-cyan-50/50 border border-cyan-200/50 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <div className="p-3 bg-gradient-to-br from-cyan-100 to-slate-100 rounded-full mb-2 group-hover:shadow-md transition-shadow">
                    <svg
                      className="w-6 h-6 text-cyan-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-slate-700">
                    My Lists
                  </span>
                </button>

                <button className="group flex flex-col items-center p-4 bg-gradient-to-br from-white to-slate-50/50 border border-slate-200/50 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <div className="p-3 bg-gradient-to-br from-slate-100 to-indigo-100 rounded-full mb-2 group-hover:shadow-md transition-shadow">
                    <svg
                      className="w-6 h-6 text-slate-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-slate-700">
                    Statistics
                  </span>
                </button>

                <button className="group flex flex-col items-center p-4 bg-gradient-to-br from-white to-indigo-50/50 border border-indigo-200/50 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <div className="p-3 bg-gradient-to-br from-indigo-100 to-cyan-100 rounded-full mb-2 group-hover:shadow-md transition-shadow">
                    <svg
                      className="w-6 h-6 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-slate-700">
                    Share
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
