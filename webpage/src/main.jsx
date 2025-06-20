import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import './styles/App.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
