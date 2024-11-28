import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import GameProvider from './contexts/game.tsx'
import { BrowserRouter } from 'react-router-dom'
import { GlobalStyles } from './global.style.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyles />
        <GameProvider>
          <App />
        </GameProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
