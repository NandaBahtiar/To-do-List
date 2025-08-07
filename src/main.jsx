import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import store from './redux/store';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        {/* 2. Bungkus komponen App dengan Provider */}
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>,
)
