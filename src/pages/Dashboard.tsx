import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Button } from 'primereact/button';


const Dashboard: React.FC = () => {
    const stats = [
        { label: 'Total Users', value: '1,234' },
        { label: 'Revenue', value: '$45,678' },
        { label: 'Orders', value: '892' },
        { label: 'Growth', value: '+12.5%' },
    ];


    return (
        <div className="min-h-screen bg-gray-100">
            <div className="mx-auto">
                <h1 className="text-4xl font-bold text-gray-800 mb-8">Dashboard</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-lg shadow p-6">
                            <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                            <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
                    <p className="text-gray-600">No recent activity to display</p>
                </div>

                <Button 
                label="Logout"
                className='w-full mt-6'
                onClick={() => useAuthStore.getState().logout()} 
                />

            </div>
        </div>
    );
};

export default Dashboard;