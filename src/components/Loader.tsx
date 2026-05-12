import { ProgressSpinner } from "primereact/progressspinner";
import { useLoaderStore } from "../store/useLoaderStore";

const Loader = () => {
    
    const isLoading = useLoaderStore((state) => state.isLoading);

    if (!isLoading) {
        return null;
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-xs bg-white/30 z-50">
        <style>{`.loader-spinner .p-progress-spinner-circle { stroke: var(--color-blue-primary) !important; animation: p-progress-spinner-dash 1.5s ease-in-out infinite !important; }`}</style>
        <ProgressSpinner className="loader-spinner" style={{ width: "10rem", height: "10rem" }} strokeWidth="6"/>
        </div>
    );
}

export default Loader;