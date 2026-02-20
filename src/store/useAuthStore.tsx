import axios from "axios";
import { create } from "zustand";

interface User {
    nombre: string;
    apellido: string;
    email: string;
    documento: string;
}
interface AuthState {
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void> ;
    getUser: () => Promise<void>;
    user: User | null;
}

export const useAuthStore = create<AuthState>()(
    (set) => ({
        token: null,
        user: null,

        login: async (email, password) => {
            try {
                const response = await axios.post("http://localhost:8002/api/auth/login", { email, password });
                if(response.status === 200) {
                    set({ token: response.data.access_token });
                    localStorage.setItem("token", response.data.access_token);
                    useAuthStore.getState().getUser();
                }
            } catch (error) {
                console.log(error);
            }
        },

        logout: async () => {
            try {
                const response = await axios.post("http://localhost:8002/api/auth/logout");
                if(response.status === 200) {
                    set({ token: null });
                    localStorage.removeItem("token");
                }
            } catch (error) {
                console.log(error);
            }
        },

        getUser: async () => {
            try {
                const response = await axios.get("http://localhost:8002/api/user");
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
    })
);