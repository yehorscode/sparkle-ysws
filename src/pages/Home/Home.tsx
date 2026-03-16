import hc_flag from "@/assets/hc-flag-white.svg";
import sparkle_bg_1920x1080 from "@/assets/sparkle_bg_full_1920x1080.webp";
import sparkle_bg_2560x1440 from "@/assets/sparkle_bg_2560x1440.webp";
import { type ReactNode, useEffect, useState } from "react";
import cloud from "@/assets/cloud.png";
import yehorPfp from "@/assets/yehor.jpeg";
import zookPfp from "@/assets/zook.png";
import candyPfp from "@/assets/candy.png";
import ansonPfp from "@/assets/anson.jpeg";
import overcooked2 from "@/assets/overcooked2.png";
import picopark from "@/assets/picopark.jpg";
import dittoplushie from "@/assets/dittoplushie.jpg";
import ittakestwo from "@/assets/ittakestwo.jpg";
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
  const rsvpHelperApiKey = import.meta.env.VITE_RSVP_HELPER_API_KEY ?? "";
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

  async function rsvp_handler(email: string) {
    if (!email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!email.includes(".")) {
      toast.error("Please enter a valid email address");
      return;
    }

    const searchParams = new URLSearchParams({
      email,
    });

    try {
      const response = await fetch(
        "https://rsvphelper.anscg.net/api/v1/slack/users/by-email",
        {
          method: "POST",
          headers: {
            "x-api-key": rsvpHelperApiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ emails: [email] }),
        },
      );

      if (!response.ok) {
        throw new Error(`RSVP helper lookup failed with status ${response.status}`);
      }

      const data: {
        results?: Array<{
          ok?: boolean;
          found?: boolean;
          slackId?: string;
          realName?: string;
        }>;
      } = await response.json();

      const firstResult = data.results?.[0];

      if (firstResult?.ok && firstResult.found) {
        if (firstResult.realName) {
          searchParams.set("name", firstResult.realName);
        }
        if (firstResult.slackId) {
          searchParams.set("slackid", firstResult.slackId);
        }
      }
    } catch (error) {
      console.error("RSVP helper lookup failed", error);
    }

    window.location.href = `https://forms.fillout.com/t/e2tRAi4Lh4us?${searchParams.toString()}`;
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
              void rsvp_handler(email);
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
                <h2 className="font-dynapuff text-4xl font-bold sm:text-5xl md:text-6xl">
                  What is sparkle? ✨
                </h2>
                <span className="h-[3px] flex-1 bg-gradient-to-r from-transparent to-black/70" />
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
                , and journal your learning process!
              </CloudStepCard>
              <CloudStepCard step="4" className="rotate-[-0.7deg]" floatDelay="1.2s">
                <b>Earn cool prizes.</b> You and your friend both get rewarded.
              </CloudStepCard>
            </div>
          </div>
        </section>

        <section className="font-dynapuff w-full px-4 pb-8 text-black sm:px-6 sm:pb-10 lg:px-10">
          <div className="mx-auto w-full max-w-6xl">
            <div className="mb-8 text-center sm:mb-10">
              <div className="mb-3 flex items-center gap-4 sm:gap-6">
              <span className="h-[3px] flex-1 bg-gradient-to-r from-black/70 to-transparent" />
              <h2 className="font-dynapuff text-4xl font-bold sm:text-5xl md:text-6xl">
                Potential Prizes
              </h2>
              <span className="h-[3px] flex-1 bg-gradient-to-r from-transparent to-black/70" />
              </div>
              <p className="mx-auto mt-3 max-w-3xl text-base text-black/80 sm:text-lg">
                Some great prizes that you can get by learning something with your friend and making a project with it!
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  image: ittakestwo,
                  fallback: "1",
                  title: "It Takes Two",
                  description: "A wild Co-Op 3D Action Adventure Platformer that will make your head spin. Was the first prize we ever thought of as a prize because of its 2-player nature.",
                },
                {
                  image: overcooked2,
                  fallback: "2",
                  title: "Overcooked 2",
                  description: "An awesome cooking game for 1-4 players. Zook did not hit his brother over a missed burger order last time they played.",
                },
                {
                  image: picopark,
                  fallback: "3",
                  title: "Pico Park",
                  description: "A cooperative multiplayer, action-puzzle independent game. Perfect with friends.",

                },
                {
                  image: dittoplushie,
                  fallback: "4",
                  title: "A Ditto Plushie",
                  description: "A cute plushie perfect for cuddling. You should definitely get this.",
                },
                {
                  image: "",
                  fallback: "5",
                  title: "More Prizes",
                  description: "We will decide on more prizes in the future!",
                },
                {
                  image: "",
                  fallback: "6",
                  title: "More Prizes",
                  description: "We will decide on more prizes in the future!",
                },
              ].map(({ image, fallback, title, description }) => (
                <div
                  key={title}
                  className="flex flex-col border-4 border-black/50 bg-white/20 p-4"
                >
                  <div className="flex justify-center">
                    {image ? (
                      <img
                        src={image}
                        alt={title}
                        className="w-48 aspect-square object-cover object-center border-4 border-black/20"
                      />
                    ) : (
                      <div className="flex w-48 aspect-square items-center justify-center border-4 border-black/20 bg-cyan-100 text-4xl font-bold text-black/50">
                        {fallback}
                      </div>
                    )}
                  </div>
                  <h3 className="mt-3 text-xl font-bold">{title}</h3>
                  <p className="mt-1 text-base text-black/80">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="text-black flex items-center justify-center w-full px-4 py-8 sm:px-6 sm:py-10">
          <div className="w-full max-w-5xl">
          <div className="mb-6 flex items-center gap-4 sm:gap-6">
            <span className="h-[3px] flex-1 bg-gradient-to-r from-black/70 to-transparent" />
            <h2 className="font-dynapuff text-4xl font-bold sm:text-5xl md:text-6xl">FAQ</h2>
            <span className="h-[3px] flex-1 bg-gradient-to-r from-transparent to-black/70" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:gap-5">
            <div className="flex flex-col border-4 border-black/50 bg-white/20 p-3 text-lg">
              <span className="font-dynapuff">
                Q: What do I do if I don't have a friend?
              </span>
              <span className="font-medium">
                A: We <b>can</b> find one for you, but we highly encourage you to talk more on Slack and we're sure that someone will be willing to pair up with you!
              </span>
            </div>
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
                you taught your partner something interesting... we <span className="font-bold italic">might</span> give yo
                <span className="whitespace-nowrap">
                  u a special prize 
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
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 border-4 border-black/50 bg-white/20 p-3 text-lg">
              <span className="font-dynapuff flex-1">Still have questions? Join us on Slack!</span>
              <div className="flex gap-2">
                <button
                  className="bg-amber-400 border-2 border-black/30 px-3 py-1.5 font-semibold hover:scale-90 transition-all"
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
                  className="bg-red-500 border-2 border-black/30 px-3 py-1.5 font-semibold text-white hover:scale-90 transition-all"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open("https://hackclub.com/slack", "_blank");
                  }}
                >
                  Join Hack Club Slack
                </button>
              </div>
            </div>
          </div>
          </div>
        </section>

      <section className="w-full font-dynapuff py-12 px-4 sm:px-6 lg:px-10 text-black">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex items-center gap-4 sm:gap-6">
            <span className="h-[3px] flex-1 bg-gradient-to-r from-black/70 to-transparent" />
            <h2 className="font-dynapuff text-4xl font-bold sm:text-5xl md:text-6xl">The Team</h2>
            <span className="h-[3px] flex-1 bg-gradient-to-r from-transparent to-black/70" />
          </div>
          <p className="mb-10 text-center text-base text-black/70 sm:text-lg max-w-2xl mx-auto">
            Meet the people behind Sparkle — we're a group of people who believe the best way to learn is with a friend by your side.
          </p>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                initials: "Y",
                color: "bg-purple-400",
                name: "Yehor",
                handle: "@yehor",
                role: "Developer",
                bio: "Made the website from scratch. Owns the repo and tried to draw the clouds. Claims to not have a quote but here we are.",
                quote: "Maybe try making a meta or a post in hq",
                photo: yehorPfp,
              },
              {
                initials: "Z",
                color: "bg-yellow-400",
                name: "Zac T",
                handle: "@zook",
                role: "Lead Organizer and Developer",
                bio: "Has no skills whatsover. Came up with the idea on his bed and fell off his bed trying to write it somewhere. Now knows what TypeScript and React are.",
                quote: "chat will drinking 3 coffees in a day kill me",
                photo: zookPfp,
              },
              {
                initials: "C",
                color: "bg-pink-400",
                name: "Candy",
                handle: "@candy",
                role: "Artist",
                bio: "Created the background for the website and designed the two mascots!",
                quote: "what if the blue cat was just radioactive water and the other cat is like a banana or something",
                photo: candyPfp,
              },
              {
                initials: "A",
                color: "bg-green-400",
                name: "Anson Chung",
                handle: "@Anson Chung",
                role: "The Unemployed",
                bio: "Decides to make a PR because he thinks the clouds were too spread out on the previous version of the website.",
                quote: "I'd recommend removing ur jd Vance meme folder before applying for the visa",
                photo: ansonPfp,
              },
            ].map(({ initials, color, name, handle, role, bio, quote, photo }) => (
              <div
                key={handle}
                className="flex flex-col border-4 border-black/50 bg-white/20 hover:scale-105 transition-transform duration-200"
              >
                <div className="flex justify-center pt-4">
                  {photo ? (
                    <img
                      src={photo}
                      alt={name}
                      className="w-24 aspect-square object-cover object-top border-4 border-black/20"
                    />
                  ) : (
                    <div
                      className={`${color} flex w-24 aspect-square items-center justify-center text-4xl font-bold text-white border-4 border-black/20`}
                    >
                      {initials}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2 p-3 text-lg">
                  <div>
                    <p className="font-dynapuff text-xl font-bold leading-tight">{name}</p>
                    <p className="text-sm text-black/50">{handle}</p>
                  </div>
                  <span className="self-start bg-black/10 px-2 py-0.5 text-sm font-semibold">
                    {role}
                  </span>
                  <p className="font-medium text-black/80 leading-snug">{bio}</p>
                  <blockquote className="border-l-4 border-black/30 pl-3 text-sm italic text-black/60">
                    "{quote}"
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
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
              void rsvp_handler(email);
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
            Made with ✨ by the Sparkle team. Go join #zacs-corner :){" "}
          </span>
        </div>
      </section>
    </div>
  );
};

export default PageHome;
