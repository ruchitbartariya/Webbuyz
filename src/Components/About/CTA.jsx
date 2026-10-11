import { FaArrowRight } from "react-icons/fa";

const CTA = () => {
  return (
    <section className="bg-white">

      {/* ---------------- Top Ribbon ---------------- */}

      <div className="relative overflow-hidden h-24">

        <div className="absolute top-4 left-[-10%] rotate-2 bg-[#b98852] w-[120%] py-3 whitespace-nowrap">
          <div className="animate-marquee flex gap-12 text-white uppercase font-semibold text-sm tracking-wide">
            {Array(10)
              .fill(0)
              .map((_, i) => (
                <span key={i}>
                  100% Original Fragrances
                </span>
              ))}
          </div>
        </div>

        <div className="absolute top-8 left-[-10%] -rotate-2 bg-[#b98852] w-[120%] py-3 whitespace-nowrap opacity-95">
          <div className="animate-marquee-reverse flex gap-12 text-white text-sm font-medium italic">
            {Array(10)
              .fill(0)
              .map((_, i) => (
                <span key={i}>
                  niche perfumes
                </span>
              ))}
          </div>
        </div>

      </div>

      {/* ---------------- Heading ---------------- */}

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          <h2 className="text-4xl md:text-5xl font-serif leading-tight text-gray-900">
            More Than
            <br />
            Just a Online Perfume Store
          </h2>

          <div className="text-gray-700 space-y-8 text-lg leading-8">
            <p>
              Webbuys is not just about selling perfumes—we are building a
              fragrance community where customers can discover, test, learn,
              and choose scents with confidence.
            </p>

            <p>
              Whether you're looking for luxury designer fragrances, Middle
              Eastern masterpieces or affordable decants, Webbuys is here to
              make your fragrance journey memorable.
            </p>

          </div>

        </div>

      </div>

      {/* ---------------- Banner Card ---------------- */}

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-24">

        <div className="rounded-3xl overflow-hidden bg-[#b98852] grid lg:grid-cols-2">

          {/* Left */}

          <div className="p-10 lg:p-16 flex flex-col justify-between">

            <div>

              <h2 className="text-5xl font-serif text-white leading-tight">
                Thank You
                <br />
                for Trusting Webbuys
              </h2>

              <p className="text-white/90 mt-8 text-lg leading-8 max-w-lg">
                Your love and trust have helped us grow from a small fragrance
                venture in 2015 to a trusted perfume destination serving
                customers all across India.
              </p>

              <button className="mt-10 bg-white text-black px-8 py-4 rounded-xl font-semibold flex items-center gap-3 hover:scale-105 duration-300">
                SHOP NOW
                <FaArrowRight />
              </button>

            </div>

            <div>

              <div className="border-t border-white/20 mt-14 pt-8 flex items-center gap-5">

                <div className="flex items-center gap-3">

                  <div className="w-12 h-12 rounded-full border border-white flex items-center justify-center text-white font-bold">
                    F
                  </div>

                  <h4 className="text-white font-bold text-xl">
                    Webbuys
                  </h4>

                </div>

                <div className="w-px h-8 bg-white/30"></div>

                <p className="text-white text-lg font-medium">
                  Keep Shopping, Keep Smelling Great
                </p>

              </div>

            </div>

          </div>

          {/* Right */}

          <div className="relative min-h-[500px]">

            <img
              src="https://res.cloudinary.com/db4jnwqb3/image/upload/v1785559073/OneOfAK%C3%AEnd___The_Luxury_of_Freedom__We_have_been_diving_into_the_unknown_and_what_we_have_discovered_is_unforgettable___Open_your_heart_to_new_summer_adventures_with_our_unique_Aqu_ohufnd.jpg"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#b98852]/40"></div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default CTA;