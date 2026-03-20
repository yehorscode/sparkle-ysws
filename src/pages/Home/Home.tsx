import { lazy, Suspense } from "react";
import ExplainerSection from "./sections/explainer_section";
import { HeroSection } from "./sections/hero_section";

const FooterSection = lazy(() => import("./sections/footer_section"));
const RSVPReminderSection = lazy(() => import("./sections/rsvp_reminder_section"));
const PrizesSection = lazy(() => import("./sections/prizes_section"));
const QandASection = lazy(() => import("./sections/q_and_a_section"));
const TeamSection = lazy(() => import("./sections/team_section"));

const SectionFallback = () => (
  <div className="w-full px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
    <div className="mx-auto h-24 max-w-6xl animate-pulse bg-black/10 dark:bg-white/10" />
  </div>
);

const PageHome = () => {
  return (
    <div className="w-full">
      <HeroSection />
      <div className="bg-linear-to-b from-[#f3e9b2] via-cyan-300/65 to-[#8df1fe] transition-colors dark:from-[#f3e9b2] dark:via-slate-950 dark:to-slate-900">
        <ExplainerSection />

        <Suspense fallback={<SectionFallback />}>
          <PrizesSection />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <QandASection />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <TeamSection />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <RSVPReminderSection />
        </Suspense>
      </div>

      <Suspense fallback={<SectionFallback />}>
        <FooterSection />
      </Suspense>
    </div>
  );
};

export default PageHome;
