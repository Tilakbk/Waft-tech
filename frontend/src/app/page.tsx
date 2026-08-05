import HeroSection from "@/components/home/HeroSection";
import DifferentiatorSection from "@/components/home/DifferentiatorSection";
import OurOffersSection from "@/components/home/OurOffersSection";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import IndustryGridSection from "@/components/home/IndustryGridSection";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import TrustedBrands from "@/components/home/TrustedBrands";
import InsightsPreview from "@/components/home/InsightsPreview";
import TechStack from "@/components/home/TechStack";
import { getPublishedProjects } from "@/lib/api/projects";


export default async  function Home() {
    const { content: rawProjects } = await getPublishedProjects(undefined, 0, 3);
    const projects = rawProjects.map((p) => ({
        ...p,
        title: p.title.split(/[;:]/)[0].trim(),
    }));

  return (
    <main>
      <HeroSection />
      <DifferentiatorSection />
      <OurOffersSection />
      <FeaturedProjects  projects={projects}/>
      <IndustryGridSection />
      <TestimonialsCarousel />
      <TrustedBrands />
      <TechStack/>
      <InsightsPreview/>
    </main>
  );
}