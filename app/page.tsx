import HeroSection from "@/components/home/HeroSection";
import HorizontalScrollSection from "@/components/home/HorizontalScrollSection";
import PersonalBusinessSplit from "@/components/home/PersonalBusinessSplit";
import EmbedConvertSection from "@/components/home/EmbedConvertSection";
import SecurityComposition from "@/components/home/SecurityComposition";
import FAQPreview from "@/components/home/FAQPreview";
import CTABand from "@/components/home/CTABand";

export default function Home() {
  return (
    <>
      <HeroSection />
      <HorizontalScrollSection />
      {/* <PersonalBusinessSplit /> */}
      <EmbedConvertSection />
      <SecurityComposition />
      <FAQPreview />
      <CTABand />
    </>
  );
}
