import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Men's",
    image: "https://res.cloudinary.com/db4jnwqb3/image/upload/v1785558556/Fragrances_For_the_modern_man_who_dares_to_stand_out____BeBopRed_MensFragrance_FragranceGoals_PerfumeLovers_ScentOfTheDay_MensPerfume_EauDeParfum_LuxuryFragrance_PerfumeForMen_GroomingGoals_ImposingPerfum_kste88.jpg",
  },
  {
    id: 2,
    name: "Women's",
    image: "https://res.cloudinary.com/db4jnwqb3/image/upload/v1785558676/Elegant_Neutral_Capsule_Wardrobe_Outfit_Timeless_Minimalist_Street_Style_rbg9jv.jpg",
  },
  {
    id: 3,
    name: "Deodorant",
    image: "https://res.cloudinary.com/db4jnwqb3/image/upload/v1785559073/OneOfAK%C3%AEnd___The_Luxury_of_Freedom__We_have_been_diving_into_the_unknown_and_what_we_have_discovered_is_unforgettable___Open_your_heart_to_new_summer_adventures_with_our_unique_Aqu_ohufnd.jpg",
  },
  // {
  //   id: 4,
  //   name: "Attar",
  //   image: "/images/attar.jpg",
  // },
  // {
  //   id: 5,
  //   name: "Bakhoor",
  //   image: "/images/bakhoor.jpg",
  // },
];

export const CategorySlider = () => {
  return (
    <section className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory">

        {categories.map((item) => (
          <Link
            key={item.id}
            to="/"
            className="
              relative
              min-w-[220px]
              sm:min-w-[240px]
              lg:min-w-[250px]
              h-[300px]
              rounded-3xl
              overflow-hidden
              group
              snap-start
              shrink-0
            "
          >
            <img
              src={item.image}
              alt={item.name}
              className="
                w-full
                h-full
                object-cover
                transition-transform
                duration-500
                group-hover:scale-110
              "
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            <h2
              className="
                absolute
                bottom-7
                left-5
                text-white
                text-4xl
                font-serif
              "
            >
              {item.name}
            </h2>
          </Link>
        ))}
      </div>
    </section>
  );
}