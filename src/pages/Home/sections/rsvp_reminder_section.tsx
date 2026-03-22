import rsvp_handler from "@/components/rsvp_handler";
import { useState } from "react";

const RSVPReminderSection = () => {
  const [email, setEmail] = useState("");
  return (
    <section className="w-full text-black font-dynapuff">
      <div className="p-4 text-center flex flex-col items-center ">
        <span className="text-2xl sm:text-3xl text-white/85 ">
          What are you waiting for? RSVP now!
        </span>
        <form
          className="mt-4 w-full xl:w-1/2 flex border-2 border-black/20 bg-white p-2 text-black sm:mt-5"
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
            onClick={() => rsvp_handler(email)}
          >
            RSVP
          </button>
        </form>
      </div>
    </section>
  );
};

export default RSVPReminderSection;
