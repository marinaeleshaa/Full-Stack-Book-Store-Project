import { CiEdit } from "react-icons/ci";
import { FaTrashCan } from "react-icons/fa6";
import type { IBook } from "../Interfaces";
import { Link } from "react-router-dom";
import { BiSolidCategory } from "react-icons/bi";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/Store";

interface IProps {
  book: IBook;
  handleDelete: (bookId: string) => void;
  handleEdit: (book: IBook, e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Card = ({ book, handleDelete, handleEdit }: IProps) => {
  const { isLogin, user } = useSelector((state: RootState) => state.user);

  return (
    <Link to={`/bookDetails/${book._id}`}>
      {/* Simple Clean Card */}
      <div className="relative cursor-pointer w-full h-[480px] rounded-xl group/card transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 shadow-lg   hover:shadow-xl hover:shadow-cyan-800/50 overflow-hidden border border-white/20 hover:border-white/40 ">
        {/* Image Section */}
        <div className="relative h-64 overflow-hidden rounded-t-none ">
          <img
            src={book.Url}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover/card:scale-110"
          />

          {/* Action Buttons */}
          {isLogin &&
            (user?.role === "admin" || book.createdBy._id === user?._id) && (
              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                {/* Edit Button */}
                <button
                  className="p-2 rounded-lg bg-white/90 text-gray-800 hover:bg-white hover:scale-110 transition-all duration-200 shadow-md"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleEdit(book, e);
                  }}
                >
                  <CiEdit className="text-lg" />
                </button>

                {/* Delete Button */}
                <button
                  className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 hover:scale-110 transition-all duration-200 shadow-md"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (book._id) {
                      handleDelete(book._id);
                    }
                  }}
                >
                  <FaTrashCan className="text-sm" />
                </button>
              </div>
            )}
        </div>

        {/* Content Section */}
        <div className="p-5 space-y-3   rounded-b-2xl">
          {/* Title */}
          <h2 className="text-xl font-bold text-transparent bg-clip-text line-clamp-1 break-words bg-gradient-to-t from-indigo-600 via-cyan-600 to-slate-800 backdrop-blur-sm">
            {book.title}
          </h2>
          {/* Description */}
          <p className="text-sm text-slate-500 line-clamp-1 break-words leading-relaxed">
            {book.description}
          </p>
          {/* category */}

          <div className="flex items-center gap-2.5 pt-1">
            <span className="p-1 rounded-xl bg-gradient-to-r from-indigo-600 via-cyan-600 to-slate-800 shadow-md group-hover/card:shadow-lg transition-shadow duration-300">
              <BiSolidCategory className="text-white text-base" />
            </span>
            <span className="font-semibold  text-cyan-600  text-sm">
              {book.category}
            </span>
          </div>
          <hr />

          {/* Pricing */}
          <div className="flex items-center justify-between pt-2">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-t from-indigo-600 via-cyan-600 to-slate-800 ">
                  ${book.discountedPrice}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  ${book.oldPrice}
                </span>
              </div>
            </div>

            <span className="px-3 py-2 text-xs font-semibold text-white rounded-xl  bg-gradient-to-tl from-indigo-600 via-cyan-600 to-slate-800">
              SAVE $
              {((book.oldPrice ?? 0) - (book.discountedPrice ?? 0)).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
