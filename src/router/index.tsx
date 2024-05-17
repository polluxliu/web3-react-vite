import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import ManageLayout from "../layouts/ManageLayout";
import QuestionLayout from "../layouts/QuestionLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import List from "../pages/manage/List";
import Star from "../pages/manage/Star";
import Trash from "../pages/manage/Trash";
import Edit from "../pages/question/Edit";
import Stat from "../pages/question/Stat";
import CountReducer from "../pages/demo/CountReducer";
import TodoReducer from "../pages/demo/TodoReducer";
import Count from "../pages/demo/redux/Count";
import TodoList from "../pages/demo/redux/TodoList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "test",
        element: <CountReducer />,
      },
      {
        path: "todo",
        element: <TodoReducer />,
      },
      {
        path: "count-redux",
        element: <Count />,
      },
      {
        path: "todo-redux",
        element: <TodoList />,
      },
      {
        path: "manage",
        element: <ManageLayout />,
        children: [
          {
            index: true,
            element: <List />,
          },
          {
            path: "star",
            element: <Star />,
          },
          {
            path: "trash",
            element: <Trash />,
          },
        ],
      },
      {
        path: "*", //404，写在最后
        element: <NotFound />,
      },
    ],
  },
  {
    path: "question",
    element: <QuestionLayout />,
    children: [
      {
        path: "edit/:id",
        element: <Edit />,
      },
      {
        path: "stat/:id",
        element: <Stat />,
      },
    ],
  },
]);

export default router;

export const HOME_PATH = "/";
export const LOGIN_PATH = "/login";
export const MANAGE_PATH = "/manage";
export const REGISTER_PATH = "/register";
