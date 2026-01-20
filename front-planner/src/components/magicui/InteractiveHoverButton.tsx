import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface InteractiveHoverButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
}

export function InteractiveHoverButton({ children, onClick, className = '' }: InteractiveHoverButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`relative overflow-hidden bg-lime-400 text-zinc-950 px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300 group ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="absolute inset-0 bg-lime-300"
        initial={{ x: '-100%' }}
        whileHover={{ x: 0 }}
        transition={{ duration: 0.3 }}
      />
      <span className="relative z-10 flex items-center gap-3">
        {children}
      </span>
    </motion.button>
  )
}