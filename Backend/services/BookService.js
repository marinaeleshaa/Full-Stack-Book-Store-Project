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
  const { category } = query;
  console.log(category);
  if (category) {
    console.log(category);
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

export async function addBook(data, creator) {
  data.createdBy = creator.id;
  return await CreateBook(data);
}

const verifyUser = (currentUser, bookCreator, method) => {
  console.log("Book creator:", bookCreator, "Current user:", currentUser);
  console.log(bookCreator == currentUser.id)
  if (currentUser.id !== bookCreator && currentUser.role !== "admin") {
    throw new Error(`you cant ${method}`);
  }
};

export async function deleteBook(id, currentUser) {
  const book = await GetBook(id);
  verifyUser(currentUser, `${book.createdBy?._id}`, "delete"); // ✅ object كامل
  return await DeleteBook(id);
}

export async function updateBook(id, data, currentUser) {
  const book = await GetBook(id);
  console.log(currentUser, "currentUser");
  verifyUser(currentUser, `${book.createdBy._id}`, "update"); // ✅ object كامل
  return await EditBook(id, data);
}
