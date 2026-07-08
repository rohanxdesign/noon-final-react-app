import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RootShell } from './shell/RootShell'
import '@tokens/index.css'

const SupermallApp    = lazy(() => import('./apps/supermall/App'))
const ShareAddressApp = lazy(() => import('./apps/share-address/App'))
const OneFlowsApp     = lazy(() => import('./apps/one-flows/App'))
const WishlistApp     = lazy(() => import('./apps/wishlist/App'))
const FamilySharingApp = lazy(() => import('./apps/family-sharing/App'))
const Hub             = lazy(() => import('./shell/Hub'))

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <RootShell>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/supermall/*"     element={<SupermallApp />} />
              <Route path="/share-address/*" element={<ShareAddressApp />} />
              <Route path="/one-flows/*"     element={<OneFlowsApp />} />
              <Route path="/wishlist/*"      element={<WishlistApp />} />
              <Route path="/family-sharing/*" element={<FamilySharingApp />} />
              <Route path="/"                element={<Navigate to="/supermall" replace />} />
            </Routes>
          </Suspense>
        </RootShell>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
