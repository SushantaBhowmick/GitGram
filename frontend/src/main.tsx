import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './@/components/theme-provider.tsx'
import { Provider } from 'react-redux'
import store from './app/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme='system' storageKey="vite-ui-theme">
      <Provider store={store}>
    <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
)
