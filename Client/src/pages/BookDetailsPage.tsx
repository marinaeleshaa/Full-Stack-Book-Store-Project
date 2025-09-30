import { useParams } from "react-router-dom";
import type { IBook } from "../Interfaces";
import { useEffect, useState } from "react";
import { GetBookById } from "../handlers/BookApiHandler";

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-3xl p-12 border border-purple-500/20 shadow-2xl">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
            <div className="text-purple-200 text-lg font-medium">
              Loading your book...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-3xl p-12 border border-red-500/20 shadow-2xl">
          <div className="flex flex-col items-center space-y-4">
            <svg
              className="w-16 h-16 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="text-red-200 text-xl font-semibold">
              Book not found
            </div>
            <p className="text-slate-400 text-sm">
              The book you're looking for doesn't exist
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Safe discount calculation
  const discountPercent =
    book.oldPrice && book.discountedPrice
      ? (
          ((book.oldPrice - book.discountedPrice) / book.oldPrice) *
          100
        ).toFixed(0)
      : null;

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* New horizontal structure with reversed layout */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-indigo-100 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500">
          
          <div className="flex flex-col lg:flex-row">
            
            {/* Image Section - Right Side */}
            <div className="relative lg:w-80 h-96 lg:h-auto overflow-hidden flex-shrink-0 group">
              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-bl from-indigo-600/10 via-transparent to-cyan-600/10 z-10"></div>
              
              <img
                src={book?.Url}
                alt={book?.title || "Book cover"}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              
              {/* Corner decorations */}
              <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-cyan-400/60 z-20"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-cyan-400/60 z-20"></div>
              
              {/* Vertical gradient accent */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-600 via-cyan-500 to-slate-800 z-20"></div>
            </div>

            {/* Content Section - Left Side */}
            <div className="flex-1 p-8 lg:p-10 flex flex-col justify-between bg-gradient-to-br from-white to-slate-50/30">
              
              {/* Top Section - Title & Description */}
              <div className="space-y-6">
                
                {/* Title with underline accent */}
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-cyan-600 to-slate-800 leading-tight mb-3">
                    {book?.title}
                  </h1>
                  <div className="flex items-center space-x-2">
                    <div className="h-1 w-16 bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-full"></div>
                    <div className="h-1 w-8 bg-gradient-to-r from-cyan-500 to-slate-600 rounded-full"></div>
                  </div>
                </div>

                {/* Description */}
                <div className="relative pl-4 border-l-2 border-indigo-200">
                  <p className="text-slate-600 text-base leading-relaxed line-clamp-4">
                    {book?.description ?? "No description available"}
                  </p>
                </div>

                {/* Status badges */}
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-indigo-50 to-cyan-50 border border-indigo-200 rounded-lg">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></div>
                    <span className="text-indigo-700 font-semibold text-xs">Available Now</span>
                  </div>
                  <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-cyan-50 to-slate-50 border border-cyan-200 rounded-lg">
                    <svg className="w-3 h-3 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-cyan-700 font-semibold text-xs">Fast Delivery</span>
                  </div>
                </div>
              </div>

              {/* Bottom Section - Price & Actions */}
              <div className="space-y-5 mt-8">
                
                {/* Price Section */}
                <div className="bg-gradient-to-br from-indigo-600 via-cyan-600 to-slate-800 rounded-xl p-5 relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                  
                  <div className="relative flex items-end justify-between">
                    <div>
                      <p className="text-cyan-100 text-xs font-bold uppercase tracking-wider mb-1">Special Price</p>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-4xl font-black text-white">
                          ${book?.discountedPrice}
                        </span>
                        {book?.oldPrice && (
                          <div className="flex flex-col">
                            <span className="text-base line-through text-white/60">
                              ${book.oldPrice}
                            </span>
                          </div>
                        )}
                      </div>
                      {book?.oldPrice && (
                        <p className="text-cyan-100 text-sm font-semibold mt-1">
                          You save ${(book.oldPrice - (book?.discountedPrice || 0)).toFixed(2)}
                        </p>
                      )}
                    </div>
                    
                    {discountPercent && (
                      <div className="px-4 py-2 bg-white text-cyan-800 text-sm font-black rounded-full shadow-lg">
                        {discountPercent}% OFF
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons - Side by side */}
                <div className="grid grid-cols-2 gap-3">
                  <button className="col-span-2 px-6 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 via-cyan-600 to-slate-800 hover:shadow-xl hover:shadow-cyan-500/30 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span>Start Reading</span>
                  </button>

                  <button className="px-4 py-3.5 rounded-xl font-semibold bg-white border-2 border-indigo-300 hover:border-cyan-400 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2 group">
                    <svg className="w-4 h-4 text-indigo-600 group-hover:text-cyan-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600 text-sm">
                      Wishlist
                    </span>
                  </button>

                  <button className="px-4 py-3.5 rounded-xl font-semibold bg-gradient-to-r from-slate-50 to-cyan-50 border border-slate-300 hover:border-cyan-400 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2">
                    <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    <span className="text-slate-700 text-sm font-semibold">Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;