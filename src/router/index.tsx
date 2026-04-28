import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import { PublicRoute } from "../components/PublicRoute";
import { ProtectedRoute } from "../components/ProtectedRoute";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/login" replace/>,
        children: []
    },
    {
        path: "/login",
        element: (
            <PublicRoute>
                <Login />
            </PublicRoute>
        )
    },
    {
        element: (
            <ProtectedRoute />
        )
        ,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />
            }
        ]
    },
    {
        path: "*",
        element: <Navigate to="/login" replace />
    }
]);
