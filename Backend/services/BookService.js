import {
  CreateBook,
  GetAllBooks,
  DeleteBook,
  EditBook,
  GetBook,
} from "../repository/BookRepository.js";

export async function getBooks(query, sort) {
  let filter = {};
  // console.log(category)
  const { category, price } = query;
  console.log(category)
  if (category) {
    console.log(category)
    // if (category)
    // const regex = new RegExp(query, "i");
    // filter.$or = [{ title: regex }, { description: regex }];
    filter = { category };
  }
  return await GetAllBooks(filter, sort);
}

export async function getBookById(id) {
  return await GetBook(id);
}

export async function addBook(data) {
  return await CreateBook(data);
}

const verifyUser = (currentUser, bookCreator, method) => {
  if (currentUser.username !== bookCreator && currentUser.role !== "admin") {
    throw new Error(`you cant ${method}`);
  }
};

export async function deleteBook(id, currentUser) {
  const book = await GetBook(id);
  verifyUser(currentUser, book.username, "delete");
  return await DeleteBook(id);
}

export async function updateBook(id, data, currentUser) {
  const book = await GetBook(id);
  verifyUser(currentUser, book.username, "update");
  return await EditBook(id, data);
}
