import hc_flag from "@/assets/hc-flag-white.svg";
import sparkle_bg_1920x1080 from "@/assets/sparkle_bg_1920x1080.webp";
import sparkle_bg_2560x1440 from "@/assets/sparkle_bg_2560x1440.webp";
import { useEffect, useState } from "react";
const PageHome = () => {
  const [email, setEmail] = useState("");
  const bg_1920x1080 = sparkle_bg_1920x1080;
  const bg_2560x1440 = sparkle_bg_2560x1440;

  const selectBackground = (width: number) =>
    width >= 2200 ? bg_2560x1440 : bg_1920x1080;

  const [heroBackground, setHeroBackground] = useState(() =>
    typeof window === "undefined" ? bg_1920x1080 : selectBackground(window.innerWidth),
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
      alert("Please enter a valid email address");
      return;
    }
    if (!email.includes(".")) {
      alert("Please enter a valid email address");
      return;
    }
    alert(`RSVP for email ${email}`);
  }
  return (
    <div className="w-full">
      <section
        className="relative flex h-screen w-full justify-center bg-cover bg-center p-3 sm:p-4"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute left-1/2 top-3 -translate-x-1/2 sm:top-4 w-30">
          <img src={hc_flag} alt="Hack Club flag transparent white" width={"120px"}/>

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
        <div className="flex flex-col pt-60 sm:pt-48 md:pt-36 lg:pt-50 text-center text-[#ffffff] text-shadow-md">
          <span className="pb-4 text-base opacity-80 sm:pb-5 sm:text-lg md:text-xl">
            RSVP form available
          </span>
          <h1 className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl lg:text-5xl">
            Learn from a friend and get rewards!
          </h1>
          <div className="mt-4 flex rounded bg-accent/50 p-2 text-black sm:mt-5">
            <input
              placeholder="name@email.com"
              className="flex-1 text-base outline-none placeholder:text-black placeholder:text-base sm:text-lg sm:placeholder:text-lg md:text-xl md:placeholder:text-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="border-2 border-black p-2 text-base font-bold hover:cursor-pointer sm:text-lg md:text-xl"
              onClick={() => rsvp_handler(email)}
            >
              RSVP
            </button>
          </div>
        </div>
        <span className="absolute bottom-10 text-xl text-white drop-shadow-xl bg-">
          Scroll down to learn more!
        </span>
      </section>

      <section className="flex min-h-screen w-full flex-col p-6 bg-black">
        <div className="flex flex-col gap-6 p-10 items-start">
          <div className="">
          <span className="text-4xl text-white">What is sparkle?</span>
          </div>
          {/* boxes for explainers */}
          <div className="grid grid-cols-2 gap-10">
            <div className="w-70 h-70 bg-amber-200 p-5 flex flex-col gap-2">
              <span className="font-bold text-3xl">1.</span>
              <span className="text-2xl">Get a friend</span>
            </div>
            <div className="w-70 h-70 bg-amber-200 p-5 flex flex-col gap-2">
              <span className="font-bold text-3xl">2.</span>
              <span className="text-2xl">Learn together</span>
            </div>
            <div className="w-70 h-70 bg-amber-200 p-5 flex flex-col gap-2">
              <span className="font-bold text-3xl">3.</span>
              <span className="text-2xl">Earn cool prizes!</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PageHome;
