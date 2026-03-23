import overcooked2 from "@/assets/overcooked2.png";
import picopark from "@/assets/picopark.jpg";
import dittoplushie from "@/assets/dittoplushie.jpg";
import ittakestwo from "@/assets/ittakestwo.jpg";
import pikmin4 from "@/assets/pikmin4.jpg";

const PrizesSection = () => {
  return (
    <section className="font-dynapuff  w-full px-4 pb-8 text-black sm:px-6 sm:pb-10 lg:px-10 dark:text-white">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-8 text-center sm:mb-10">
          <div className="mb-3 flex items-center gap-4 sm:gap-6">
            <span className="h-0.75 flex-1 bg-linear-to-r from-black/70 to-transparent" />
            <h2 className="font-dynapuff text-4xl font-bold sm:text-5xl md:text-6xl">
              Potential Prizes
            </h2>
            <span className="h-0.75 flex-1 bg-linear-to-r from-transparent to-black/70" />
          </div>
          <p className="mx-auto mt-3 max-w-3xl text-base text-black/80 sm:text-lg dark:text-white/80">
            Some great prizes that you can get by learning something with your
            friend and making a project with it!
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              image: ittakestwo,
              fallback: "1",
              title: "It Takes Two",
              description:
                "A wild Co-Op 3D Action Adventure Platformer that will make your head spin. Was the first thing we ever thought of as a prize because of its 2-player nature.",
            },
            {
              image: overcooked2,
              fallback: "2",
              title: "Overcooked 2",
              description:
                "An awesome cooking game for 1-4 players. Zook did not hit his brother over a missed burger order last time they played.",
            },
            {
              image: picopark,
              fallback: "3",
              title: "Pico Park",
              description:
                "A cooperative multiplayer, action-puzzle independent game. Perfect with friends.",
            },
            {
              image: dittoplushie,
              fallback: "4",
              title: "A Ditto Plushie",
              description:
                "A cute plushie perfect for cuddling. You should definitely get this.",
            },
            {
              image: pikmin4,
              fallback: "5",
              title: "Pikmin 4",
              description:
                'A really popular nintendo switch game. Features cute little creatures called the "Pikmins".',
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
              className="flex hover:scale-103 transition-all duration-75 flex-col border-4 border-black/50 bg-white/20 p-4 dark:border-white/25 dark:bg-white/10"
            >
              <div className="flex justify-center">
                {image ? (
                  <img
                    src={image}
                    alt={title}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    className="w-48 aspect-square object-cover object-center border-4 border-black/20"
                  />
                ) : (
                  <div className="flex w-48 aspect-square items-center justify-center border-4 border-black/20 bg-cyan-100 text-4xl font-bold text-black/50">
                    {fallback}
                  </div>
                )}
              </div>
              <h3 className="mt-3 text-xl font-bold">{title}</h3>
              <p className="mt-1 text-base text-black/80 dark:text-white/80">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrizesSection;
