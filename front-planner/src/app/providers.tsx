import { type ReactNode } from 'react'
import { AuthProvider, useAuth } from '../features/auth'
import { ToastProvider } from '../design-system/components/ui/toast-provider'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </AuthProvider>
  )
}