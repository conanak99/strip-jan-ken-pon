import React from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'

import App from './App/App'

const container = document.getElementById('root')
if (!container) {
    throw new Error('Root container not found')
}

createRoot(container).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
