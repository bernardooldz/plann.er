import { motion } from 'framer-motion'
import { MessageCircle, Link, AlertCircle, Zap, X } from 'lucide-react'
import { Marquee } from '../../../components/magicui'

const problems = [
  "Ideias perdidas no WhatsApp",
  "Links espalhados em conversas diferentes", 
  "Falta de decisões claras",
  "Planejamento que vira estresse",
  "Ninguém sabe quem vai fazer o quê",
  "Informações importantes se perdem"
]

const painPoints = [
  {
    icon: MessageCircle,
    title: "Conversas infinitas",
    description: "Grupo do WhatsApp com 200+ mensagens e nenhuma decisão tomada"
  },
  {
    icon: Link,
    title: "Links perdidos",
    description: "Aquele hotel incrível que alguém mandou... onde mesmo?"
  },
  {
    icon: AlertCircle,
    title: "Nada definido",
    description: "Todo mundo sugere, ninguém decide. A viagem não sai do papel"
  },
  {
    icon: Zap,
    title: "Estresse desnecessário",
    description: "Planejar deveria ser divertido, não uma dor de cabeça"
  }
]

export function ProblemSection() {
  return (
    <section className="py-24 bg-zinc-900/30">
      <div className="mb-16">
        <Marquee speed={30} className="py-4">
          <div className="flex items-center gap-12 text-zinc-500 px-6">
            {problems.map((problem, index) => (
              <div key={index} className="flex items-center gap-3 whitespace-nowrap">
                <X className="w-4 h-4 text-red-400" />
                <span>{problem}</span>
              </div>
            ))}
          </div>
        </Marquee>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-semibold text-zinc-100 mb-4">
            Todo mundo já passou por isso
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Você não é o único que já desistiu de organizar uma viagem em grupo
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-zinc-800/50 p-6 rounded-xl border border-zinc-700/50 hover:border-zinc-600 transition-colors"
            >
              <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-4">
                <point.icon className="w-6 h-6 text-red-400" />
              </div>
              
              <h3 className="text-lg font-semibold text-zinc-100 mb-2">
                {point.title}
              </h3>
              
              <p className="text-zinc-400 text-sm leading-relaxed">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-xl text-lime-400 font-medium">
            O Plann.er existe pra acabar com isso.
          </p>
        </motion.div>
      </div>
    </section>
  )
}