import IntroLoader from "@/components/home/intro-loader";
import Hero from "@/components/home/hero";
import StatsBar from "@/components/home/stats-bar";
import HowItWorks from "@/components/home/how-it-works";
import QuizCta from "@/components/home/quiz-cta";
import CompanyListing from "@/components/home/company-listing";
import AreaDiscovery from "@/components/home/area-discovery";
import { SectorFilterProvider } from "@/components/home/sector-filter-context";
import ProblemSolution from "@/components/home/problem-solution";
import Faq from "@/components/home/faq";
import FinalCta from "@/components/home/final-cta";

/**
 * The page no longer waits on the intro. Content renders immediately and
 * <IntroLoader /> lays a curtain over it for under a second — so the hero
 * is the LCP element on its own timeline, and nothing can leave the page
 * blank if the intro misbehaves.
 */
export default function Home() {
  return (
    <>
      <IntroLoader />
      <Hero />
      <StatsBar />
      <HowItWorks />
      <QuizCta />
      <SectorFilterProvider>
        <CompanyListing />
        <AreaDiscovery />
      </SectorFilterProvider>
      <ProblemSolution />
      <Faq />
      <FinalCta />
    </>
  );
}
