import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { persistStore } from 'redux-persist';
import { store } from './redux/store.ts';
import { AppModule } from './app.module.ts';

persistStore(store);

AppModule.register!();
AppModule.initialize!();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
