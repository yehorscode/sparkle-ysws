import hc_flag from "@/assets/hc-flag-white.svg";
import sparkle_bg_1920x1080 from "@/assets/sparkle_bg_full_1920x1080.webp";
import sparkle_bg_2560x1440 from "@/assets/sparkle_bg_2560x1440.webp";
import { type ReactNode, useEffect, useState } from "react";
import cloud from "@/assets/cloud.png";
import { toast } from "sonner";
import eyeshake from "@/assets/eyeshake.gif";
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
        className="cloud-float flex w-full aspect-12/10 flex-col items-center justify-center bg-center bg-no-repeat px-10 text-center transition-all duration-200 sm:bg-size-[120%_auto] sm:px-14 md:px-16"
        style={{
          backgroundImage: `url(${cloud})`,
          backgroundSize: "130% auto",
          animationDelay: floatDelay,
        }}
      >
        <div className="flex w-7/10 flex-col text-left">
          <span className="text-3xl font-bold sm:text-4xl">{step}.</span>
          <span className="text-2xl leading-tight lg:text-[1.7rem]">{children}</span>
        </div>
      </div>
    </div>
  );
};

const PageHome = () => {
  const [email, setEmail] = useState("");
  const bg_1920x1080 = sparkle_bg_1920x1080;
  const bg_2560x1440 = sparkle_bg_2560x1440;
  // const [sparkleClicks, setSparkleClicks] = useState(0);
  const selectBackground = (width: number) =>
    width >= 2200 ? bg_2560x1440 : bg_1920x1080;

  const [heroBackground, setHeroBackground] = useState(() =>
    typeof window === "undefined"
      ? bg_1920x1080
      : selectBackground(window.innerWidth),
  );

  useEffect(() => {
    const updateBackground = () => {
      setHeroBackground(selectBackground(window.innerWidth));
    };

    updateBackground();
    window.addEventListener("resize", updateBackground);

    return () => {
      window.removeEventListener("resize", updateBackground);
    };
  }, []);

  function rsvp_handler(email: string) {
    if (!email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!email.includes(".")) {
      toast.error("Please enter a valid email address");
      return;
    }
    window.location.href = `https://forms.fillout.com/t/e2tRAi4Lh4us?email=${encodeURIComponent(email)}`;
  }
  return (
    <div className="w-full">
      <section
        className="relative flex h-[85vh] w-full justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute left-1/2 top-3 -translate-x-1/2 sm:top-4 w-30">
          <img
            src={hc_flag}
            alt="Hack Club flag transparent white"
            width={"120px"}
          />

          {/* <a href="https://hackclub.com/">
            <img
              style={{
                position: "absolute",
                top: 0,
                left: 10,
                border: "none",
                width: "256px",
                zIndex: 999,
              }}
              src="https://assets.hackclub.com/flag-orpheus-top.svg"
              alt="Hack Club"
            />
          </a> */}
        </div>
        <div className="self-start md:w-3/4 mt-30 sm:mt-28 md:mt-26 lg:mt-30 xl:mt-40 flex flex-col  text-[#ffffff] text-shadow-md bg-amber-300/80 md:rounded-2xl p-5">
          <span className="font-dynapuff opacity-80 sm:text-lg md:text-xl">
            RSVP form available
          </span>
          <h1 className="font-dynapuff text-2xl font-bold leading-tight sm:text-3xl md:text-4xl xl:text-5xl">
            Learn something from your friends, ship a project, and get rewards!
          </h1>
          <form
            className="mt-4 flex rounded bg-accent/50 p-2 text-black sm:mt-5"
            onSubmit={(e) => {
              e.preventDefault();
              rsvp_handler(email);
            }}
          >
            <input
              placeholder="name@email.com"
              className="font-dynapuff flex-1 text-base outline-none placeholder:text-black/50 placeholder:text-base sm:text-lg sm:placeholder:text-lg md:text-xl md:placeholder:text-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="border-2 hover:scale-110 transition-all border-black p-2 text-base font-bold hover:cursor-pointer sm:text-lg md:text-xl"
              // onClick={() => rsvp_handler(email)}
            >
              RSVP
            </button>
          </form>
        </div>
        <span className="absolute bottom-5 text-xl text-cyan-500 drop-shadow-xl">
          Scroll down to learn more!
        </span>
        {/* <span
          className="absolute bottom-10 right-10 text-7xl p-5 hover:cursor-pointer"
          onClick={() => alert("e")}
        >
          ✨
        </span> */}
      </section>

      <div className="bg-gradient-to-b from-cyan-200/80 via-cyan-300/65 to-cyan-400/80">
        <section className="font-dynapuff w-full px-4 pt-18 pb-12 text-black sm:px-6 sm:pt-20 sm:pb-14 lg:px-10">
          <div className="mx-auto w-full max-w-6xl">
            <div className="mb-8 text-center sm:mb-10">
              <div className="mb-3 flex items-center gap-4 sm:gap-6">
                <span className="h-[3px] flex-1 bg-gradient-to-r from-black/70 to-transparent" />
                <h2 className="text-4xl font-bold sm:text-5xl md:text-6xl">
                  What is sparkle? ✨
                </h2>
                <span className="h-[3px] flex-1 bg-gradient-to-r from-transparent to-black/70" />
              </div>
              <p className="mx-auto mt-3 max-w-3xl text-base text-black/80 sm:text-lg">
                A collaborative build sprint where friends teach each other,
                ship fast, and unlock rewards together.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-y-2 md:grid-cols-2 md:gap-x-4 md:gap-y-3">
              <CloudStepCard step="1" className="rotate-[-0.9deg]" floatDelay="0s">
                <b>Get a friend</b> and invite them to join you.
              </CloudStepCard>
              <CloudStepCard step="2" className="rotate-[0.8deg]" floatDelay="0.9s">
                <b>Learn together.</b> Make your friend teach you a new skill.
                Or maybe a new language?
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
                .
              </CloudStepCard>
              <CloudStepCard step="4" className="rotate-[-0.7deg]" floatDelay="1.2s">
                <b>Earn cool prizes.</b> You and your friend both get rewarded.
              </CloudStepCard>
            </div>
          </div>
        </section>

        <section className="text-black flex items-center justify-center w-full px-4 py-8 sm:px-6 sm:py-10">
          <div className="w-full max-w-5xl">
          <div className="mb-6 flex items-center gap-4 sm:gap-6">
            <span className="h-[3px] flex-1 bg-gradient-to-r from-black/70 to-transparent" />
            <h2 className="font-dynapuff text-3xl sm:text-4xl md:text-5xl">FAQ</h2>
            <span className="h-[3px] flex-1 bg-gradient-to-r from-transparent to-black/70" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:gap-5">
            <div className="flex flex-col border-4 border-black/50 bg-white/20 p-3 text-lg">
              <span className="font-dynapuff">
                Q: Does the project need to be a code project?
              </span>
              <span className="font-medium">
                A: Yes! Your project must have a public github repo and have
                time tracked on <a
                    href="https://hackatime.hackclub.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-[#FD3A4F]"
                  >
                    Hackatime
                  </a>.
              </span>
            </div>
            <div className="flex flex-col border-4 border-black/50 bg-white/20 p-3 text-lg">
              <span className="font-dynapuff">
                Q: What can I learn from my partner/teacher?
              </span>
              <span className="font-medium">
                A: Anything you like! You and your partner just have to make a
                project out of it, and journal it so we know you have been
                learning! Please note that you are required to journal the
                learning process per week in order to make your hours count! If
                you taught your partner something interesting... we <span className="font-bold italic">MIGHT</span> offer be
                <span className="whitespace-nowrap">
                  tter rates for you
                  <img src={eyeshake} alt="" className="ml-1 inline w-5" />
                </span>
              </span>
            </div>
            <div className="flex flex-col border-4 border-black/50 bg-white/20 p-3 text-lg">
              <span className="font-dynapuff">
                Q: Why should I do this when I can do other ysws(s) without the learning process?
              </span>
              <span className="font-medium">
                A: Unlike other YSWS(s) where you're working alone or just building for the sake of building, this program is specifically designed for <b>skill transfer and collaboration between people</b>! No more wishing that you had their skills, start doing this with your friend so they can teach you their ways!
              </span>
            </div>
          </div>
          </div>
        </section>

        <section className="w-full font-dynapuff py-10">
          <div className="flex flex-col md:flex-row w-full bg-cyan-300 border-4 border-x-0 items-center justify-center gap-4 p-4">
            <h1 className="text-4xl">
                Questions left?
              <br /> <u>Join our Slack channel</u>
            </h1>
            <button
              className="bg-yellow-300 p-4 rounded-full hover:scale-120 transition-all"
              onClick={(e) => {
                e.preventDefault();
                window.open(
                  "https://hackclub.enterprise.slack.com/archives/C0AG9ASJ5U4",
                  "_blank",
                );
              }}
            >
              Open channel
            </button>
            <button
              className="bg-red-300 p-4 rounded-full hover:scale-120 transition-all"
              onClick={(e) => {
                e.preventDefault();
                window.open("https://hackclub.com/slack", "_blank");
              }}
            >
              Join Hack Club slack
            </button>
          </div>
      </section>

      <section className="w-full text-white font-dynapuff">
        <div className="p-4 text-center flex flex-col items-center">
          <span className="text-2xl sm:text-3xl ">
            What are you waiting for? RSVP now!
          </span>
          <form
            className="mt-4 w-1/2 flex rounded bg-white p-2 text-black sm:mt-5"
            onSubmit={(e) => {
              e.preventDefault();
              rsvp_handler(email);
            }}
          >
            <input
              placeholder="name@email.com"
              className="font-dynapuff flex-1 text-base outline-none placeholder:text-black/50 placeholder:text-base sm:text-lg sm:placeholder:text-lg md:text-xl md:placeholder:text-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="border-2 hover:scale-110 transition-all border-black p-2 text-base font-bold hover:cursor-pointer sm:text-lg md:text-xl"
              // onClick={() => rsvp_handler(email)}
            >
              RSVP
            </button>
          </form>
        </div>
      </section></div>

      <section className="w-full bg-black font-dynapuff">
        <div className="p-2 text-center">
          <span className="text-xs sm:text-sm text-gray-400">
            Website - @yehor & @zook,  Ideas - @zook, Art -  @candy
          </span>
        </div>
      </section>
    </div>
  );
};

export default PageHome;
