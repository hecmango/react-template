import { create } from "zustand";
import { devtools } from "zustand/middleware";
import lightThemeUrl from "primereact/resources/themes/lara-light-blue/theme.css?url";
import darkThemeUrl from "primereact/resources/themes/lara-dark-blue/theme.css?url";

export type Theme = "light" | "dark";

interface ThemeState {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

const STORAGE_KEY = "theme";
const STYLE_ID = "prime-theme";

export const applyTheme = (theme: Theme) => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");

    const url = theme === "dark" ? darkThemeUrl : lightThemeUrl;
    let style = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
    if (!style) {
        style = document.createElement("style");
        style.id = STYLE_ID;
        document.head.appendChild(style);
    }
    style.textContent = `@import url("${url}") layer(primereact);`;
};

const getInitialTheme = (): Theme => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

// Aplicar el tema sincrónicamente al cargar el módulo, ANTES de que React renderice.
// Evita la condición de carrera entre useEffect del padre (App) y del hijo (Login).
const initialTheme = getInitialTheme();
applyTheme(initialTheme);

export const useThemeStore = create<ThemeState>()(
    devtools(
        (set, get) => ({
            theme: initialTheme,

            setTheme: (theme) => {
                applyTheme(theme);
                localStorage.setItem(STORAGE_KEY, theme);
                set({ theme });
            },

            toggleTheme: () => {
                const next: Theme = get().theme === "dark" ? "light" : "dark";
                get().setTheme(next);
            },
        }),
        { name: "theme" }
    )
);
