import axios from 'axios';
import { useLoaderStore } from '../store/useLoaderStore';
import { useToastStore } from '../store/useToastStore';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/`, 
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

api.interceptors.request.use((config) => {
    useLoaderStore.getState().setLoading(true);
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => {
        useLoaderStore.getState().setLoading(false);
        return response;
    },
    (error) => {
        useLoaderStore.getState().setLoading(false);
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('auth_token');

            if(window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
        if (error.response && error.response.data.message) {
            useToastStore.getState().showToast({
                severity: 'error',
                summary: 'Error',
                detail: error.response.data.message
            });
        }
        return Promise.reject(error);
    }
);

export {
    api
}