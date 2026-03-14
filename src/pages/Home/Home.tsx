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
};

const CloudStepCard = ({
  step,
  children,
  className = "",
}: CloudStepCardProps) => {
  return (
    <div
      className={`mx-auto flex duration-75 transition-all w-full aspect-12/10 flex-col items-center justify-center rounded bg-size-[130%_auto] bg-center bg-no-repeat px-10 text-center sm:max-w-xl sm:bg-size-[120%_auto] sm:px-16 sm:py-10 md:max-w-2xl md:bg-size-[110%_auto] md:px-20 lg:max-w-2xl ${className}`}
      style={{ backgroundImage: `url(${cloud})` }}
    >
      <div className="flex flex-col text-left w-7/10">
        <span className="text-3xl font-bold sm:text-4xl">{step}.</span>
        <span className="text-2xl leading-tight lg:text2xl">{children}</span>
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

      <section className="flex font-dynapuff min-h-screen w-full flex-col bg-cyan-400 px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 xl:flex-row">
          <div className="flex w-full flex-col items-center">
            <div className="flex items-center justify-center">
              <span className="text-5xl text-white sm:text-6xl font-bold">
                What is sparkle? ✨
              </span>
            </div>
            {/* boxes for explainers */}
            <div className="flex w-full -mt-10 flex-col -space-y-20 sm:-space-y-36 md:-space-y-50 lg:-space-y-45">
              <CloudStepCard step="1">
                <b>Get a friend</b> and invite them to join you
              </CloudStepCard>
              <CloudStepCard step="2">
                <b>Learn together.</b> Make your friend teach you a new skill.
                Or maybe a new language?
              </CloudStepCard>
              <CloudStepCard step="3">
                <b>Track your progress</b> via{" "}
                <a
                  href="https://hackatime.hackclub.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-500"
                >
                  Hackatime
                </a>
              </CloudStepCard>
              <CloudStepCard step="4">
                <b>Earn cool prizes!</b> You and your friend earn a reward!
              </CloudStepCard>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cyan-400 text-black  flex items-center justify-center w-full">
        <div className="md:w-5/6 xl:w-2/3 bg-yellow-300 border-4  border-x-0 items-center justify-center gap-4 p-4">
          <h1 className="text-5xl font-dynapuff text-center mb-5">FAQ</h1>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col border-4 border-black/50 p-2 text-lg">
              <span className="font-dynapuff">
                Q: Does the project need to be a code project?
              </span>
              <span className="font-medium">
                A: Yes! Your project must have a public github repo and have
                time tracked on Hackatime.
              </span>
            </div>
            <div className="flex flex-col border-4 border-black/50 p-2 text-lg">
              <span className="font-dynapuff">
                Q: What can I learn from my partner/teacher?
              </span>
              <span className="font-medium flex-wrap">
                A: Anything you like! You and your partner just have to make a
                project out of it, and journal it so we know you have been
                learning! Please note that you are required to journal the
                learning process per week in order to make your hours count! If
                you taught your partner something interesting... we MIGHT offer
                better rates for you <img src={eyeshake} alt="" className="w-5"/>
              </span>
            </div>
            <div className="flex flex-col border-4 border-black/50 p-2 text-lg">
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

      <section className="bg-cyan-400 w-full font-dynapuff py-10">
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

      <section className="w-full bg-black text-white font-dynapuff">
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
      </section>

      <section className="w-full bg-black font-dynapuff">
        <div className="p-2 text-center">
          <span className="text-xs sm:text-sm text-gray-400">
            Website - @yehor, Idea - @zook, Art - @candy
          </span>
        </div>
      </section>
    </div>
  );
};

export default PageHome;
