import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import HomePage from "./pages/HomePage";
import BooksContainer from "./pages/BooksContainer";
import BookDetailsPage from "./pages/BookDetailsPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";

const Router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="books" element={<BooksContainer />} />
        <Route path={`bookDetails/:id`} element={<BookDetailsPage />} />
        <Route path={`signUp`} element={<SignUpPage />} />
        <Route path={`signIn`} element={<SignInPage />} />
      </Route>
    </>
  )
);

export default Router;
