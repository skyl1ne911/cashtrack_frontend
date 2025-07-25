import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import AppRoute from './routers/router'


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AppRoute />
    </StrictMode>
)
