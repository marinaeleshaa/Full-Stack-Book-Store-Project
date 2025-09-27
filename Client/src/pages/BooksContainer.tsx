import { useEffect, useState, type ChangeEvent } from "react";
import Card from "../components/Card";
import Modal from "../components/Modal";
import type { IBook } from "../Interfaces";
import { addBook, deleteBook, getAllBooks, UpdateBook } from "../handlers";
import { IoChevronDown } from "react-icons/io5";

const BooksContainer = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [books, setBooks] = useState<IBook[]>([]);
  const [currentBook, setCurrentBook] = useState<IBook | null>(null);
  const [category, setCategory] = useState({ name: "category", value: "all" });

  useEffect(() => {
    getAllBooks(category).then(setBooks);
  }, [currentBook, category]);

  // open modal for add
  const handleAddModal = () => {
    setCurrentBook(null);
    setIsOpen(true);
  };

  // open modal for edit
  const handleEditModal = (
    book: IBook,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    setCurrentBook(book);
    setIsOpen(true);
  };

  const handleSubmit = (data: IBook) => {
    // console.log(data);
    if (currentBook) {
      // Update existing book
      UpdateBook(data).then((book) => {
        console.log(book);
        setCurrentBook(book);
      });

      // UpdateBook(data).then((book) => setCurrentBook(book));
    } else {
      // Add new book
      addBook(data).then((book) => setBooks((prev) => [...prev, book]));
    }
    // setIsOpen(false);
    // setCurrentBook(null);
  };

  const handleDelete = (bookId: string) => {
    deleteBook(bookId).then(() => {
      setBooks((prev) => prev.filter((b) => b._id !== bookId));
    });
  };
  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCategory({ name, value });
  };

  console.log(category);

  return (
    <div className="container max-w-6xl mx-auto flex flex-col px-4">
      <div className="flex items-center space-x-3 justify-end mt-10">
        <div className="relative">
          <select
            name="category"
            value={category.value}
            onChange={handleCategoryChange}
            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400/50 transition-all appearance-none pr-10"
            required
          >
            <option
              value="all"
              className="bg-gray-900 text-white py-2 px-4  hover:text-violet-200 transition-colors"
            >
              All
            </option>
            <option
              value="action"
              className="bg-gray-900 text-white py-2 px-4  hover:text-violet-200 transition-colors"
            >
              Action
            </option>
            <option
              value="drama"
              className="bg-gray-900 text-white py-2 px-4  hover:text-violet-200 transition-colors"
            >
              Drama
            </option>
            <option
              value="comedy"
              className="bg-gray-900 text-white py-2 px-4  hover:text-violet-200 transition-colors"
            >
              Comedy
            </option>
            <option
              value="romance"
              className="bg-gray-900 text-white py-2 px-4  hover:text-violet-200 transition-colors"
            >
              Romance
            </option>
            <option
              value="horror"
              className="bg-gray-900 text-white py-2 px-4  hover:text-violet-200 transition-colors"
            >
              Horror
            </option>
            <option
              value="sci-fi"
              className="bg-gray-900 text-white py-2 px-4  hover:text-violet-200 transition-colors"
            >
              Sci-Fi
            </option>
          </select>

          {/* Custom React Icon Arrow */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            {/* <ChevronDownIcon className="h-5 w-5 text-white/60" /> */}
            {/* Alternative with react-icons: */}
            <IoChevronDown className="text-xl text-white/60" />
          </div>
        </div>

        <button
          type="button"
          className="p-4  self-end rounded-2xl font-semibold text-white bg-gradient-to-r from-violet-500/20 to-indigo-500/20 backdrop-blur-md border border-violet-300/30 hover:border-violet-300/50 hover:bg-gradient-to-r hover:from-violet-500/30 hover:to-indigo-500/30 shadow-2xl hover:shadow-violet-500/20 hover:scale-105 transition-all duration-300 ease-in-out"
          onClick={handleAddModal}
        >
          Add New Book
        </button>
      </div>

      <Modal
        isOpen={isOpen}
        onCloseModal={() => setIsOpen(false)}
        title={currentBook ? "Edit Book" : "Add Book"}
        buttonText={currentBook ? "Update" : "Add"}
        onSubmit={handleSubmit}
        initialData={currentBook || undefined}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 my-10 bg-gradient-to-br from-white/5 via-blue-500/5 to-purple-500/10 backdrop-blur-sm border border-blue-300/20 hover:border-purple-300/30 shadow-2xl hover:shadow-purple-500/10 rounded-2xl p-10 transition-all duration-500 relative overflow-hidden">
        {/* Subtle animated accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400/40 via-purple-400/40 to-indigo-400/40 opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-purple-400/10 to-blue-400/10 rounded-full blur-2xl"></div>

        {books.map((book) => (
          <Card
            key={book._id}
            book={book}
            handleDelete={handleDelete}
            handleEdit={handleEditModal}
          />
        ))}
      </div>
    </div>
  );
};

export default BooksContainer;
