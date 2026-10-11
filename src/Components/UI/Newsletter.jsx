const Newsletter = () => {
  return (
    <div className="bg-[#F6F1EB] rounded-[28px] w-full max-w-[470px] p-8 sm:p-10 shadow-[0_24px_60px_rgba(0,0,0,0.08)]">

      <h2
        className="text-3xl font-semibold text-[#1b1b1b] leading-tight sm:text-4xl"
        style={{ fontFamily: "Playfair Display, serif" }}
      >
        Stay updated
        <br />
        with latest from
        <span className="text-[#C69A67]"> Webbuys.</span>
      </h2>

      <p className="mt-5 text-base leading-7 text-[#3f3f3f]">
        Get exclusive launches, fragrance updates, and special offers delivered directly to your inbox.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">

        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 h-[58px] rounded-[22px] border border-[#d9d3cc] px-5 outline-none bg-white placeholder:text-gray-500"
        />

        <button
          className="h-[58px] rounded-[22px] bg-black text-white font-semibold tracking-wide hover:bg-[#222] transition-colors duration-300 sm:px-8"
        >
          SUBSCRIBE
        </button>

      </div>

    </div>
  );
};

export default Newsletter;