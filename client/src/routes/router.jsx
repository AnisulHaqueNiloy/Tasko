import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import Alltask from "../pages/tasks/AllTask/Alltask";
import Taskdetails from "../pages/tasks/Taskdetails/Taskdetails";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ErrorPage from "../pages/Error/ErrorPage";
import Spin from "../pages/spin/Spin";
import ResetPassword from "../pages/auth/ResetPassword";

import Protected from "../routes/Protected";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    children: [
      {
        path: "/",
        element: (
          <Protected>
            <Alltask></Alltask>
          </Protected>
        ),
      },
      {
        path: "/task/:id",
        element: (
          <Protected>
            <Taskdetails></Taskdetails>
          </Protected>
        ),
      },
      {
        path: "/spin",
        element: (
          <Protected>
            <Spin></Spin>
          </Protected>
        ),
      },
      {
        path: "*",
        element: <ErrorPage></ErrorPage>,
      },
      {
        path: "auth/reset-password",
        element: <ResetPassword></ResetPassword>,
      },
    ],
  },

  {
    path: "auth/login",
    element: <Login></Login>,
  },
  {
    path: "auth/register",
    element: <Register></Register>,
  },
]);
