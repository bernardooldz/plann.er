import { motion } from "framer-motion";
import { Calendar, Share2, Users, CheckCircle } from "lucide-react";
import travelImage2 from "../../../assets/image-travel-2.svg";

const steps = [
  { 
    icon: Calendar, 
    title: "Monte sua viagem", 
    desc: "Rio de Janeiro, 15-20 de março. Pronto.",
    detail: "Só o básico: onde e quando. O resto vem depois."
  },
  { 
    icon: Share2, 
    title: "Manda pro grupo", 
    desc: "Um link. Todo mundo clica e entra.",
    detail: "Nada de cadastro complicado. Link e pronto."
  },
  { 
    icon: Users, 
    title: "Galera colabora", 
    desc: "Cada um sugere o que quer fazer.",
    detail: "Restaurantes, passeios, hospedagem. Tudo junto."
  },
  { 
    icon: CheckCircle, 
    title: "Viagem organizada", 
    desc: "Nada se perde. Tudo no lugar certo.",
    detail: "Sem mais 'onde mesmo que era aquele hotel?'"
  }
];

export function HowItWorksSection() {
  return (
    <section className="py-15 px-6 lg:px-12 bg-zinc-900/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-semibold text-zinc-100 mb-4">
            Na prática, é assim
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Sem enrolação. Quatro passos e sua viagem está organizada.
          </p>
        </motion.div>

        <div className="flex justify-around gap-16 items-center">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="flex items-start gap-6 group"
              >
                <div className="shrink-0 relative">
                  <div className="w-14 h-14 bg-lime-400 text-zinc-950 rounded-xl flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
                    {index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-zinc-700" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <step.icon className="w-5 h-5 text-lime-400" />
                    <h3 className="text-xl font-semibold text-zinc-100">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-zinc-300 mb-2 font-medium">
                    {step.desc}
                  </p>
                  <p className="text-zinc-500 text-sm">
                    {step.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative bg-zinc-800/50 p-8 rounded-2xl border border-zinc-700/30">
              <img 
                src={travelImage2} 
                alt="Exemplo de viagem organizada" 
                className="w-full max-w-sm mx-auto mb-6"
              />
              
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-lime-400/10 rounded-full blur-xl" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-lime-400/5 rounded-full blur-2xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}