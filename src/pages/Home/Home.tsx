import { lazy, Suspense } from "react";
import ExplainerSection from "./sections/explainer_section";
import { HeroSection } from "./sections/hero_section";

const FooterSection = lazy(() => import("./sections/footer_section"));
const LearningPathsSection = lazy(
  () => import("./sections/learning_paths_section"),
);
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
      <div className="bg-[linear-gradient(to_bottom,_#f3e9b2_0%,_#b1e9fc_22%,_#141a2e_82%,_#020305_100%)] transition-colors dark:bg-linear-to-b dark:from-[#5f5dba]/80 dark:via-slate-950/90 dark:to-slate-900/100">
        <ExplainerSection />

        <Suspense fallback={<SectionFallback />}>
          <LearningPathsSection />
        </Suspense>

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
