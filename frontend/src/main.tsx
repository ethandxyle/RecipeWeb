import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CssBaseline } from '@mui/material';
import { CustomThemeProvider } from './Context/ThemeContext';
import { AuthProvider } from './Context/AuthProvider';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <CustomThemeProvider>
            <CssBaseline />
            <AuthProvider><App /></AuthProvider>
        </CustomThemeProvider>
    </React.StrictMode>
);
