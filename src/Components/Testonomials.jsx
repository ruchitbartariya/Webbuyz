import { FaStar } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";

export default function Testimonials() {
  const reviews = [
    {
      review:
        "Authentic product and excellent packaging. The fragrance lasted all day.",
      name: "NEHA D.",
    },
    {
      review:
        "Fast delivery and amazing customer support. Definitely ordering again.",
      name: "NEHA D.",
    },
    {
      review:
        "Bought Afnan 9PM and got compliments on the first wear.",
      name: "NEHA D.",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-[1320px] mx-auto px-6">

        {/* Heading */}

        <h2 className="text-[46px] leading-none font-serif text-[#222] mb-10">
          What Our Customers Say about Fragstalk
        </h2>

        {/* Grid */}

        <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-4">

          {/* Card 1 */}

          <ReviewCard review={reviews[0]} />

          {/* Card 2 */}

          <ReviewCard review={reviews[1]} />

          {/* Image */}

          <div className="rounded-[22px] overflow-hidden min-h-[480px] lg:min-h-[520px]">
            <img
              src="/testimonial.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          {/* Card 3 */}

          <ReviewCard review={reviews[2]} />
        </div>

        {/* Google Rating */}

        <div className="flex justify-center mt-8">

          <button className="group flex items-center gap-3 text-[15px] font-semibold tracking-wide uppercase text-[#666]">

            <span>Check Out</span>

            <span className="text-[28px] font-bold">
              <span className="text-blue-500">G</span>
              <span className="text-red-500">o</span>
              <span className="text-yellow-400">o</span>
              <span className="text-blue-500">g</span>
              <span className="text-green-500">l</span>
              <span className="text-red-500">e</span>
            </span>

            <span>Ratings</span>

            <HiArrowRight
              size={20}
              className="group-hover:translate-x-1 duration-300"
            />

          </button>

        </div>

      </div>
    </section>
  );
}

function ReviewCard({ review }) {
  return (
    <div className="bg-[#FCF8F3] rounded-[22px] px-10 py-10 flex flex-col justify-between h-[520px]">

      {/* Stars */}

      <div>

        <div className="flex justify-center gap-1 mb-12">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} size={15} />
          ))}
        </div>

        <h3 className="text-[23px] leading-[40px] text-center font-semibold text-[#222]">
          "{review.review}"
        </h3>

      </div>

      {/* Bottom */}

      <div>

        <div className="border-t border-[#ddd] pt-6">

          <h4 className="text-center font-bold text-[14px] tracking-[2px]">
            {review.name}
          </h4>

          <p className="text-center text-[12px] font-semibold tracking-widest text-gray-500 uppercase mt-2">
            Verified Purchase
          </p>

        </div>

      </div>

    </div>
  );
}