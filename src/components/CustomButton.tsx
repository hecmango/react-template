import { Button, type ButtonProps } from 'primereact/button';

// Se extiende de ButtonProps para aceptar todas las props de un Button normal de PrimeReact
interface Props extends ButtonProps {
    outlined?: boolean; // Agregamos una prop personalizada para manejar el estilo outlined
}

export const CustomButton = ({ className = '', ...props }: Props) => {
    return (
        <Button 
            // Unimos tus clases personalizadas con cualquier clase extra que le pases desde fuera
            className={`p-button-primary ${className} ${props.outlined ? 
                'border-blue-primary text-blue-primary dark:border-gray-400 dark:text-gray-400' : 
                'bg-blue-primary border-blue-primary dark:border-gray-500 dark:bg-gray-500'}`} 
            {...props} 
        />
    );
};