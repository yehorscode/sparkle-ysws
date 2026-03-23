import { useTheme } from "@/components/theme-provider";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
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
import hc_flag_white from "@/assets/hc-flag-white.svg";
import hc_flag_black from "@/assets/hc-flag-black.svg";
import { toast } from "sonner";
import rsvp_handler from "@/components/rsvp_handler";
import { Moon, Sun } from "lucide-react";

const HERO_BG_LIGHT = "/assets/sparkle_bg_1920x1080.webp";
const HERO_BG_LIGHT_DESKTOP = "/assets/sparkle_bg_2560x1440.webp";
const HERO_BG_DARK = "/assets/dark_bg_1920x1080.webp";
const HERO_BG_DARK_DESKTOP = "/assets/dark_bg_2560x1440.webp";

export const HeroSection = () => {
  const submissionsKey = "rsvp-submittions";
  const timestampKey = "submittions-fetch-timestamp";
  const ttlMs = 5 * 60 * 1000;
  const requestTimeoutMs = 8000;
  const [email, setEmail] = useState("");
  const { theme, setTheme } = useTheme();
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 2200 : false,
  );

  const [rsvpSubmittions, setRsvpSubmittions] = useState<number>(() => {
    const cached = localStorage.getItem("rsvp-submittions");
    return cached ? Number.parseInt(cached, 10) || 0 : 0;
  });
  useEffect(() => {
    const updateViewport = () => {
      setIsDesktop(window.innerWidth >= 2200);
    };
    updateViewport();
    window.addEventListener("resize", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  const heroBackground =
    theme === "dark"
      ? isDesktop
        ? HERO_BG_DARK_DESKTOP
        : HERO_BG_DARK
      : isDesktop
        ? HERO_BG_LIGHT_DESKTOP
        : HERO_BG_LIGHT;

  useEffect(() => {
    const cachedSubmissions = localStorage.getItem(submissionsKey);
    const cachedTimestamp = localStorage.getItem(timestampKey);

    const timestampMs = cachedTimestamp ? Date.parse(cachedTimestamp) : NaN;
    const isNew =
      Number.isFinite(timestampMs) && Date.now() - timestampMs < ttlMs;

    if (cachedSubmissions && isNew) {
      return;
    }

    const wait = (ms: number) =>
      new Promise((resolve) => {
        setTimeout(resolve, ms);
      });

    const fetchSubmissions = async () => {
      let attempt = 0;

      try {
        while (attempt < 2) {
          try {
            const response = await axios.get(
              "https://starlight.sparkle.dino.icu/tempapi/rsvp-submissions",
              { timeout: requestTimeoutMs },
            );
            const total = Number(response.data?.total_submissions ?? 0);

            setRsvpSubmittions(total);
            localStorage.setItem(submissionsKey, String(total));
            localStorage.setItem(timestampKey, new Date().toISOString());
            return;
          } catch {
            attempt += 1;
            if (attempt >= 2) {
              throw new Error("RSVP submissions fetch failed after retries");
            }

            await wait(900);
          }
        }
      } catch (error) {
        toast.error("Failed to fetch RSVP submissions");
        console.error("Failed to fetch RSVP submissions", error);
      }
    };

    void fetchSubmissions();
  }, []);
  return (
    <section
      className="relative flex h-[85vh] w-full justify-center overflow-hidden"
    >
      <img
        src={heroBackground}
        alt="Sparkle hero background"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
        fetchPriority="high"
        loading="eager"
        decoding="async"
      />
      <div className="absolute right-4 top-3 z-100">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button className="rounded-full font-light font-dynapuff border-gray-400 border-2 bg-white text-black">
              {theme === "light" ? (
                <Sun size={20} className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              ) : (
                <Moon size={20} className="scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
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
        <img
          src={theme === "dark" ? hc_flag_white : hc_flag_black}
          alt="Hack Club flag"
          width="120px"
        />
      </div>

      {/* Centered hero content */}
      <div className="absolute inset-0 flex flex-col items-center justify-start pt-12 text-center px-4 gap-3 sm:pt-16 md:pt-20">
        <h1
          className="font-dynapuff drop-shadow-[0_1.2px_5px_rgba(0,0,0,0.6)] text-6xl font-bold text-white sm:text-7xl md:text-8xl xl:text-9xl"
        >
          Sparkle
        </h1>
        <p className="font-dynapuff drop-shadow-[0_1.2px_5px_rgba(0,0,0,0.6)] max-w-xl text-lg text-white text-shadow-lg dark:text-white  sm:text-xl md:text-2xl">
          A YSWS where friends teach each other skills, ship a project, and get
          rewarded together.
        </p>
        {/* RSVP form */}
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
      <span className="absolute bottom-5 drop-shadow-[0_1.2px_5px_rgba(0,0,0,0.6)] text-xl text-[#464646] dark:text-white font-dynapuff">
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
