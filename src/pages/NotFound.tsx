import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';

export const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-100 text-center">
            <i className="pi pi-exclamation-triangle text-blue-600 mb-4" style={{ fontSize: '5rem' }}></i>
            
            <h1 className="text-6xl font-bold text-gray-800 mb-2">404</h1>
            <h2 className="text-2xl font-semibold text-gray-600 mb-6">¡Ups! Página no encontrada</h2>
            
            <p className="text-gray-500 mb-8 max-w-md">
                Lo sentimos, la página que estás buscando no existe o ha sido movida a otra ubicación.
            </p>

            <div className="flex gap-4">
                <Button 
                    label="Volver al Inicio" 
                    icon="pi pi-home" 
                    onClick={() => navigate('/dashboard')} 
                    className="p-button-raised bg-blue-primary border-blue-primary"
                />
                <Button 
                    label="Regresar" 
                    icon="pi pi-arrow-left" 
                    onClick={() => navigate(-1)} // Vuelve a la página anterior
                    className="p-button-outlined text-blue-primary border-blue-primary"
                />
            </div>
        </div>
    );
};