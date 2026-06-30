import HeroSection from "@/components/home/HeroSection";
import DifferentiatorSection from "@/components/home/DifferentiatorSection";
import OurOffersSection from "@/components/home/OurOffersSection";
import FeaturedProjects from "@/components/home/FeaturedProjects";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <DifferentiatorSection />
      <OurOffersSection />
      <FeaturedProjects/>
    </main>
  );
}