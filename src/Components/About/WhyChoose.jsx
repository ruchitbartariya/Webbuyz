import {
  FaCheckCircle,
  FaShippingFast,
  FaHeadset,
  FaBoxOpen,
} from "react-icons/fa";

const features = [
  {
    icon: <FaCheckCircle />,
    title: "100% Authentic Products",
    desc: "Every fragrance is sourced from trusted distributors and verified for authenticity.",
  },
  {
    icon: <FaBoxOpen />,
    title: "Decants Available",
    desc: "Try premium perfumes in smaller quantities before buying full bottles.",
  },
  {
    icon: <FaShippingFast />,
    title: "Fast Delivery",
    desc: "Quick shipping with secure packaging across India.",
  },
  {
    icon: <FaHeadset />,
    title: "Customer Support",
    desc: "Friendly support team available on WhatsApp and Email.",
  },
];

export default function WhyChoose() {
  return (
    <section className="py-20 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold">
            Why Choose <span className="text-[#c89a63]">WebBuys</span>
          </h2>

          <p className="text-gray-500 mt-4">
            Premium fragrances with trusted service.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8 text-center group"
            >

              <div className="w-16 h-16 mx-auto rounded-full bg-[#c89a63]/10 flex items-center justify-center text-3xl text-[#c89a63] group-hover:bg-[#c89a63] group-hover:text-white transition">

                {item.icon}

              </div>

              <h3 className="text-xl font-semibold mt-6">
                {item.title}
              </h3>

              <p className="text-gray-500 mt-3 leading-7">
                {item.desc}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}