import {
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

export default function SocialCards() {
  return (
    <section className="pb-20">
      <div className="max-w-[1320px] mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-4">

          {/* ================= Youtube ================= */}

          <div className="bg-[#ff0d0d] rounded-[18px] overflow-hidden">

            <div className="grid grid-cols-[220px_1fr] h-full">

              {/* Left */}

              <div className="border-r border-white/20 flex flex-col justify-between p-10">

                <div>

                  <div className="flex items-center gap-3">

                    <FaYoutube
                      className="text-white"
                      size={48}
                    />

                    <h2 className="text-white text-[38px] font-bold">
                      YouTube
                    </h2>

                  </div>

                </div>

                <button className="text-white uppercase font-semibold tracking-wide underline underline-offset-4">
                  Subscribe Now
                </button>

              </div>

              {/* Right */}

              <div className="flex flex-col justify-center px-10 py-10">

                <h2 className="text-white text-[46px] leading-none font-serif">
                  Subscribe On
                  <br />
                  Youtube
                </h2>

                <p className="text-white/95 text-[18px] leading-8 mt-8">
                  Watch Fragrance Reviews &
                  Recommendations
                  <br />
                  Explore Perfume Reviews on
                  YouTube
                </p>

              </div>

            </div>

          </div>

          {/* ================= Instagram ================= */}

          <div
            className="rounded-[18px] overflow-hidden"
            style={{
              background:
                "linear-gradient(90deg,#c13584 0%,#d62976 20%,#f56040 60%,#fcb045 100%)",
            }}
          >

            <div className="grid grid-cols-[220px_1fr] h-full">

              {/* Left */}

              <div className="border-r border-white/20 flex flex-col justify-between p-10">

                <div>

                  <div className="flex items-center gap-3">

                    <FaInstagram
                      className="text-white"
                      size={45}
                    />

                    <h2 className="text-white text-[34px] font-serif">
                      Instagram
                    </h2>

                  </div>

                </div>

                <button className="text-white uppercase font-semibold tracking-wide underline underline-offset-4">
                  Follow Now
                </button>

              </div>

              {/* Right */}

              <div className="flex flex-col justify-center px-10 py-10">

                <h2 className="text-white text-[44px] leading-none font-serif">
                  Follow Us On
                  <br />
                  Instagram
                </h2>

                <p className="text-white text-[18px] leading-8 mt-8">
                  Follow Daily Fragrance Content
                  <br />
                  See What the Community's Wearing
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}