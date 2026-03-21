import type { ReactNode } from "react";
import sparkles from "@/assets/roundsparkles.png";
import cloud from "@/assets/cloud.webp";

type CloudStepCardProps = {
  step: string;
  children: ReactNode;
  className?: string;
  floatDelay?: string;
};
const CloudStepCard = ({
  step,
  children,
  className = "",
  floatDelay = "0s",
}: CloudStepCardProps) => {
  return (
    <div className={`mx-auto w-full ${className}`}>
      <div
        className="cloud-float flex w-full aspect-12/10 flex-col items-center justify-center bg-center bg-no-repeat px-5 text-center transition-all duration-200 sm:bg-size-[120%_auto] sm:px-5 md:px-10"
        style={{
          backgroundImage: `url(${cloud})`,
          backgroundSize: "130% auto",
          animationDelay: floatDelay,
        }}
      >
        <div className="flex w-7/10 sm:w-7/10 md:w-8/10 lg:w-7/10 flex-col text-left">
          <span className="text-3xl font-bold sm:text-4xl">{step}.</span>
          <span className="text-xl leading-tight sm:text-2xl md:text-lg lg:text-xl xl:text-2xl">
            {children}
          </span>
        </div>
      </div>
    </div>
  );
};

const ExplainerSection = () => {
  return (
    <section className="font-dynapuff w-full px-4 pt-18 pb-12 text-black sm:px-6 sm:pt-20 sm:pb-14 lg:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-8 text-center sm:mb-10">
          <div className="mb-3 flex items-center gap-4 sm:gap-6">
            <span className="h-0.75 flex-1 bg-linear-to-r from-black/70 to-transparent" />
            <h2 className="font-dynapuff text-3xl font-bold sm:text-5xl md:text-6xl">
              <img
                src={sparkles}
                alt=""
                className="relative -top-1 ml-1 inline w-15"
              />{" "}
              What is Sparkle?{" "}
              <img
                src={sparkles}
                alt=""
                className="relative -top-1 ml-1 inline w-15"
              />
            </h2>
            <span className="h-0.75 flex-1 bg-linear-to-r from-transparent to-black/70" />
          </div>
          <p className="mx-auto mt-3 max-w-3xl text-base text-black/80 sm:text-lg">
            A You Ship, We Ship (YSWS) where friends teach each other skills,
            ship a project, and get rewards together!
          </p>
        </div>
        <div className="grid grid-cols-1 gap-y-2 md:grid-cols-2 md:gap-x-4 md:gap-y-3">
          <CloudStepCard step="1" className="rotate-[-0.9deg]" floatDelay="0s">
            <b>Get a friend</b> and invite them to join you.
          </CloudStepCard>
          <CloudStepCard step="2" className="rotate-[0.8deg]" floatDelay="0.9s">
            <b>Learn together.</b> Make your friend teach you a new skill. Or
            maybe a new language?
          </CloudStepCard>
          <CloudStepCard step="3" className="rotate-[0.5deg]" floatDelay="0.4s">
            <b>Track your progress</b> via{" "}
            <a
              href="https://hackatime.hackclub.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline text-[#FD3A4F]"
            >
              Hackatime
            </a>
            , and journal your learning process!
          </CloudStepCard>
          <CloudStepCard
            step="4"
            className="rotate-[-0.7deg]"
            floatDelay="1.2s"
          >
            <b>Earn cool prizes.</b> You and your friend both get rewarded.
          </CloudStepCard>
        </div>
      </div>
    </section>
  );
};

export default ExplainerSection;
