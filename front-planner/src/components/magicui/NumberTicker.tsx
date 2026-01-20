import { useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

interface NumberTickerProps {
  value: number
  duration?: number
  className?: string
}

export function NumberTicker({ value, duration = 2, className = '' }: NumberTickerProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (isInView) {
      const startTime = Date.now()
      const startValue = 0
      
      const updateValue = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / (duration * 1000), 1)
        const currentValue = Math.floor(startValue + (value - startValue) * progress)
        
        setDisplayValue(currentValue)
        
        if (progress < 1) {
          requestAnimationFrame(updateValue)
        }
      }
      
      updateValue()
    }
  }, [isInView, value, duration])

  return (
    <span ref={ref} className={className}>
      {displayValue.toLocaleString()}
    </span>
  )
}