// src/App.tsx
import { RouterProvider } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';
import { router } from './router';
import Loader from './components/Loader';
import ToastComponent from './components/Toast';

export default function App() {
  return (
    <PrimeReactProvider value={{unstyled: false}}>
      <ToastComponent />
      <Loader /> 
      <RouterProvider router={router} />
    </PrimeReactProvider>
  );
}