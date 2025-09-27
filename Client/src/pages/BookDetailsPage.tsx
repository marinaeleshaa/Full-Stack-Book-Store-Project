import { useParams } from "react-router-dom";
import type { IBook } from "../Interfaces";
import { useEffect, useState } from "react";
import { GetBookById } from "../handlers";

const BookDetailsPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState<IBook | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (typeof id === "string") {
      setLoading(true);
      GetBookById(id)
        .then((b) => setBook(b || null))
        .catch((err) => {
          console.error("GetBookById error:", err);
          setBook(null);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          <div className="text-white text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          <div className="text-white text-lg">Book not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/20 hover:shadow-white/5 transition-all duration-500 relative">
          {/* Subtle accent elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-400/30 via-blue-400/30 to-indigo-400/30"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-violet-400/5 to-blue-400/5 rounded-full blur-xl"></div>

          <div className="flex flex-col lg:flex-row">
            {/* Image Section */}
            <div className="relative lg:w-72 h-72 lg:h-auto overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
              <img
                src={book?.Url}
                alt={book?.title || "Book cover"}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Content Section */}
            <div className="flex-1 p-6 lg:p-8 flex flex-col min-h-0 min-w-0 relative z-10">
              <div className="flex-1 space-y-4 min-h-0">
                <div className="space-y-3">
                  <div className="inline-block px-3 py-1 bg-gradient-to-r from-violet-500/20 to-indigo-500/20 text-violet-200 text-xs font-semibold rounded-full shadow-lg border border-violet-400/30 backdrop-blur-sm">
                    Featured Book
                  </div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-white leading-tight">
                    {book?.title}
                  </h1>
                </div>

                <div className="relative min-h-0">
                  <div className="absolute -left-3 top-0 w-0.5 h-16 bg-gradient-to-b from-violet-400/50 to-indigo-400/50 rounded-full"></div>
                  <div className="pl-4 pr-2 w-full min-w-0">
                    <p
                      className="text-white/80 text-base leading-relaxed break-words break-all whitespace-normal line-clamp-3"
                      style={{ overflowWrap: "anywhere" }}
                    >
                      {book?.description ?? "No description available"}
                    </p>
                  </div>
                </div>

                {/* Enhanced Price Section */}
                <div className="bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-indigo-500/10 backdrop-blur-sm rounded-xl border border-violet-300/20 p-4 shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-violet-200 text-sm font-medium">
                      Special Price
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-3xl font-bold bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                        ${book?.discountedPrice}
                      </span>
                      {book?.oldPrice && (
                        <div className="flex flex-col items-end">
                          <span className="line-through text-white/40 text-sm">
                            ${book.oldPrice}
                          </span>
                          <span className="text-xs text-emerald-300 font-medium">
                            Save $
                            {(
                              book.oldPrice - (book?.discountedPrice || 0)
                            ).toFixed(2)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="w-full h-1 bg-gradient-to-r from-violet-400/30 to-indigo-400/30 rounded-full"></div>
                </div>

                {/* Stats badges */}
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-violet-500/10 backdrop-blur-sm rounded-full border border-violet-400/20">
                    <div className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse"></div>
                    <span className="text-violet-200 font-medium text-xs">
                      Popular
                    </span>
                  </div>
                  <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-blue-500/10 backdrop-blur-sm rounded-full border border-blue-400/20">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                    <span className="text-blue-200 font-medium text-xs">
                      Trending
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Section */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6">
                <button className="group relative px-6 py-3 bg-gradient-to-r from-violet-500/20 to-indigo-500/20 text-white font-semibold rounded-xl shadow-xl hover:shadow-violet-500/20 transform hover:-translate-y-0.5 transition-all duration-300 overflow-hidden border border-violet-400/30 hover:border-violet-400/50 backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500/30 to-indigo-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                    <span>Start Reading</span>
                  </span>
                </button>

                <button className="px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/20 text-white/90 font-semibold rounded-xl hover:bg-white/10 hover:border-white/30 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
