import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/queryClient'
import { routeTree } from './routeTree.gen'
import './index.css'

// Criação do router tipado TanStack
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
})

// Registro de tipos para TanStack Router
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Inicialização condicional do Mock Service Worker (MSW)
async function enableMocking() {
  if (import.meta.env.DEV || import.meta.env.VITE_ENABLE_MSW === 'true') {
    const { worker } = await import('./mocks/browser')
    return worker.start({
      serviceWorker: {
        url: '/mockServiceWorker.js',
      },
      quiet: false,
    })
  }
}

const rootElement = document.getElementById('root')!

enableMocking().then(() => {
  createRoot(rootElement).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>
  )
})
