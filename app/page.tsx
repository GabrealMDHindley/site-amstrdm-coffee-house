import Hero from "@/components/Hero";
import WelcomeIntro from "@/components/WelcomeIntro";
import MenuHighlights from "@/components/MenuHighlights";
import LocationsSplit from "@/components/LocationsSplit";
import RatingBadges from "@/components/RatingBadges";
import InstagramStrip from "@/components/InstagramStrip";
import CTABanner from "@/components/CTABanner";

export default function Home() {
  return (
    <>
      <Hero />
      <WelcomeIntro />
      <MenuHighlights />
      <LocationsSplit />
      <RatingBadges />
      <InstagramStrip />
      <CTABanner />
    </>
  );
}
