import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface TypingAnimationProps {
  text: string
  duration?: number
  className?: string
}

export function TypingAnimation({ text, duration = 50, className = '' }: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, duration)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, duration])

  return (
    <span className={className}>
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-0.5 h-6 bg-lime-400 ml-1"
      />
    </span>
  )
}