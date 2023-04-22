import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Loader } from './components/Loader/Loader.tsx'
import { ErrorHandler } from './components/ErrorHandler/ErrorHandler.tsx'

const client = new QueryClient({
  defaultOptions: { queries: { suspense: true } },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <ErrorHandler>
        <React.Suspense fallback={<Loader/>}>
          <App />
        </React.Suspense>
      </ErrorHandler>
    </QueryClientProvider>
  </React.StrictMode>
)
