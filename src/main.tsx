import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { setupStore } from './store/store.ts'
import './index.css'
import { BrowserRouter } from 'react-router'

const store = setupStore()

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <BrowserRouter basename="/weather-frontend-app">
            <App />
        </BrowserRouter>
    </Provider>
)
