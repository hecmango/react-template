import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Navigate, Outlet } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";

export const ProtectedRoute = () => {
    const token = useAuthStore((state) => state.token);
    const user = useAuthStore((state) => state.user);
    const getUser = useAuthStore((state) => state.getUser);

    useEffect(() => {
        if (token && !user) getUser();
    }, [token, user, getUser]);

    if (!token) {
        return <Navigate to="/login" replace />;
    }
    
    return (
        <MainLayout>
            <Outlet />
        </MainLayout>
    );
}