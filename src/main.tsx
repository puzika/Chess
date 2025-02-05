import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { BrowserRouter } from 'react-router-dom'
import { GlobalStyles } from './global.style.tsx'
import MenuProvider from './components/burger-menu/burger-menu.context.tsx'
import ScreenSizeProvider from './screen-size.context.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyles />
        <ScreenSizeProvider>
          <MenuProvider>
            <App />
          </MenuProvider>
        </ScreenSizeProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
