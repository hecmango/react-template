import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from "react-router-dom";

import { useState } from 'react';
        

export default function Login() {

    const { login } = useAuthStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await login(email, password);
            if (useAuthStore.getState().token) {
                navigate("/dashboard");
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
            <div className="bg-gray-900 p-4 grid grid-cols-1 sm:grid-cols-2 w-full gap-8">
                <div className="hidden sm:flex flex-col justify-center items-end p-10">
                    <h1 className="move-in-left sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight text-center">
                        Curso de <span className="text-blue-500">cocina</span>
                    </h1>
                </div>

                <div className="flex items-center justify-center">
                    <Card className="move-in-right w-full max-w-md md:min-w-xl lg:min-w-2xl shadow-2xl rounded-4xl">
                        <div className="flex flex-col mt-4 p-4 md:p-8">
                            <div className='text-center'>
                                <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-2">Bienvenido</h2>
                                <p className="text-gray-600 mb-6 text-2xl lg:text-2xl">
                                    Ingresa tus credenciales para acceder a tu cuenta.
                                </p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-semibold text-gray-700 text-xl">
                                    Correo electrónico
                                </label>
                                <InputText 
                                    className="w-full p-3 md:p-4 lg:p-5 text-base md:text-lg lg:text-xl bg-gray-100 border-none rounded-xl" 
                                    placeholder="ejemplo@gmail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-2 my-4">
                                <label className="font-semibold text-gray-700 text-xl">
                                    Contraseña
                                </label>
                                <Password 
                                    className="*:w-full [&_span]:-translate-y-1/2! [&_span]:right-4! [&_.p-password-input]:text-base! [&_.p-password-input]:md:text-lg! [&_.p-password-input]:lg:text-xl!" 
                                    inputClassName="w-full p-3 md:p-4 lg:p-5 bg-gray-100 border-none rounded-xl text-gray-700"
                                    pt={{
                                        showIcon: { 
                                            className: 'text-lg md:text-xl lg:text-2xl',
                                            style: { width: '1.2em', height: '1.2em' }
                                        },
                                        hideIcon: { 
                                            className: 'text-lg md:text-xl lg:text-2xl',
                                            style: { width: '1.2em', height: '1.2em' }
                                        }
                                    }}
                                    placeholder="********"
                                    toggleMask
                                    feedback={false}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <Button 
                                label="Iniciar sesión" 
                                className="w-full p-3 md:p-4 lg:p-5 text-base md:text-lg lg:text-xl bg-gray-800 text-white rounded-xl mt-4"
                                onClick={handleLogin} 
                            />
                            <div>
                                <p className="text-gray-600 mt-5 text-center text-xl">
                                    ¿No tienes una cuenta? <a href="#" className="text-blue-500 hover:underline">Regístrate</a>
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}