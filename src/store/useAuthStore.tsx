import { create } from "zustand";
import { devtools } from "zustand/middleware";
import authService from "../services/authService";

interface User {
    nombre: string;
    apellido: string;
    email: string;
    documento: string;
}
interface AuthState {
    token: string | null;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void> ;
    getUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    devtools(
        (set) => ({
            token: localStorage.getItem("auth_token"),
            user: null,
    
            login: async (email, password) => {
                try {
                    const response = await authService.login({ email, password });
                    if(response.status === 200) {
                        set({ token: response.data.access_token });
                        localStorage.setItem("auth_token", response.data.access_token);
                    }
                } catch (error) {
                    console.log(error);
                }
            },
    
            logout: async () => {
                try {
                    const response = await authService.logout();
                    if(response.status === 200) {
                        set({ token: null, user: null });
                        localStorage.removeItem("auth_token");
                    }
                } catch (error) {
                    console.log(error);
                }
            },
    
            getUser: async () => {
                try {
                    const response = await authService.getUser();
                    if(response.status === 200) {
                       set({
                        user: {
                            nombre: response.data.nombre,
                            apellido: response.data.apellido,
                            email: response.data.email,
                            documento: response.data.documento
                        }
                       })
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        { name: "auth" }
    )
);