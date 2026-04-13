import { ProgressSpinner } from "primereact/progressspinner";
import { useLoaderStore } from "../store/useLoaderStore";

const Loader = () => {
    
    const isLoading = useLoaderStore((state) => state.isLoading);

    if (!isLoading) {
        return null;
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-xs bg-white/30 z-50">
        <ProgressSpinner style={{ width: "100px", height: "100px" }} />
        </div>
    );
}

export default Loader;