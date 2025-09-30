import { RouterProvider } from "react-router-dom";
import Router from "./Router";
import { Provider } from "react-redux";
import { store } from "./redux/Store";

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={Router}></RouterProvider>
      </Provider>
    </>
  );
}

export default App;
