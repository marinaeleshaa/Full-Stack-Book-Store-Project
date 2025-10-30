import { configureStore } from "@reduxjs/toolkit";
import { UserSlice } from "./slices/UserSlice";
import { BooksSlice } from "./slices/BooksSlice";
import { LanguageSlice } from "./slices/LanguageSlice";

export const store = configureStore({
  reducer: {
    user: UserSlice.reducer,
    books: BooksSlice.reducer,
    language: LanguageSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
