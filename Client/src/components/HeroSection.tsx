import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function HeroSection({ title }: { title: string }) {
  const { t } = useTranslation();
  return (
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-cyan-50/30 to-indigo-50/40 ">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating gradient orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-indigo-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tl from-cyan-400/20 to-slate-400/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-300/10 via-cyan-300/10 to-slate-300/10 rounded-full blur-3xl"></div>

        {/* Floating book icons */}
        <div
          className="absolute top-32 right-1/4 opacity-10 animate-bounce"
          style={{ animationDuration: "3s", animationDelay: "0.5s" }}
        >
          <svg
            className="w-16 h-16 text-indigo-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
          </svg>
        </div>
        <div
          className="absolute bottom-40 left-1/4 opacity-10 animate-bounce"
          style={{ animationDuration: "4s", animationDelay: "1.5s" }}
        >
          <svg
            className="w-20 h-20 text-cyan-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
          </svg>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center ">
        {/* Main title with staggered animation */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black my-10 leading-tight">
          <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-cyan-600 to-slate-800 animate-fadeInUp ">
            {t(`${title}`)}
          </span>
        </h1>

        {/* Decorative line */}
        <div className="flex items-center justify-center space-x-3 mb-8">
          <div className="h-1 w-20 bg-gradient-to-r from-transparent via-indigo-500 to-cyan-500 rounded-full"></div>
          <div className="w-3 h-3 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-full animate-pulse"></div>
          <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 via-slate-500 to-transparent rounded-full"></div>
        </div>

        {/* Description */}
        <p
          className="text-lg md:text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed animate-fadeInUp"
          style={{ animationDelay: "0.2s" }}
        >
          {t(
            "Immerse yourself in a world of stories, knowledge, and imagination. Explore thousands of books across every genre and discover your next favorite read."
          )}
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeInUp"
          style={{ animationDelay: "0.4s" }}
        >
          <Link
            to={"/books"}
            type="button"
            className="group relative px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-indigo-600 via-cyan-600 to-slate-800 shadow-2xl shadow-cyan-800/30 hover:shadow-indigo-500/50 hover:scale-105 transition-all duration-500 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <span className="relative flex items-center space-x-2">
              <span>{t("Explore Books")}</span>
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          </Link>

          <button className="group px-8 py-4 rounded-2xl font-bold bg-white border-2 border-indigo-300 hover:border-cyan-400 shadow-lg hover:shadow-xl hover:shadow-slate-300/50 hover:scale-105 transition-all duration-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/0 via-cyan-50/50 to-indigo-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-cyan-600 to-slate-800 flex items-center space-x-2">
              <svg
                className="w-5 h-5 text-cyan-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{t("Watch Demo")}</span>
            </span>
          </button>
        </div>

        {/* Stats or features */}
        <div
          className="grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto animate-fadeInUp"
          style={{ animationDelay: "0.6s" }}
        >
          <div className="group">
            <div className="p-6 bg-white/60 backdrop-blur-md border border-indigo-200/50 rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-cyan-600 mb-2">
                10K+
              </div>
              <div className="text-sm text-slate-600 font-semibold">
                {t('Books Available')}
              </div>
            </div>
          </div>

          <div className="group">
            <div className="p-6 bg-white/60 backdrop-blur-md border border-cyan-200/50 rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-600 to-slate-600 mb-2">
                50K+
              </div>
              <div className="text-sm text-slate-600 font-semibold">
                {t('Happy Readers')}
              </div>
            </div>
          </div>

          <div className="group">
            <div className="p-6 bg-white/60 backdrop-blur-md border border-slate-200/50 rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-600 to-indigo-600 mb-2">
                4.9★
              </div>
              <div className="text-sm text-slate-600 font-semibold">
                {t('Average Rating')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-cyan-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default HeroSection;
