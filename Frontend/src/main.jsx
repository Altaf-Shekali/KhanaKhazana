import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './conetxt/AuthProvider.jsx';
import { LanguageProvider } from './conetxt/language-context.jsx';

// Ensure dark mode support is initialized
if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter future={{ v7_relativeSplatPath: true }}>
    <AuthProvider>
    <LanguageProvider>
        <App />
    </LanguageProvider>
    </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
