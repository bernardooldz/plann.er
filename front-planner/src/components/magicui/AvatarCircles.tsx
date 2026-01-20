import { motion } from 'framer-motion'

interface AvatarCirclesProps {
  avatars: string[]
  className?: string
}

export function AvatarCircles({ avatars, className = '' }: AvatarCirclesProps) {
  return (
    <div className={`flex -space-x-2 ${className}`}>
      {avatars.map((avatar, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          className="relative"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lime-400 to-lime-600 border-2 border-zinc-900 flex items-center justify-center text-zinc-900 font-semibold text-sm">
            {avatar}
          </div>
        </motion.div>
      ))}
    </div>
  )
}