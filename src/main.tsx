import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { RouterProvider } from 'react-router';
import { route } from './component/route';

const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
   <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={route} />
    </QueryClientProvider>
  </StrictMode>
)
