import HeroSection from "@/components/home/HeroSection";
import DifferentiatorSection from "@/components/home/DifferentiatorSection";
import OurOffersSection from "@/components/home/OurOffersSection";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import IndustryGridSection from "@/components/home/IndustryGridSection";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import TrustedBrands from "@/components/home/TrustedBrands";
import InsightsPreview from "@/components/home/InsightsPreview";
import TechStack from "@/components/home/TechStack";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <DifferentiatorSection />
      <OurOffersSection />
      <FeaturedProjects />
      <IndustryGridSection />
      <TestimonialsCarousel />
      <TrustedBrands />
      <TechStack/>
      <InsightsPreview/>
    </main>
  );
}