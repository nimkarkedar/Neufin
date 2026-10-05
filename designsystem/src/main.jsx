import { createRoot } from 'react-dom/client';
import { applyTokens } from './brand/tokens.js';
import App from './App.jsx';
import './styles/app.css';

applyTokens();
createRoot(document.getElementById('root')).render(<App />);
