import { CiEdit } from "react-icons/ci";
import { FaTrashCan } from "react-icons/fa6";
import type { IBook } from "../Interfaces";
import { Link } from "react-router-dom";
import { BiSolidCategory } from "react-icons/bi";

interface IProps {
  book: IBook;
  handleDelete: (bookId: string) => void;
  handleEdit: (book: IBook, e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Card = ({ book, handleDelete, handleEdit }: IProps) => {
  return (
    <Link to={`/bookDetails/${book._id}`}>
      {/* Simple Clean Card */}
      <div className="relative cursor-pointer w-full h-[440px] rounded-xl group/card transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-xl overflow-hidden border border-white/20 hover:border-white/40">
        {/* Image Section */}
        <div className="relative h-64 overflow-hidden rounded-t-xl">
          <img
            src={book.Url}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover/card:scale-110"
          />

          {/* Action Buttons */}
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
        </div>

        {/* Content Section */}
        <div className="p-5 space-y-3 bg-gradient-to-b from-white/5 to-white/10 backdrop-blur-sm ">
          {/* Title */}
          <h2 className="text-xl font-bold text-white line-clamp-1 break-words">
            {book.title}
          </h2>

          {/* Description */}
          <p className="text-sm text-gray-300 line-clamp-1 break-words leading-relaxed">
            {book.description}
          </p>
          <p className="text-sm text-gray-300 line-clamp-1 break-words leading-relaxed flex items-center gap-2">
            <BiSolidCategory />
            {book.category}
          </p>

          {/* Pricing */}
          <div className="flex items-center justify-between pt-2">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-white">
                  ${book.discountedPrice}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  ${book.oldPrice}
                </span>
              </div>
            </div>

            <span className="px-2 py-1 text-xs font-semibold bg-green-500/20 text-green-300 rounded border border-green-500/30">
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
