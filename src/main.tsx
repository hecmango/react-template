import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PrimeReactProvider } from 'primereact/api'
import { RouterProvider } from 'react-router-dom';

import {router} from './router/index.tsx';

import './styles/tailwind.css'
import 'primereact/resources/themes/mira/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

import './styles/index.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrimeReactProvider>
        <RouterProvider router={router}/>
    </PrimeReactProvider>
  </StrictMode>,
)
