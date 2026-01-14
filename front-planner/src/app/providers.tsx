import { type ReactNode } from 'react'
import { ToastProvider } from '../design-system/components/ui/toast-provider'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ToastProvider>
      {children}
    </ToastProvider>
  )
}