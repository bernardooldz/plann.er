import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { InteractiveHoverButton } from "../../../components/magicui";
import logoSvg from "../../../assets/logo.svg";

export function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center bg-linear-to-br from-zinc-900/50 to-zinc-800/30 p-12 rounded-3xl border border-zinc-700/30"
        >
          <div className="flex flex-col justify-center mb-8">     
            <img src={logoSvg} alt="Plann.er" className="h-12" />
          </div>

          <h2 className="text-3xl font-semibold text-zinc-100 mb-6">
            Sua próxima viagem começa agora
          </h2>

          <p className="text-lg text-zinc-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            Crie uma viagem, mande o link pro grupo e veja a mágica acontecer.
            Em 5 minutos você vai ter tudo organizado.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <InteractiveHoverButton onClick={() => navigate("/register")}>
              Começar agora é grátis
              <ArrowRight className="w-5 h-5" />
            </InteractiveHoverButton>

            <motion.button
              onClick={() => navigate("/login")}
              className="px-6 py-3 text-zinc-400 hover:text-zinc-300 transition-colors"
              whileHover={{ scale: 1.02 }}
            >
              Já tenho uma conta
            </motion.button>
          </div>

          <p className="text-sm text-zinc-500 mt-6">
            Sem cartão de crédito. Sem pegadinhas. Só criar e usar.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
