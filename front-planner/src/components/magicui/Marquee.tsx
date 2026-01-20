import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface MarqueeProps {
  children: ReactNode
  speed?: number
  direction?: 'left' | 'right'
  className?: string
}

export function Marquee({ 
  children, 
  speed = 50, 
  direction = 'left', 
  className = '' 
}: MarqueeProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0">{children}</div>
      </motion.div>
    </div>
  )
}