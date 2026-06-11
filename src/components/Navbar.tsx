import { Avatar } from 'primereact/avatar';
import { Menu } from 'primereact/menu';
import { useAuthStore } from '../store/useAuthStore';
import { useThemeStore } from '../store/useThemeStore';
import { useRef } from 'react';
import { Button } from 'primereact/button';

interface Props {
    onToggleSidebar?: () => void;
}

export const Navbar = ({ onToggleSidebar }: Props) => {
    const { user, logout } = useAuthStore();
    const { theme, toggleTheme } = useThemeStore();
    const menuRef = useRef<Menu>(null);

    const items = [
        { label: 'Perfil', icon: 'pi pi-user' },
        { label: 'Cerrar Sesión', icon: 'pi pi-power-off', command: () => logout() }
    ];

    return (
        <div className="flex justify-between items-center bg-gray-200 dark:bg-gray-800 p-4 shadow-sm">
            <Button icon="pi pi-bars" className="mr-2 bg-blue-primary dark:bg-blue-secondary dark:border-blue-primary border-blue-primary" onClick={onToggleSidebar} />
            <div className="flex items-center gap-4">
                <Button
                    tooltip={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
                    tooltipOptions={{ position: 'bottom' }}
                    icon={theme === 'dark' ? 'pi pi-sun' : 'pi pi-moon'}
                    rounded
                    text
                    aria-label="Cambiar tema"
                    onClick={toggleTheme}
                    className="text-gray-700 dark:text-gray-200"
                />
                <div className="flex items-center gap-3 cursor-pointer" onClick={(e) => menuRef.current?.toggle(e)}>
                    <span className="text-lg font-medium text-gray-900 dark:text-gray-100">{user?.nombre} {user?.apellido}</span>
                    <Avatar label={user?.nombre[0]} shape="circle" className="bg-blue-primary dark:bg-white dark:text-black text-white h-10 w-10"  />
                    <Menu model={items} popup ref={menuRef} />
                </div>
            </div>
        </div>
    );
};
