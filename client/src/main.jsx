import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/authentication/Login.jsx";
import Signup from "./pages/authentication/Signup.jsx";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <Home />
      </ProtectedRoutes>          // in ProtectedRoutes fn, children=<Home/>
      // whenever "/" route will be hit, ProtectedRoutes component/fn will be mounted/called
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

createRoot(document.getElementById("root")).render(
  // <BrowserRouter>
  //   <App />
  // </BrowserRouter>
  <Provider store={store}>
    <App />
    <RouterProvider router={router} />      
  </Provider>
  // first <App/> mounts & then <RouterProvider/> runs -> based on url given by user, <ProtectedRoutes/> or <Login/> or <Signup/> mounts
);
