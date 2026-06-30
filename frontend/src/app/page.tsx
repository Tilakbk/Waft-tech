import HeroSection from "@/components/home/HeroSection";
import DifferentiatorSection from "@/components/home/DifferentiatorSection";
import OurOffersSection from "@/components/home/OurOffersSection";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import IndustryGridSection from "@/components/home/IndustryGridSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <DifferentiatorSection />
      <OurOffersSection />
      <FeaturedProjects />
      <IndustryGridSection />
    </main>
  );
}