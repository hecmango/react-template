import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { useState } from 'react';
import { useEffect } from 'react';

interface Props {
    children?: React.ReactNode;
}

export const MainLayout = ({ children }: Props) => {

    const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
            <Sidebar isVisible={sidebarOpen} setIsVisible={setSidebarOpen} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar onToggleSidebar={toggleSidebar} />
                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};