import React from 'react';
import { Title } from '../components/Title';


const Dashboard: React.FC = () => {
    const stats = [
        { label: 'Total de cursos', value: '10' },
        { label: 'Total de estudiantes', value: '150' },
        { label: 'Total de instructores', value: '5' },
        { label: 'Total de aulas', value: '10' },
    ];


    return (
        <div className="min-h-screen">
            <div className="mx-auto">
                <Title className='text-center mb-5' size='4xl'>
                    Dashboard
                </Title>
                
                <div className="grid grid-cols-1 md:grid-cols-2  gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                            <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">{stat.label}</p>
                            <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">{stat.value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;