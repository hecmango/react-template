import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import type { JSX } from "react";

export const PublicRoute = ({ children }: { children: JSX.Element }) => {
    const token = useAuthStore((state) => state.token);

    if (token) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};