import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import TimelineSection from "@/components/home/TimelineSection";
import GuidesStrip from "@/components/home/GuidesStrip";
import TrustSection from "@/components/home/TrustSection";
import FeedbackSection from "@/components/home/FeedbackSection";

// Only the home page claims "/" as canonical (other pages set their own)
export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <TimelineSection />
      <GuidesStrip />
      <TrustSection />
      <FeedbackSection />
    </>
  );
}
