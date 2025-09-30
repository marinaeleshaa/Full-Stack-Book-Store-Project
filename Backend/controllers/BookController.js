import * as bookService from "../services/BookService.js";

export async function getBooksControl(req, res) {
  try {
    const { sort, category } = req.query;
    // console.log(req.query.category)
    // console.log(category,sort)
    const query = {
      category,
    };
    const books = await bookService.getBooks(query, sort);
    res.status(200).json(books);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch books", error: error.message });
  }
}

export async function getBookByIdControl(req, res) {
  try {
    const id = req.params.id;
    const book = await bookService.getBookById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch book", error: error.message });
  }
}

export async function addBookControl(req, res) {
  try {
    const book = await bookService.addBook(req.body, req.currentUser);
    res.status(201).json(book);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to add book", error: error.message });
  }
}

export async function updateBookControl(req, res) {
  try {
    const book = await bookService.updateBook(
      req.params.id,
      req.body,
      req.currentUser
    );
    res.status(200).json(book);
  } catch (error) {
    res
      .status(403)
      .json({ message: "Failed to update book", error: error.message });
  }
}

export async function deleteBookControl(req, res) {
  try {
    const deletedBook = await bookService.deleteBook(
      req.params.id,
      req.currentUser
    );
    res.status(200).json(deletedBook);
  } catch (error) {
    res
      .status(403)
      .json({ message: "Failed to delete book", error: error.message });
  }
}
