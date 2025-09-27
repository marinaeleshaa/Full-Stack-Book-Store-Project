import axios from "axios";
import type { IBook } from "../Interfaces";

export async function getAllBooks(query: {
  name: string;
  value: string;
}): Promise<IBook[]> {
  const { name, value } = query;
  let response;
  if (value !== "all") {
    response = await axios.get(`/api/books?${name}=${value}`);
  } else {
    response = await axios.get(`/api/books`);
  }
  return response.data as IBook[];
}

export async function addBook(body: IBook): Promise<IBook> {
  const res = await axios.post("/api/books/add", body);
  return res.data as IBook;
}

export async function deleteBook(bookId: string): Promise<IBook | null> {
  try {
    const res = await axios.delete(`/api/books/delete/${bookId}`);
    return res.data as IBook;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function UpdateBook(book: IBook): Promise<IBook | null> {
  try {
    const res = await axios.put(`/api/books/update/${book._id}`, book);
    return res.data as IBook;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function GetBookById(bookId: string): Promise<IBook | null> {
  try {
    const res = await axios.get(`/api/books/${bookId}`);
    return res.data as IBook;
  } catch (err) {
    console.log(err);
    return null;
  }
}

//  {
//     "title": "1984",
//     "description": "1984",
//     "oldPrice": "30",
//     "discountedPrice": "10",
//     "Url": "https://images3.penguinrandomhouse.com/cover/9780452284234",
//     "id": 14
//   }
