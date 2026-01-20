import { motion } from 'framer-motion'

export function Footer() {
  return (
    <footer className="py-4 px-6 lg:px-12 border-t border-zinc-800/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-center gap-4 text-zinc-500"
        >
          <div className="text-center md:text-left">
            <p>Plann.er © 2026 |</p>
          </div>
          
          <div className="text-center md:text-right">
            <p>
              por{' '}
              <a 
                href="https://github.com/bernardooldz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-lime-400 hover:text-lime-300 transition-colors"
              >
                Bernardo Diniz
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}