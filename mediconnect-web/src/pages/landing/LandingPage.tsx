import Navbar from "../../components/landing/Navbar"
import HeroSection from "../../components/landing/HeroSection"
import FeaturesSection from "../../components/landing/FeaturesSection"
import ImpactSection from "../../components/landing/ImpactSection"
import CTASection from "../../components/landing/CTASection"
import Footer from "../../components/landing/Footer"

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0C1B2A] to-[#16263A] text-white relative overflow-x-hidden">

      {/* 🔶 ORANGE GLOW */}
      <div className="
        absolute top-20 right-[-120px]
        w-[250px] sm:w-[300px] md:w-[400px]
        h-[250px] sm:h-[300px] md:h-[400px]
        bg-orange-400/10 blur-[100px] sm:blur-[120px] md:blur-[140px]
        rounded-full
      " />

      {/* ⚪ SOFT WHITE GLOW */}
      <div className="
        absolute bottom-[-80px] left-[-80px]
        w-[200px] sm:w-[250px] md:w-[300px]
        h-[200px] sm:h-[250px] md:h-[300px]
        bg-white/5 blur-[100px] sm:blur-[110px] md:blur-[120px]
        rounded-full
      " />

      {/* CONTENT */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <ImpactSection />
        <CTASection />
        <Footer />
      </div>

    </div>
  )
}

export default LandingPage