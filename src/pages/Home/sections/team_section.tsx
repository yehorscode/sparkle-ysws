import yehorPfp from "@/assets/yehor.webp";
import zookPfp from "@/assets/zook.webp";
import candyPfp from "@/assets/candy.webp";
import ansonPfp from "@/assets/anson.webp";
import graysonPfp from "@/assets/thirtyseven.webp";
import mustafaPfp from "@/assets/mustafa.jpg";

const TeamSection = () => {
  return (
    <section className="w-full font-dynapuff py-12 px-4 sm:px-6 lg:px-10 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center gap-4 sm:gap-6">
          <span className="h-0.75 flex-1 bg-linear-to-r from-black/70 to-transparent" />
          <h2 className="font-dynapuff text-4xl font-bold sm:text-5xl md:text-6xl">
            The Team
          </h2>
          <span className="h-0.75 flex-1 bg-linear-to-r from-transparent to-black/70" />
        </div>
        <p className="mb-10 text-center text-base text-white/75 sm:text-lg max-w-2xl mx-auto">
          Meet the team behind Sparkle, a group of people who believe the best
          way to learn is with a friend by your side.
        </p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {[
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
              initials: "Y",
              color: "bg-purple-400",
              name: "Yehor",
              handle: "@yehor",
              role: "Website Developer",
              bio: "Made the website from scratch. Owns the repo and tried to draw the clouds. Claims to not have a quote but here we are.",
              quote: "Maybe try making a meta or a post in hq",
              photo: yehorPfp,
            },
            {
              initials: "C",
              color: "bg-pink-400",
              name: "Candy",
              handle: "@candy",
              role: "Artist",
              bio: "Created the background for the website and designed the two mascots!",
              quote:
                "what if the blue cat was just radioactive water and the other cat is like a banana or something",
              photo: candyPfp,
            },
            {
              initials: "G",
              color: "bg-gray-400",
              name: "Grayson V",
              handle: "@thirtyseven",
              role: "Backend Developer",
              bio: "Good at writing and doing backend stuff. Probably the reason whatever's broken is broken.",
              quote: "why are we committing api keys to a public repo",
              photo: graysonPfp,
            },
            {
              initials: "M",
              color: "bg-blue-400",
              name: "Mustafa",
              handle: "@Mustafa",
              role: "Backend Developer",
              bio: "#1 Svelte lover",
              quote: "Meow",
              photo: mustafaPfp,
            },
            {
              initials: "A",
              color: "bg-green-400",
              name: "Anson Chung",
              handle: "@Anson Chung",
              role: "The Unemployed",
              bio: "Decides to make a PR because he thinks the clouds were too spread out on the previous version of the website.",
              quote:
                "I'd recommend removing ur jd Vance meme folder before applying for the visa",
              photo: ansonPfp,
            },
          ].map(
            ({ initials, color, name, handle, role, bio, quote, photo }) => (
              <div
                key={handle}
                className="flex flex-col border-4 border-black/50 bg-white/20 hover:scale-103 transition-all duration-75  dark:border-white/25 dark:bg-white/10"
              >
                <div className="flex justify-center pt-4">
                  {photo ? (
                    <img
                      src={photo}
                      alt={name}
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
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
                    <p className="font-dynapuff text-xl font-bold leading-tight">
                      {name}
                    </p>
                    <p className="text-sm text-white/55">
                      {handle}
                    </p>
                  </div>
                  <span className="self-start bg-black/10 px-2 py-0.5 text-sm font-semibold">
                    {role}
                  </span>
                  <p className="font-medium text-white/85 leading-snug">
                    {bio}
                  </p>
                  <blockquote className="border-l-4 border-white/30 pl-3 text-sm italic text-white/70">
                    "{quote}"
                  </blockquote>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
