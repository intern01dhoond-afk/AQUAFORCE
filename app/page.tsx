import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import ProfessionalCleaning from "@/components/ProfessionalCleaning";
import EngineeredPerformance from "@/components/EngineeredPerformance";
import WashWithoutLimits from "@/components/WashWithoutLimits";
import FourSteps from "@/components/FourSteps";
import UseCase from "@/components/UseCase";
import ComparisonTable from "@/components/ComparisonTable";
import CompactModules from "@/components/CompactModules";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <StatsBar />
      <EngineeredPerformance />
      <ProfessionalCleaning />
      <WashWithoutLimits />
      <FourSteps />
      <UseCase />
      <ComparisonTable />
      <CompactModules />
      <CTABanner />
      <Footer />
    </main>
  );
}
