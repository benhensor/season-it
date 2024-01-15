import React from 'react'
import ReactDOM from 'react-dom/client'
import { ShoppingListProvider } from './context/ShoppingListContext'
import { ProduceListProvider } from './context/ProduceListContext'
import GlobalStyles from './styles/GlobalStyles'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ProduceListProvider>
    <ShoppingListProvider>
      <GlobalStyles />
      <App />
    </ShoppingListProvider>
    </ProduceListProvider>
  </React.StrictMode>
)