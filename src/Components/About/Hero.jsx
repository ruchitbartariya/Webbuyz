const Hero = () => {
  return (
    <section className="bg-white">

      {/* Top Content */}

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left */}

          <div>
            <h1
              className="
              text-5xl
              md:text-6xl
              lg:text-7xl
              font-serif
              font-medium
              leading-none
              text-[#1c1c1c]
            "
            >
              Welcome to
              <br />
              Webbuys
            </h1>
          </div>

          {/* Right */}

          <div className="lg:pl-24">

            <p
              className="
              text-lg
              md:text-xl
              text-gray-700
              leading-8
              max-w-md
            "
            >
              India's trusted destination for premium perfumes and
              authentic Middle Eastern scents.
            </p>

          </div>

        </div>

      </div>

      {/* Hero Image */}

      <div className="relative w-full overflow-hidden">

        <img
          src="https://fragstalk.in/cdn/shop/files/About_Page_Banner.webp?v=1779447003&width=2400"
          alt="Perfume Banner"
          className="w-full h-[260px] md:h-[420px] lg:h-[320px] object-cover"
        />

      </div>

    </section>
  );
};

export default Hero;