import React from 'react';
import ReactDOM from 'react-dom/client';
import { ShoppingListProvider } from './context/ShoppingListContext';
import { ProduceListProvider } from './context/ProduceListContext';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProduceListProvider>
    <ShoppingListProvider>
      <App />
    </ShoppingListProvider>
    </ProduceListProvider>
  </React.StrictMode>
);