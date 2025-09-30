import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { IBook } from "../../Interfaces";
import {
  addBook,
  deleteBook,
  getAllBooks,
  UpdateBook,
} from "../../handlers/BookApiHandler";

export interface booksState {
  books: IBook[];
  loading: boolean;
  searchText: {
    name: "searchText";
    value: string;
  };
  error: string | null;
}

// get all books
// export const GetAllBooksAction = createAsyncThunk(
//   "books/getAll",
//   async (query: { name: string; value: string }) => {
//     const books = await getAllBooks(query);
//     return books;
//   }
// );
export const GetAllBooksAction = createAsyncThunk(
  "books/getAll",
  async (query: {
    category?: { name: string; value: string };
    searchText?: { name: string; value: string };
  }) => {
    const books = await getAllBooks(query);
    return books;
  }
);

// add book
export const AddBookAction = createAsyncThunk(
  "books/add",
  async (body: IBook) => {
    const book = await addBook(body);
    return book;
  }
);

// delete book
export const DeleteBookAction = createAsyncThunk(
  "book/delete",
  async (bookId: string) => {
    const deletedBook = await deleteBook(bookId);
    return deletedBook;
  }
);

// update book
export const UpdateBookAction = createAsyncThunk(
  "book/update",
  async (book: IBook) => {
    const updatedBook = await UpdateBook(book);
    return updatedBook;
  }
);

const initialState: booksState = {
  books: [],
  loading: false,
  error: null,
  searchText: {
    name: "searchText",
    value: "",
  },
};

export const BooksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    SearchByTextAction: (state, action: PayloadAction<string>) => {
      state.searchText.value = action.payload;
    },
  },
  extraReducers(builder) {
    // ================= Get All =================
    builder.addCase(GetAllBooksAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      GetAllBooksAction.fulfilled,
      (state, action: PayloadAction<IBook[]>) => {
        state.loading = false;
        state.books = action.payload;
      }
    );
    builder.addCase(GetAllBooksAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Failed to fetch books";
    });

    // ================= Add =================
    builder.addCase(AddBookAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      AddBookAction.fulfilled,
      (state, action: PayloadAction<IBook>) => {
        state.loading = false;
        state.books.push(action.payload);
      }
    );
    builder.addCase(AddBookAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Failed to add book";
    });

    // ================= Delete =================
    builder.addCase(DeleteBookAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      DeleteBookAction.fulfilled,
      (state, action: PayloadAction<IBook>) => {
        state.loading = false;
        state.books = state.books.filter((b) => b._id !== action.payload._id);
      }
    );
    builder.addCase(DeleteBookAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Failed to delete book";
    });

    // ================= Update =================
    builder.addCase(UpdateBookAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      UpdateBookAction.fulfilled,
      (state, action: PayloadAction<IBook>) => {
        state.loading = false;
        state.books = state.books.map((b) =>
          b._id === action.payload._id ? action.payload : b
        );
      }
    );
    builder.addCase(UpdateBookAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Failed to update book";
    });
  },
});

// eslint-disable-next-line react-refresh/only-export-components
export const { SearchByTextAction } = BooksSlice.actions;
export default BooksSlice.reducer;
