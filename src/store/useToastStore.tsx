import { create } from "zustand";

interface Toast {
    severity: 'success' | 'info' | 'warn' | 'error';
    summary: string;
    detail: string;
    life?: number;
}

interface ToastState {
    message: Toast | null;
    showToast: (toast: Toast) => void;
}

export const useToastStore = create<ToastState>()(
    (set) => ({
        message: null,
        showToast: (msg) => set({ message: { life: 3000,...msg } }),
    })
)
    