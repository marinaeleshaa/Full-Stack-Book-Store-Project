import { Book } from "../model/BooksModel.js";

/** @type {import("mongoose").Model} */
const BookModel = Book;

export const CreateBook = async (data) => {
  const myBook = new Book(data);
  return await myBook.save();
};

export const GetAllBooks = async (filter, sort) => {
  let myBooks = await Book.find(filter).populate("createdBy", "username role");
  myBooks = sort ? myBooks.sort(sort) : myBooks;
  return myBooks;
};

export const DeleteBook = async (bookId) => {
  const myBook = await Book.findByIdAndDelete(bookId);
  return myBook;
};

export const EditBook = async (bookId, book) => {
  const myBook = await BookModel.findByIdAndUpdate(
    { _id: bookId },
    { $set: book },
    { new: true }
  );
  return myBook;
};

export const GetBook = async (bookId) => {
  const myBook = await BookModel.findById(bookId);
  return myBook;
};
