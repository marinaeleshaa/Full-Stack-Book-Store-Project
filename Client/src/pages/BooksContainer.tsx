// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useState } from "react";
import Card from "../components/Card";
import Modal from "../components/Modal";
import type { IBook } from "../Interfaces";
import { IoChevronDown } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/Store";
import {
  AddBookAction,
  DeleteBookAction,
  GetAllBooksAction,
  UpdateBookAction,
} from "../redux/slices/BooksSlice";
import { useTranslation } from "react-i18next";

const BooksContainer = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentBook, setCurrentBook] = useState<IBook | null>(null);
  const [category, setCategory] = useState({ name: "category", value: "all" });
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLogin } = useSelector((state: RootState) => state.user);
  const { t } = useTranslation();
  // console.log(user);
  // console.log(user?.role);

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "action", label: "Action" },
    { value: "drama", label: "Drama" },
    { value: "comedy", label: "Comedy" },
    { value: "romance", label: "Romance" },
    { value: "horror", label: "Horror" },
    { value: "sci-fi", label: "Sci-Fi" },
  ];

  const dispatch = useDispatch<AppDispatch>();
  const { books, searchText } = useSelector((state: RootState) => state.books);

  useEffect(() => {
    dispatch(
      GetAllBooksAction({
        category,
        searchText,
      })
    );
  }, [category, searchText, dispatch, currentBook]);

  const handleAddModal = () => {
    setCurrentBook(null);
    setIsOpen(true);
  };

  const handleEditModal = (
    book: IBook,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    setCurrentBook(book);
    setIsOpen(true);
  };

  const handleSubmit = (data: IBook) => {
    if (currentBook) {
      // UpdateBook(data).then((book) => setCurrentBook(book));
      dispatch(UpdateBookAction(data));
    } else {
      // addBook(data).then((book) => setBooks((prev) => [...prev, book]));
      dispatch(AddBookAction(data));
    }
  };

  const handleDelete = (bookId: string) => {
    // deleteBook(bookId).then(() => {
    //   setBooks((prev) => prev.filter((b) => b._id !== bookId));
    // });
    dispatch(DeleteBookAction(bookId));
  };
  const { lang } = useSelector((state: RootState) => state.language);

  const dirForHeader = lang === "en" ? "ltr" : "rtl";

  return (
    <div
      className="container max-w-7xl mx-auto flex flex-col px-4 py-8 "
      dir={dirForHeader}
    >
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 justify-between mb-10">
        {/* Page Title */}
        <div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-cyan-600 to-slate-800">
            {t("Book Collection")}
          </h1>
          <div className="flex items-center space-x-2 mt-2">
            <div className="h-1 w-12 bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-full"></div>
            <div className="h-1 w-6 bg-gradient-to-r from-cyan-500 to-slate-600 rounded-full"></div>
          </div>
        </div>

        {/* Controls Group */}
        <div className="flex items-center gap-3">
          {/* Custom Dropdown */}
          <div className="relative flex-1 sm:flex-initial sm:min-w-[200px]">
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="w-full flex justify-between items-center px-5 py-3 rounded-xl font-semibold bg-white border-2 border-indigo-200 hover:border-cyan-400 shadow-md hover:shadow-lg hover:shadow-cyan-300/30 hover:scale-[1.02] transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-300/50"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-cyan-600 to-slate-800 text-sm">
                {t(
                  `${categories.find((c) => c.value === category.value)?.label}`
                )}
              </span>
              <IoChevronDown
                className={`text-lg text-cyan-600 transition-transform duration-300 ${
                  menuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {menuOpen && (
              <ul className="absolute z-20 mt-2 w-full bg-white border-2 border-indigo-200 rounded-xl shadow-xl overflow-hidden">
                {categories.map((cat) => (
                  <li
                    key={cat.value}
                    onClick={() => {
                      setCategory({ name: "category", value: cat.value });
                      setMenuOpen(false);
                    }}
                    className={`px-4 py-3 cursor-pointer transition-all duration-200 text-sm font-medium
                      ${
                        category.value === cat.value
                          ? "bg-gradient-to-r from-indigo-600 via-cyan-600 to-slate-800 text-white"
                          : "text-slate-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-cyan-50"
                      }`}
                  >
                    {t(`${cat.label}`)}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Add Book Button */}
          {isLogin && (
            <button
              type="button"
              className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-bl from-indigo-600 via-cyan-600 to-slate-800 border border-transparent hover:shadow-xl hover:shadow-cyan-500/30 hover:scale-[1.02] transition-all duration-300 whitespace-nowrap"
              onClick={handleAddModal}
            >
              <span className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span>{t("Add Book")}</span>
              </span>
            </button>
          )}
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onCloseModal={() => setIsOpen(false)}
        title={currentBook ? "Edit Book" : "Add Book"}
        buttonText={currentBook ? "Update" : "Add"}
        onSubmit={handleSubmit}
        initialData={currentBook || undefined}
      />

      {/* Books Grid */}
      <div className="relative bg-gradient-to-br from-white to-slate-50/50 rounded-2xl shadow-lg border border-indigo-100 p-8 min-h-[400px]">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 via-cyan-500 to-slate-800 rounded-t-2xl"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books &&
            books.map((book) => (
              <Card
                key={book._id}
                book={book}
                handleDelete={handleDelete}
                handleEdit={handleEditModal}
              />
            ))}
        </div>

        {/* Empty State */}
        {!books.length && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <svg
              className="w-24 h-24 text-slate-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-cyan-600 to-slate-800">
              No Books Found
            </p>
            <p className="text-slate-500 text-sm mt-2">
              Try selecting a different category
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BooksContainer;
