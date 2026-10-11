import Hero from "../Components/About/Hero";
import Stats from "../Components/About/Stats";
import WhyChoose from "../Components/About/WhyChoose";
import Journey from "../Components/About/Journey";
import CTA from "../Components/About/CTA";

export const About =() => {
  return (
    <div className="bg-white">
      <Hero />
      <Stats />
      <WhyChoose />
      <Journey />
      <CTA />
    </div>
  );
}