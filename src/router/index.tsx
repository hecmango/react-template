import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import { PublicRoute } from "../components/PublicRoute";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { NotFound } from "../pages/NotFound";
import { Usuarios } from "../pages/Usuarios";
import { Instructores } from "../pages/Instructores";


export const router = createBrowserRouter([
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
                index: true,
                element: <Navigate to="/dashboard" replace />
            },
            {
                path: "dashboard",
                element: <Dashboard />
            },
            {
                path: "usuarios",
                element: <Usuarios />
            },
            {
                path: "instructores",
                element: <Instructores />
            },
            {
                path: "*",
                element: <NotFound />
            }
        ]
    },
]);
