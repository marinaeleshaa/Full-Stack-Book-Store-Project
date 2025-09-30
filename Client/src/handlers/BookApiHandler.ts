import axios from "axios";
import type { IBook } from "../Interfaces";

// get all books
// BookApiHandler.ts
// export async function getAllBooks(query: {
//   category: {
//     name: string;
//     value: string;
//   };
//   searchText: {
//     name: string;
//     value: string;
//   };
// }): Promise<IBook[]> {
//   const { name, value } = query;
//   let url = "/api/books";

//   if (value !== "all" && value.trim() !== "") {
//     url += `?${name}=${encodeURIComponent(value)}`;
//   }

//   const response = await axios.get(url);
//   return response.data as IBook[];
// }

export async function getAllBooks(query: {
  category?: { name: string; value: string };
  searchText?: { name: string; value: string };
}): Promise<IBook[]> {
  const params = new URLSearchParams();

  if (query.category && query.category.value !== "all") {
    params.append(query.category.name, query.category.value);
  }

  if (query.searchText && query.searchText.value.trim() !== "") {
    params.append(query.searchText.name, query.searchText.value);
  }

  const url = `/api/books${params.toString() ? "?" + params.toString() : ""}`;
  const response = await axios.get(url);
  return response.data as IBook[];
}

// add book
export async function addBook(body: IBook): Promise<IBook> {
  const token = localStorage.getItem("userToken");
  const res = await axios.post("/api/books/add", body, {
    headers: { authorization: token },
  });
  return res.data as IBook;
}

// delete book
export async function deleteBook(bookId: string): Promise<IBook> {
  const token = localStorage.getItem("userToken");
  const res = await axios.delete(`/api/books/delete/${bookId}`, {
    headers: { authorization: token },
  });
  return res.data as IBook;
}

// update book
export async function UpdateBook(book: IBook): Promise<IBook> {
  const token = localStorage.getItem("userToken");
  const res = await axios.put(`/api/books/update/${book._id}`, book, {
    headers: { authorization: token },
  });
  return res.data as IBook;
}

// get book by id
export async function GetBookById(bookId: string): Promise<IBook> {
  const res = await axios.get(`/api/books/${bookId}`);
  return res.data as IBook;
}
