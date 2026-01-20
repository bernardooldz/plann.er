import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import logoSvg from '../../../assets/logo.svg'
import { Button } from '../../../design-system'

export function Navigation() {
  const navigate = useNavigate()

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-sm border-b border-zinc-800/50"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logoSvg} alt="Plann.er" className="h-8" />
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/login')}
            className="text-zinc-300 hover:text-zinc-100 transition-colors px-4 py-2"
          >
            Entrar
          </button>
          <Button
            onClick={() => navigate('/register')}
            variant="primary"            
          >            
            Criar conta
          </Button>
        </div>
      </div>
    </motion.nav>
  )
}