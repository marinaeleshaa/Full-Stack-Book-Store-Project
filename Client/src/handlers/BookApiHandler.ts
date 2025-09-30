import axios from "axios";
import type { IBook } from "../Interfaces";

// get all books
export async function getAllBooks(query: {
  name: string;
  value: string;
}): Promise<IBook[]> {
  const { name, value } = query;
  const url = value !== "all" ? `/api/books?${name}=${value}` : `/api/books`;
  const response = await axios.get(url);
  return response.data as IBook[];
}

// add book
export async function addBook(body: IBook): Promise<IBook> {
  const token = localStorage.getItem("userToken");
  const res = await axios.post("/api/books/add", body, {
    headers: { authorization: `Bearer ${token}` },
  });
  return res.data as IBook;
}

// delete book
export async function deleteBook(bookId: string): Promise<IBook> {
  const token = localStorage.getItem("userToken");
  const res = await axios.delete(`/api/books/delete/${bookId}`, {
    headers: { authorization: `Bearer ${token}` },
  });
  return res.data as IBook;
}

// update book
export async function UpdateBook(book: IBook): Promise<IBook> {
  const token = localStorage.getItem("userToken");
  const res = await axios.put(`/api/books/update/${book._id}`, book, {
    headers: { authorization: `Bearer ${token}` },
  });
  return res.data as IBook;
}

// get book by id
export async function GetBookById(bookId: string): Promise<IBook> {
  const res = await axios.get(`/api/books/${bookId}`);
  return res.data as IBook;
}
