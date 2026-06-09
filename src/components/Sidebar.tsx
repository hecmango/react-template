import { useState } from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
    isVisible?: boolean;
    setIsVisible?: (visible: boolean) => void;
}

interface MenuItem {
    label: string;
    icon: string;
    to?: string;
    children?: MenuItem[];
}

export const Sidebar = ({ isVisible, setIsVisible }: Props) => {

    const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

    const handleLinkClick = () => {
        if (window.innerWidth <= 768) {
            setIsVisible?.(false);
        }
    };

    const toggleMenu = (label: string) => {
        setOpenMenus(prev => ({ ...prev, [label]: !prev[label] }));
    };

    const items: MenuItem[] = [
        {
            label: 'Dashboard',
            icon: 'pi pi-home',
            to: '/dashboard',
            children: []
        },
        {
            label: 'Usuarios',
            icon: 'pi pi-users',
            to: '/usuarios',
            children: []
        },
        {
            label: 'Catalogos',
            icon: 'pi pi-box',
            children: [
                { label: 'Categorías del curso', icon: 'pi pi-tag', to: '/catalogos/categorias' },
                { label: 'Especialidades del instructor', icon: 'pi pi-shopping-cart', to: '/catalogos/especialidades' },
                { label: 'Estado de los cursos', icon: 'pi pi-chart-bar', to: '/catalogos/estados' }
            ]
        },
        {
            label: 'Cursos',
            icon: 'pi pi-book',
            children: [
                { label: 'Listado de cursos', icon: 'pi pi-list', to: '/cursos' },
                { label: 'Crear curso', icon: 'pi pi-plus', to: '/cursos/crear' }
            ]
        }
    ];

    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `p-3 rounded-lg flex items-center gap-3 ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`;

    const renderItem = (item: MenuItem) => {
        const isDropdown = !item.to && item.children && item.children.length > 0;

        if (isDropdown) {
            const isOpen = !!openMenus[item.label];
            return (
                <div key={item.label} className="flex flex-col">
                    <button
                        type="button"
                        onClick={() => toggleMenu(item.label)}
                        className="p-3 rounded-lg flex items-center gap-3 hover:bg-gray-700 text-left cursor-pointer"
                    >
                        <i className={item.icon}></i>
                        <span className="flex-1">{item.label}</span>
                        <i className={`pi ${isOpen ? 'pi-chevron-up' : 'pi-chevron-down'}`}></i>
                    </button>
                    {isOpen && (
                        <div className="flex flex-col gap-1 ml-6 mt-1">
                            {item.children!.map(child => renderItem(child))}
                        </div>
                    )}
                </div>
            );
        }

        return (
            <NavLink key={item.label} to={item.to!} onClick={handleLinkClick} className={linkClass}>
                <i className={item.icon}></i> {item.label}
            </NavLink>
        );
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
                {items.map(item => renderItem(item))}
            </nav>
        </div>
    );
};
