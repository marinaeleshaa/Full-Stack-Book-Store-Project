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
import Dashboard from "./components/UserDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import UserProfile from "./pages/ProfilePage";

const Router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="books" element={<BooksContainer />} />
        <Route path={`bookDetails/:id`} element={<BookDetailsPage />} />
        <Route path={`signUp`} element={<SignUpPage />} />
        <Route
          path={`signIn`}
          element={
            <ProtectedRoute  redirectPath="/">
              <SignInPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={`dashboard`}
          element={
            <ProtectedRoute isMustLogin isForAdmin redirectPath="/">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute isMustLogin redirectPath="/signIn">
              <UserProfile />
            </ProtectedRoute>
          }
        />
      </Route>
    </>
  )
);

export default Router;
