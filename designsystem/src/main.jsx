import { createRoot } from 'react-dom/client';
import { applyTokens } from './brand/tokens.js';
import App from './App.jsx';
import './styles/app.css';
import './styles/ui.css';

applyTokens();
createRoot(document.getElementById('root')).render(<App />);
