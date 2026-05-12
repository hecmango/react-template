import { NavLink } from 'react-router-dom';

interface Props {
    isVisible?: boolean;
    setIsVisible?: (visible: boolean) => void;
}

export const Sidebar = ({ isVisible, setIsVisible }: Props) => {

    const handleLinkClick = () => {
        // Si la pantalla es pequeña, cerramos el sidebar al hacer clic
        if (window.innerWidth <= 768) {
            setIsVisible?.(false);
        }
    };

    return (
        <div className={`
        w-70 h-screen bg-gray-800 text-white flex flex-col p-4 shadow-xl
        transition-all duration-300 ease-in-out overflow-hidden 
        ${isVisible ? 'opacity-100' : 'opacity-0 w-0 -ml-70'}`}>
            <div className="flex flex-col items-center gap-2 mb-6 px-4 pt-6 shrink-0">
                <span>CURSO DE COCINA</span>
                <img src="/img/react.png" alt="Logo" className="h-9" />
            </div>
            <nav className="flex flex-col gap-2">
                <NavLink to="/dashboard" onClick={handleLinkClick} className={({isActive}) => `p-3 rounded-lg flex items-center gap-3 ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
                    <i className="pi pi-home"></i> Dashboard
                </NavLink>
                <NavLink to="/usuarios" onClick={handleLinkClick} className={({isActive}) => `p-3 rounded-lg flex items-center gap-3 ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
                    <i className="pi pi-users"></i> Usuarios
                </NavLink>
                <NavLink to="/instructores" onClick={handleLinkClick} className={({isActive}) => `p-3 rounded-lg flex items-center gap-3 ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
                    <i className="pi pi-user"></i> Instructores
                </NavLink>
            </nav>
        </div>
    );
};