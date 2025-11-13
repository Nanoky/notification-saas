import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { persistStore } from 'redux-persist';
import { store } from './redux/store.ts';
import { AppModule } from './app.module.ts';
import { routeTree } from './routeTree.gen.ts';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { Provider } from 'react-redux';
import { DialogProvider } from './shared/react/dialogs/register.tsx';

persistStore(store);

AppModule.register!();
AppModule.initialize!();

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
})

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <DialogProvider>
        <RouterProvider router={router} />
      </DialogProvider>
    </Provider>
  </StrictMode>,
)
