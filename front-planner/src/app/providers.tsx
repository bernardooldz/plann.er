import { type ReactNode } from 'react'
import { ToastProvider } from '../design-system/components/ui/toast-provider'
import { AuthProvider } from '../shared/contexts/auth-context'

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