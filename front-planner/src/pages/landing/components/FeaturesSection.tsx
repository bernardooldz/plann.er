import { motion } from 'framer-motion'
import { Users, Shield, Clock, Heart } from 'lucide-react'
import { NumberTicker } from '../../../components/magicui'

const features = [
  {
    icon: Users,
    title: "Todo mundo participa",
    description: "Não é só uma pessoa fazendo tudo. Cada um contribui do seu jeito.",
    stat: { value: 8, label: "pessoas por viagem" }
  },
  {
    icon: Shield,
    title: "Sem bagunça",
    description: "Permissões simples que mantêm tudo organizado sem ser chato.",
    stat: { value: 0, label: "confusão" }
  },
  {
    icon: Clock,
    title: "Economiza tempo",
    description: "Menos tempo procurando informações, mais tempo curtindo a viagem.",
    stat: { value: 75, label: "% menos estresse" }
  },
  {
    icon: Heart,
    title: "Feito com carinho",
    description: "Criado por quem já passou pela dor de organizar viagem em grupo.",
    stat: { value: 100, label: "% brasileiro" }
  }
]

export function FeaturesSection() {
  return (
    <section className="py-24 px-6 lg:px-12 bg-zinc-900/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-semibold text-zinc-100 mb-4">
            Por que o Plann.er funciona
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Não é mais uma ferramenta complicada. É o que você sempre quis que existisse.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-zinc-800/30 p-8 rounded-2xl border border-zinc-700/30 hover:border-zinc-600/50 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 bg-lime-400/10 rounded-xl flex items-center justify-center group-hover:bg-lime-400/20 transition-colors">
                  <feature.icon className="w-7 h-7 text-lime-400" />
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-lime-400">
                    <NumberTicker value={feature.stat.value} />
                    {feature.stat.value > 0 && feature.stat.value < 100 && '+'}
                    {feature.stat.value >= 100 && '%'}
                  </div>
                  <div className="text-xs text-zinc-500">{feature.stat.label}</div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-zinc-100 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-zinc-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}