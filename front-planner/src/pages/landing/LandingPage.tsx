import { Navigation } from './components/Navigation'
import { HeroSection } from './components/HeroSection'
import { ProblemSection } from './components/ProblemSection'
import { HowItWorksSection } from './components/HowItWorksSection'
import { FeaturesSection } from './components/FeaturesSection'
import { CTASection } from './components/CTASection'
import { Footer } from './components/Footer'

export function LandingPage() {
  return (
    <>
      <Navigation />
      <div className="pt-20">
        <HeroSection />
        <ProblemSection />
        <HowItWorksSection />
        <FeaturesSection />
        <CTASection />
      </div>
      <Footer />
    </>
  )
}