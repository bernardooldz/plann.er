import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, MapPin } from 'lucide-react'
import { InteractiveHoverButton, TypingAnimation } from '../../../components/magicui'
import logoSvg from '../../../assets/logo.svg'
import travelImage1 from '../../../assets/image-travel-1.svg'

export function HeroSection() {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-zinc-950">
      <div className="absolute inset-0 bg-linear-to-r from-zinc-950 via-zinc-950/90 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center gap-3 mb-6">
            <img src={logoSvg} alt="Plann.er" className="h-8" />
          </div>
          
          <h1 className="text-4xl font-semibold text-zinc-100 leading-tight mb-6">
            <TypingAnimation 
              text="Planejar viagens em grupo não precisa ser confuso."
              duration={40}
            />
          </h1>
          
          <p className="text-lg text-zinc-400 leading-relaxed mb-8 max-w-lg">
            Organize ideias, atividades e links em um só lugar. 
            Todo mundo planeja junto, sem bagunça.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <InteractiveHoverButton onClick={() => navigate('/register')}>
              Criar minha primeira viagem
              <ArrowRight className="w-5 h-5" />
            </InteractiveHoverButton>
            
            <motion.button
              onClick={() => navigate('/login')}
              className="px-6 py-3 text-zinc-300 border border-zinc-700 rounded-lg hover:border-zinc-600 transition-colors"
              whileHover={{ scale: 1.02 }}
            >
              Já tenho conta
            </motion.button>
          </div>
          
          <div className="flex items-center gap-4 mt-8 text-sm text-zinc-500">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Mais de 500 viagens organizadas</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative">
            <img 
              src={travelImage1} 
              alt="Planejamento de viagem" 
              className="w-full max-w-md mx-auto"
            />
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-lime-400/20 rounded-full blur-xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-lime-400/10 rounded-full blur-2xl" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}