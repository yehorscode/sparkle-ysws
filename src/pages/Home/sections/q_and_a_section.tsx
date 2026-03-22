import eyeshake from "@/assets/eyeshake.gif";

const QandASection = () => {
  return (
    <section className="text-white flex items-center justify-center w-full px-4 py-8 sm:px-6 sm:py-10">
      <div className="w-full max-w-5xl">
        <div className="mb-6 flex items-center gap-4 sm:gap-6">
          <span className="h-0.75 flex-1 bg-linear-to-r from-black/70 to-transparent" />
          <h2 className="font-dynapuff text-4xl font-bold sm:text-5xl md:text-6xl">
            FAQ
          </h2>
          <span className="h-0.75 flex-1 bg-linear-to-r from-transparent to-black/70" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:gap-5">
          <div className="flex flex-col border-4 border-black/50 bg-white/20 p-3 text-lg dark:border-white/25 dark:bg-white/10">
            <span className="font-dynapuff">
              Q: Am I eligible to participate?
            </span>
            <span className="font-medium">
              A: You are eligible to participate in Sparkle if you are 18 years
              old or younger. You will need to verify your identity before being
              able to get prizes shipped to you.
            </span>
          </div>
          <div className="flex flex-col border-4 border-black/50 bg-white/20 p-3 text-lg dark:border-white/25 dark:bg-white/10">
            <span className="font-dynapuff">
              Q: What do I do if I don't have a friend?
            </span>
            <span className="font-medium">
              A: We <b>can</b> find one for you, but we highly encourage you to
              talk more on Slack and we're sure that someone will be willing to
              pair up with you!
            </span>
          </div>
          <div className="flex flex-col border-4 border-black/50 bg-white/20 p-3 text-lg dark:border-white/25 dark:bg-white/10">
            <span className="font-dynapuff">
              Q: Does the project need to be a code project?
            </span>
            <span className="font-medium">
              A: Yes! Your project must have a public github repo and have time
              tracked on{" "}
              <a
                href="https://hackatime.hackclub.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-[#FD3A4F]"
              >
                Hackatime
              </a>
              .
            </span>
          </div>
          <div className="flex flex-col border-4  border-black/50 bg-white/20 p-3 text-lg dark:border-white/25 dark:bg-white/10">
            <span className="font-dynapuff">
              Q: What can I learn from my partner/teacher?
            </span>
            <span className="font-medium">
              A: Anything you like! You and your partner just have to make a
              project out of it, and journal it so we know you have been
              learning! Please note that you are required to journal the
              learning process per week in order to make your hours count! If
              you taught your partner something interesting... we{" "}
              <span className="font-bold italic">might</span> give yo
              <span className="whitespace-nowrap">
                u a special prize
                <img src={eyeshake} alt="" className="ml-1 inline w-5" />
              </span>
            </span>
          </div>
          <div className="flex flex-col border-4 border-black/50 bg-white/20 p-3 text-lg dark:border-white/25 dark:bg-white/10">
            <span className="font-dynapuff">
              Q: Why should I do this when I can do other ysws(s) without the
              learning process?
            </span>
            <span className="font-medium">
              A: Unlike other YSWS(s) where you're working alone or just
              building for the sake of building, this program is specifically
              designed for{" "}
              <b>skill transfer and collaboration between people</b>! No more
              wishing that you had their skills, start doing this with your
              friend so they can teach you their ways!
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 border-4 border-black/50 bg-white/20 p-3 text-lg dark:border-white/25 dark:bg-white/10">
            <span className="font-dynapuff flex-1">
              Still have questions? Join us on Slack!
            </span>
            <div className="flex gap-2">
              <button
                className="bg-amber-400 border-2  hover:cursor-pointer border-black/30 px-3 py-1.5 font-semibold hover:scale-90 transition-all"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(
                    "https://hackclub.enterprise.slack.com/archives/C0AG9ASJ5U4",
                    "_blank",
                  );
                }}
              >
                <span className="drop-shadow-[0_1.2px_5px_rgba(0,0,0,0.7)]">Open channel</span>
              </button>
              <button
                className="bg-red-500 border-2 hover:cursor-pointer border-black/30 px-3 py-1.5 font-semibold text-white hover:scale-90 transition-all"
                onClick={(e) => {
                  e.preventDefault();
                  window.open("https://hackclub.com/slack", "_blank");
                }}
              >
                <span className="drop-shadow-[0_1.2px_5px_rgba(0,0,0,0.7)]">Join Hack Club Slack</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QandASection;
