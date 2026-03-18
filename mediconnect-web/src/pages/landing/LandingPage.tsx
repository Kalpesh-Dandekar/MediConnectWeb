import Navbar from "../../components/landing/Navbar"
import HeroSection from "../../components/landing/HeroSection"
import FeaturesSection from "../../components/landing/FeaturesSection"
import ImpactSection from "../../components/landing/ImpactSection"
import CTASection from "../../components/landing/CTASection"
import Footer from "../../components/landing/Footer"

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0C1B2A] to-[#16263A] text-white relative overflow-hidden">

      {/* 🔶 ORANGE GLOW */}
      <div className="absolute top-20 right-[-100px] w-[400px] h-[400px] bg-orange-400/10 blur-[140px] rounded-full" />

      {/* ⚪ SOFT WHITE GLOW */}
      <div className="absolute bottom-[-80px] left-[-80px] w-[300px] h-[300px] bg-white/5 blur-[120px] rounded-full" />

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