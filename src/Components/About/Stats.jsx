const stats = [
  {
    number: "10+",
    text: "Years Experience",
  },
  {
    number: "1L+",
    text: "Happy Customers",
  },
  {
    number: "500+",
    text: "Premium Perfumes",
  },
  {
    number: "4.9★",
    text: "Customer Rating",
  },
];

export default function Stats() {
  return (
    <section className="py-24">

      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 px-6">

        {stats.map((item) => (
          <div
            key={item.number}
            className="rounded-2xl border p-10 text-center hover:shadow-xl duration-300"
          >
            <h2 className="text-5xl font-bold text-[#c89a63]">
              {item.number}
            </h2>

            <p className="mt-4 text-gray-600">
              {item.text}
            </p>
          </div>
        ))}

      </div>

    </section>
  );
}