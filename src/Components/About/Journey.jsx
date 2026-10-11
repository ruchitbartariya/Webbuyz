import {
  FaShieldAlt,
  FaFlask,
  FaHeadset,
  FaBoxOpen,
} from "react-icons/fa";

const stats = [
  {
    value: "11+ Years",
    title: "FRAGRANCE EXPERIENCE",
  },
  {
    value: "1 Lakh+",
    title: "HAPPY CUSTOMERS",
  },
  {
    value: "1.5 Lakh+",
    title: "SOCIAL FOLLOWERS",
  },
  {
    value: "TRUSTED",
    title: "GENUINE PRODUCTS & GUIDANCE",
    color: true,
  },
];

const features = [
  {
    icon: <FaShieldAlt />,
    title: "100% Authentic Products",
    desc: "",
  },
  {
    icon: <FaFlask />,
    title: "10ml Sample Decants Available",
    desc: "Try before investing in a full bottle.",
  },
  {
    icon: <FaHeadset />,
    title: "Dedicated Customer Support",
    desc: "",
  },
  {
    icon: <FaBoxOpen />,
    title: "Secure Packaging & Safe Checkout",
    desc: "",
  },
];

export default function JourneySection() {
  return (
    <section className="bg-white py-20">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="mb-16">
          <h2 className="text-5xl font-serif text-gray-900">
            Our journey
          </h2>

          <p className="mt-5 max-w-3xl text-gray-600 text-lg leading-8">
            began in 2015 with one simple mission – to make the world of
            fragrances accessible to perfume lovers across India at the best
            possible prices, without compromising on authenticity and service.
          </p>
        </div>

        {/* Stats */}

        <div className="grid grid-cols-2 lg:grid-cols-4 border-y border-gray-200 mb-16">

          {stats.map((item, index) => (
            <div
              key={index}
              className="py-10 px-6 border-r last:border-r-0 border-gray-200"
            >
              <h3
                className={`text-5xl font-serif ${
                  item.color ? "text-[#b8874f]" : "text-gray-900"
                }`}
              >
                {item.value}
              </h3>

              <p className="mt-4 text-xs font-bold tracking-widest text-gray-700 uppercase leading-5">
                {item.title}
              </p>
            </div>
          ))}
        </div>

        {/* Card */}

        <div className="bg-[#b8874f] rounded-3xl overflow-hidden">

          <div className="grid lg:grid-cols-2">

            {/* Image */}

            <div className="p-4">
              <img
                src="https://Fragstalk.in/cdn/shop/files/Thank_You_for_Trusting_Webbuys.webp?v=1779509326&width=1200"
                alt=""
                className="w-full h-full object-cover rounded-2xl min-h-[500px]"
              />
            </div>

            {/* Content */}

            <div className="text-white p-10 lg:p-14">

              <h2 className="text-5xl font-serif mb-5">
                Why Webbuys?
              </h2>

              <p className="text-white/90 text-lg leading-8 mb-10">
                At Webbuys, we believe buying a perfume should be exciting,
                trustworthy, and hassle-free. That's why we focus on
              </p>

              <div>

                {features.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-5 py-6 border-b border-white/20"
                  >
                    <div className="text-2xl mt-1">
                      {item.icon}
                    </div>

                    <div>

                      <h4 className="text-xl font-semibold">
                        {item.title}
                      </h4>

                      {item.desc && (
                        <p className="mt-2 text-white/80">
                          {item.desc}
                        </p>
                      )}

                    </div>

                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}