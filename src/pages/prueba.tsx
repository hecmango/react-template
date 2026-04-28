import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from "react-router-dom";

// 1. Nuevas importaciones necesarias
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { classNames } from 'primereact/utils';

// 2. Esquema fuera del componente (más limpio)
const loginSchema = z.object({
    email: z
        .string()
        .min(1, 'El correo electrónico es requerido')
        .email('El correo electrónico no es válido'),
    password: z
        .string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
    const { login } = useAuthStore();
    const navigate = useNavigate();

    // 3. Inicialización de React Hook Form
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '' }
    });

    // 4. Función de envío (data ya viene validada por Zod)
    const onFormSubmit = async (data: LoginFormValues) => {
        try {
            await login(data.email, data.password);
            if (useAuthStore.getState().token) {
                navigate("/dashboard");
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-primary p-4">
            <div className="bg-gray-900 p-4 grid grid-cols-1 sm:grid-cols-2 w-full gap-8">
                <div className="hidden sm:flex flex-col justify-center items-end p-10">
                    <h1 className="move-in-left sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight text-center">
                        Curso de <span className="text-blue-secondary">cocina</span>
                    </h1>
                </div>

                <div className="flex items-center justify-center">
                    {/* 5. Usamos una etiqueta <form> para que handleSubmit funcione */}
                    <form onSubmit={handleSubmit(onFormSubmit)} className="w-full max-w-md md:min-w-xl lg:min-w-2xl">
                        <Card className="move-in-right shadow-2xl rounded-4xl">
                            <div className="flex flex-col mt-4 p-4 md:p-8">
                                <div className='text-center'>
                                    <h2 className="text-3xl md:text-5xl font-bold text-blue-primary mb-2">Bienvenido</h2>
                                    <p className="text-gray-600 mb-6 text-2xl lg:text-2xl">
                                        Ingresa tus credenciales para acceder a tu cuenta.
                                    </p>
                                </div>

                                {/* Campo Correo */}
                                <div className="flex flex-col gap-2">
                                    <label className="font-semibold text-gray-700 text-xl">Correo electrónico</label>
                                    <Controller
                                        name="email"
                                        control={control}
                                        render={({ field, fieldState }) => (
                                            <InputText 
                                                {...field}
                                                className={classNames("w-full p-3 md:p-4 lg:p-5 text-base md:text-lg lg:text-xl bg-gray-100 border-none rounded-xl", { 'p-invalid': fieldState.error })} 
                                                placeholder="ejemplo@gmail.com"
                                            />
                                        )}
                                    />
                                    {errors.email && <small className="p-error text-red-500 font-bold">{errors.email.message}</small>}
                                </div>

                                {/* Campo Contraseña */}
                                <div className="flex flex-col gap-2 my-4">
                                    <label className="font-semibold text-gray-700 text-xl">Contraseña</label>
                                    <Controller
                                        name="password"
                                        control={control}
                                        render={({ field, fieldState }) => (
                                            <Password 
                                                {...field}
                                                className="*:w-full" 
                                                inputClassName={classNames("w-full md:p-4 lg:p-5 bg-gray-100 border-none rounded-xl text-gray-700", { 'p-invalid': fieldState.error })}
                                                pt={{
                                                    showIcon: { style: { width: '1.5em', height: '1em', top: '-0.2rem', position: 'relative' } },
                                                    hideIcon: { style: { width: '1.5em', height: '1em', top: '-0.2rem', position: 'relative' } }
                                                }}
                                                placeholder="********"
                                                toggleMask
                                                feedback={false}
                                            />
                                        )}
                                    />
                                    {errors.password && <small className="p-error text-red-500 font-bold">{errors.password.message}</small>}
                                </div>

                                <Button 
                                    type="submit" // Cambiado a type submit
                                    label="Iniciar sesión"
                                    loading={isSubmitting} // Muestra spinner automáticamente
                                    className="w-full mt-6 p-3 text-lg md:text-xl lg:text-2xl bg-blue-primary border-blue-primary hover:bg-blue-primary/90 text-white rounded-xl"
                                />
                                
                                <div>
                                    <p className="text-gray-600 mt-5 text-center text-xl">
                                        ¿No tienes una cuenta? <a href="#" className="text-blue-secondary hover:underline">Regístrate</a>
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </form>
                </div>
            </div>
        </div>
    );
}