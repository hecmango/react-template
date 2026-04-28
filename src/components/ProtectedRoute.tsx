import { useAuthStore } from "../store/useAuthStore";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
    const token = useAuthStore((state) => state.token);
    // Si no hay token, lo mandamos al login
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    // Si hay token, dejamos que pase a las rutas hijas (Dashboard, Cursos, etc.)
    return <Outlet />;
}