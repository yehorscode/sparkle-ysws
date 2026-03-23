import webdev from "@/assets/webdev.webp";
import gamedev from "@/assets/gamedev.webp";
import drawing from "@/assets/drawing.webp";



const learningPaths = [
  {
    title: "Web Dev",
    duration: "4 weeks",
    focus: "HTML, CSS, and React basics",
    project: "Build a cute website that showcases your skills.",
    image: webdev,
    imageAlt: "Web path preview",
  },
  {
    title: "Game Dev",
    duration: "4 weeks",
    focus: "Gameplay loops, sprites, and polish",
    project: "Ship a small co-op game and playtest with friends.",
    image: gamedev,
    imageAlt: "Game path preview",
  },
  {
    title: "Art and Drawing",
    duration: "4 weeks",
    focus: "Sprite making, background creation and character design",
    project: "Learn how to draw and use it in your projects!",
    image: drawing,
    imageAlt: "Art path preview",
  },
];

const LearningPathsSection = () => {
  return (
    <section className="w-full  px-4 py-10 font-dynapuff text-black dark:text-white sm:px-6 sm:py-12 lg:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-8  text-center sm:mb-10">
          <div className="mb-3  flex items-center gap-4 sm:gap-6">
            <span className="h-0.75 flex-1 bg-linear-to-r from-black/70 to-transparent dark:from-white/70" />
            <h2 className="text-4xl font-bold sm:text-5xl md:text-6xl">
              Learning Paths
            </h2>
            <span className="h-0.75 flex-1 bg-linear-to-r from-transparent to-black/70 dark:to-white/70" />
          </div>
          <p className="mx-auto mt-3 max-w-3xl text-base text-black/80 dark:text-white/80 sm:text-lg">
            Pair up, pick a path, and work on it from first lesson to when the project is complete.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {learningPaths.map((path) => (
            <article
              key={path.title}
              className="flex flex-col gap-3 border-4 border-black/25 bg-white/20 p-4 transition-transform duration-100 hover:scale-102 dark:border-white/25 dark:bg-white/10"
            >
              <div className="aspect-square w-full border-2 border-black/20 bg-black/5 p-1 dark:border-white/20 dark:bg-white/5">
                {path.image ? (
                  <img
                    src={path.image}
                    alt={path.imageAlt}
                    className="h-full w-full object-contain"
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-black/10 text-sm font-semibold text-black/60 dark:bg-white/10 dark:text-white/60">
                    Add path image
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-2xl font-bold">{path.title}</h3>
                <span className="border-2 border-black/30 bg-white/30 px-2 py-0.5 text-sm font-semibold text-black/85 dark:border-white/30 dark:bg-black/20 dark:text-white/85">
                  {path.duration}
                </span>
              </div>
              <p className="text-base text-black/85 dark:text-white/85">
                <span className="font-bold">Focus:</span> {path.focus}
              </p>
              <p className="text-base text-black/75 dark:text-white/75">
                <span className="font-bold">Ship:</span> {path.project}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningPathsSection;
