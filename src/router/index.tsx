import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
        children: []
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
        children: []
    }
]);
