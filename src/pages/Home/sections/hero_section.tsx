import { useTheme } from "@/components/theme-provider";
import { useEffect, useState } from "react";
import { Moon, Sun } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import sparkle_bg_1920x1080 from "@/assets/sparkle_bg_full_1920x1080.webp";
import sparkle_bg_2560x1440 from "@/assets/sparkle_bg_2560x1440.webp";
import axios from "axios";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import hc_flag from "@/assets/hc-flag-white.svg";
import { toast } from "sonner";
import rsvp_handler from "@/components/rsvp_handler";

export const HeroSection = () => {
  const submissionsKey = "rsvp-submittions";
  const timestampKey = "submittions-fetch-timestamp";
  const ttlMs = 5 * 60 * 1000;
  const [email, setEmail] = useState("");

  const selectBackground = (width: number) =>
    width >= 2200 ? bg_2560x1440 : bg_1920x1080;
  const bg_1920x1080 = sparkle_bg_1920x1080;
  const bg_2560x1440 = sparkle_bg_2560x1440;
  const { theme, setTheme } = useTheme();
  const [heroBackground, setHeroBackground] = useState(() =>
    typeof window === "undefined"
      ? bg_1920x1080
      : selectBackground(window.innerWidth),
  );

  const [rsvpSubmittions, setRsvpSubmittions] = useState<number>(0);
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

  useEffect(() => {
    const cachedSubmissions = localStorage.getItem(submissionsKey);
    const cachedTimestamp = localStorage.getItem(timestampKey);

    const timestampMs = cachedTimestamp ? Date.parse(cachedTimestamp) : NaN;
    const isNew =
      Number.isFinite(timestampMs) && Date.now() - timestampMs < ttlMs;

    if (cachedSubmissions) {
      setRsvpSubmittions(Number.parseInt(cachedSubmissions, 10) || 0);
    }
    if (cachedSubmissions && isNew) return;

    const fetchSubmissions = async () => {
      try {
        const response = await axios.get(
          "https://starlight.thirtyseven.tech/tempapi/rsvp-submissions",
        );
        const total = Number(response.data?.total_submissions ?? 0);

        setRsvpSubmittions(total);
        localStorage.setItem(submissionsKey, String(total));
        localStorage.setItem(timestampKey, new Date().toISOString());
      } catch (error) {
        toast.error("Failed to fetch RSVP submissions");
        console.error("Failed to fetch RSVP submissions", error);
      }
    };

    void fetchSubmissions();
  }, []);
  return (
    <section
      className="relative flex h-[85vh] w-full justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
      <div className="absolute right-4 top-3 z-100">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button className="rounded-full font-light font-dynapuff border-gray-400 border-2 bg-white text-black">
              {theme === "light" ? (
                <Sun className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              ) : (
                <Moon className="scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              )}
              <span className="ml-2">
                {theme === "light" ? "Light" : "Dark"}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* HC flag — top left */}
      <div className="absolute left-4 top-3 sm:top-4 w-24 sm:w-28">
        <img src={hc_flag} alt="Hack Club flag" width="120px" />
      </div>

      {/* Centered hero content */}
      <div className="absolute inset-0 flex flex-col items-center justify-start pt-12 text-center px-4 gap-3 sm:pt-16 md:pt-20">
        <h1
          className="font-dynapuff text-6xl font-bold text-white drop-shadow-lg sm:text-7xl md:text-8xl xl:text-9xl"
          style={{
            textShadow: "0 0 4px rgba(0,0,0,0.3), 0 0 8px rgba(0,0,0,0.2)",
          }}
        >
          Sparkle
        </h1>
        <p className="font-dynapuff max-w-xl text-lg text-white text-shadow-lg dark:text-white drop-shadow sm:text-xl md:text-2xl">
          A YSWS where friends teach each other skills, ship a project, and get
          rewarded together.
        </p>
        {/* RSVP form */},
        <form
          className="mt-2 flex w-full max-w-md rounded bg-white/90 p-2 text-black shadow-lg"
          onSubmit={(e) => {
            e.preventDefault();
            void rsvp_handler(email);
          }}
        >
          <input
            placeholder="name@email.com"
            className="font-dynapuff flex-1 bg-transparent text-base outline-none placeholder:text-black/50 sm:text-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="border-2 border-black px-3 py-1 text-base font-bold hover:scale-110 transition-all hover:cursor-pointer sm:text-lg"
          >
            RSVP
          </button>
        </form>
        <TooltipProvider>
          <Tooltip>
            <TooltipContent className="relative md:-bottom-8 md:-rotate-20">
              <p>Updated live!!</p>
            </TooltipContent>
            <TooltipTrigger asChild>
              <span className="text-shadow-lg text-cyan-600 font-dynapuff relative md:bottom-7 md:left-55 md:-rotate-20 gap-1 justify-end text-right text-md">
                Join <span className="font-bold">{rsvpSubmittions}</span> RSVP'd
                people!
              </span>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
      </div>
      <span className="absolute bottom-5 text-xl text-[#515441] drop-shadow-xl">
        Scroll down to learn more!
      </span>
      {/* <span
          className="absolute bottom-10 right-10 text-7xl p-5 hover:cursor-pointer"
          onClick={() => alert("e")}
        >
          ✨
        </span> */}
    </section>
  );
};
