import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './redux/store';  // Importiamo lo store configurato

// Aggiungi il Provider e passa lo store
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);

