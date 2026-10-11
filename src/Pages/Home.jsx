import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectFade,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

import Testimonials from "../Components/Testonomials";
import SocialCards from "../Components/SocialCards";

import { supabase } from "../lib/supabase";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=1600",
  },
  {
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1600",
  },
  {
    image:
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=1600",
  },
];

const suggestions = [
  "Best perfume under ₹2000",
  "Best jeans under ₹1500",
  "Oversized t shirt under ₹1000",
  "Best body spray",
  "Black pants for men",
];

export const Home = () => {
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [submittedSearch, setSubmittedSearch] =
    useState("");

  const [selectedIds, setSelectedIds] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [hasSearched, setHasSearched] =
    useState(false);

  const [creditsRemaining, setCreditsRemaining] =
    useState(null);

  // =====================================================
  // SEARCH PRODUCTS
  // =====================================================

  const searchProducts = async (query) => {
    const cleanQuery =
      query.trim();

    if (!cleanQuery) {
      return;
    }

    try {
      setLoading(true);

      setError("");

      setProducts([]);

      setSelectedIds([]);

      setSubmittedSearch(
        cleanQuery
      );

      setHasSearched(true);

      console.log(
        "Searching:",
        cleanQuery
      );

      // =================================================
      // CALL SUPABASE EDGE FUNCTION
      // =================================================

      const {
        data,
        error: functionError,
      } =
        await supabase.functions.invoke(
          "product-search",
          {
            body: {
              query: cleanQuery,
            },
          }
        );

      console.log(
        "Edge Function data:",
        data
      );

      console.log(
        "Edge Function error:",
        functionError
      );

      // =================================================
      // FUNCTION ERROR
      // =================================================

      if (functionError) {
        throw new Error(
          functionError.message ||
            "Product search failed."
        );
      }

      // =================================================
      // API ERROR
      // =================================================

      if (!data?.success) {
        throw new Error(
          data?.message ||
            "Unable to find products."
        );
      }

      // =================================================
      // PRODUCTS
      // =================================================

      console.log(
        "Products received:",
        data.products
      );

      setProducts(
        data.products || []
      );

      setCreditsRemaining(
        data.creditsRemaining ??
          null
      );
    } catch (err) {
      console.error(
        "SEARCH ERROR:",
        err
      );

      setError(
        err?.message ||
          "Something went wrong while searching."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // SEARCH FORM
  // =====================================================

  const handleSearch = (
    event
  ) => {
    event.preventDefault();

    searchProducts(
      search
    );
  };

  // =====================================================
  // SUGGESTION BUTTON
  // =====================================================

  const handleSuggestion = (
    value
  ) => {
    setSearch(value);

    searchProducts(
      value
    );
  };

  // =====================================================
  // SELECT PRODUCT
  // =====================================================

  const toggleSelection = (
    productId
  ) => {
    setSelectedIds(
      (current) =>
        current.includes(
          productId
        )
          ? current.filter(
              (id) =>
                id !==
                productId
            )
          : [
              ...current,
              productId,
            ]
    );
  };

  // =====================================================
  // SELECTED PRODUCTS
  // =====================================================

  const selectedProducts =
    products.filter(
      (product) =>
        selectedIds.includes(
          product.id
        )
    );

  // =====================================================
  // SELECTED TOTAL
  // =====================================================

  const selectedTotal =
    selectedProducts.reduce(
      (sum, product) => {
        const price =
          Number(
            product.price
          ) || 0;

        return sum + price;
      },
      0
    );

  return (
    <>
      {/* =================================================
          HERO
      ================================================== */}

      <Swiper
        modules={[
          Navigation,
          Pagination,
          Autoplay,
          EffectFade,
        ]}
        navigation
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
        }}
        loop
        effect="fade"
        className="h-[620px] w-full"
      >
        {slides.map(
          (slide, index) => (
            <SwiperSlide
              key={index}
            >
              <div
                className="relative h-[620px] bg-cover bg-center"
                style={{
                  backgroundImage:
                    `url(${slide.image})`,
                }}
              >
                <div className="absolute inset-0 bg-black/45" />

                <div className="relative z-10 flex h-full items-center justify-center px-5 text-center">
                  <div className="w-full max-w-4xl text-white">

                    <p className="mb-4 text-sm font-bold uppercase tracking-[4px] text-indigo-200">
                      Smart Shopping
                    </p>

                    <h1 className="text-4xl font-black leading-tight md:text-6xl">
                      Search once.
                      <br />
                      Compare everywhere.
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-base text-white/85 md:text-lg">
                      Tell us what you want
                      in normal language.
                      We'll find matching
                      products from available
                      shopping platforms.
                    </p>

                    {/* SEARCH */}

                    <form
                      onSubmit={
                        handleSearch
                      }
                      className="mx-auto mt-8 flex max-w-3xl flex-col gap-3 rounded-3xl bg-white p-3 shadow-2xl md:flex-row"
                    >
                      <div className="flex flex-1 items-center">
                        <span className="px-3 text-2xl">
                          🔍
                        </span>

                        <input
                          type="text"
                          value={
                            search
                          }
                          onChange={(
                            event
                          ) =>
                            setSearch(
                              event
                                .target
                                .value
                            )
                          }
                          placeholder="Try: best perfume under ₹2000"
                          className="w-full bg-transparent px-2 py-3 text-base text-gray-900 outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={
                          loading
                        }
                        className="rounded-2xl bg-indigo-600 px-8 py-3 font-bold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {loading
                          ? "Searching..."
                          : "Search"}
                      </button>
                    </form>

                    {/* SUGGESTIONS */}

                    <div className="mt-5 flex flex-wrap justify-center gap-2">
                      {suggestions.map(
                        (
                          suggestion
                        ) => (
                          <button
                            key={
                              suggestion
                            }
                            type="button"
                            onClick={() =>
                              handleSuggestion(
                                suggestion
                              )
                            }
                            className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur transition hover:bg-white/20"
                          >
                            {
                              suggestion
                            }
                          </button>
                        )
                      )}
                    </div>

                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        )}
      </Swiper>

      {/* =================================================
          PRODUCT SECTION
      ================================================== */}

      <section className="mx-auto max-w-7xl px-5 py-14 md:px-6">

        {/* HEADER */}

        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

          <div>

            <p className="text-xs font-bold uppercase tracking-[3px] text-indigo-500">
              Live Product Search
            </p>

            <h2 className="mt-2 text-3xl font-black text-gray-900">
              {hasSearched
                ? `Results for "${submittedSearch}"`
                : "Discover products"}
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
              Search products from
              available online shopping
              platforms.
            </p>

          </div>

          {/* SELECTED */}

          {hasSearched && (
            <div className="rounded-3xl border border-indigo-100 bg-indigo-50 p-4 text-sm shadow-sm">

              <div className="flex items-center justify-between gap-8">
                <span className="font-semibold">
                  Selected
                </span>

                <span className="font-bold text-indigo-700">
                  {
                    selectedIds.length
                  }
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between gap-8">
                <span>
                  Selected total
                </span>

                <span className="font-bold text-indigo-700">
                  ₹
                  {selectedTotal.toLocaleString(
                    "en-IN"
                  )}
                </span>
              </div>

              {creditsRemaining !==
                null && (
                <div className="mt-2 flex items-center justify-between gap-8">
                  <span>
                    API credits
                  </span>

                  <span className="font-bold text-indigo-700">
                    {
                      creditsRemaining
                    }
                  </span>
                </div>
              )}

            </div>
          )}

        </div>

        {/* =================================================
            INITIAL STATE
        ================================================== */}

        {!hasSearched &&
          !loading && (
            <div className="rounded-3xl border border-gray-200 bg-white p-12 text-center shadow-sm">

              <div className="text-5xl">
                🛍️
              </div>

              <h3 className="mt-4 text-xl font-bold text-gray-900">
                Search for any product
              </h3>

              <p className="mx-auto mt-2 max-w-xl text-sm text-gray-500">
                Try perfume, jeans,
                shoes, phones, laptops,
                beauty products or
                anything else you want.
              </p>

            </div>
          )}

        {/* =================================================
            LOADING
        ================================================== */}

        {loading && (
          <div className="rounded-3xl border border-gray-200 bg-white p-12 text-center shadow-sm">

            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600" />

            <p className="mt-5 font-semibold text-gray-700">
              Searching online...
            </p>

            <p className="mt-1 text-sm text-gray-400">
              Checking available
              shopping platforms.
            </p>

          </div>
        )}

        {/* =================================================
            ERROR
        ================================================== */}

        {!loading &&
          error && (
            <div className="rounded-3xl border border-red-200 bg-red-50 p-6">

              <p className="font-bold text-red-700">
                Product search failed
              </p>

              <p className="mt-2 text-sm text-red-600">
                {error}
              </p>

              <p className="mt-4 text-xs text-red-500">
                Open browser Console
                (F12) and Supabase
                Edge Function logs to
                see the exact error.
              </p>

            </div>
          )}

        {/* =================================================
            NO PRODUCTS
        ================================================== */}

        {!loading &&
          !error &&
          hasSearched &&
          products.length ===
            0 && (
            <div className="rounded-3xl border border-gray-200 bg-white p-12 text-center">

              <div className="text-5xl">
                😕
              </div>

              <h3 className="mt-4 text-xl font-bold text-gray-900">
                No products found
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Try another search
                term.
              </p>

            </div>
          )}

        {/* =================================================
            PRODUCTS
        ================================================== */}

        {!loading &&
          !error &&
          products.length > 0 && (

            <>

              <div className="mb-5 flex items-center justify-between">

                <p className="text-sm font-semibold text-gray-600">
                  {
                    products.length
                  }{" "}
                  products found
                </p>

              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                {products.map(
                  (product) => {

                    const isSelected =
                      selectedIds.includes(
                        product.id
                      );

                    const price =
                      Number(
                        product.price
                      ) || 0;

                    const mrp =
                      Number(
                        product.mrp
                      ) || 0;

                    const discount =
                      mrp > price
                        ? Math.round(
                            ((mrp -
                              price) /
                              mrp) *
                              100
                          )
                        : 0;

                    return (
                      <article
                        key={
                          product.id
                        }
                        className={`overflow-hidden rounded-3xl border bg-white transition duration-300 ${
                          isSelected
                            ? "border-indigo-500 shadow-xl"
                            : "border-gray-200 hover:border-indigo-300 hover:shadow-lg"
                        }`}
                      >

                        {/* IMAGE */}

                        <div className="relative h-64 overflow-hidden bg-gray-50">

                          {product.image ? (
                            <img
                              src={
                                product.image
                              }
                              alt={
                                product.name
                              }
                              loading="lazy"
                              className="h-full w-full object-contain p-4 transition duration-300 hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-6xl">
                              🛍️
                            </div>
                          )}

                          {/* PLATFORM */}

                          <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-black text-gray-900 shadow">
                            {
                              product.platform
                            }
                          </div>

                          {/* DISCOUNT */}

                          {discount >
                            0 && (
                            <div className="absolute right-4 top-4 rounded-full bg-green-600 px-3 py-1.5 text-xs font-bold text-white">
                              {
                                discount
                              }%
                              OFF
                            </div>
                          )}

                        </div>

                        {/* DETAILS */}

                        <div className="p-5">

                          {product.brand && (
                            <p className="text-xs font-bold uppercase tracking-wider text-indigo-500">
                              {
                                product.brand
                              }
                            </p>
                          )}

                          <h3 className="mt-1 line-clamp-2 min-h-[48px] text-lg font-black text-gray-900">
                            {
                              product.name
                            }
                          </h3>

                          {/* RATING */}

                          {product.rating !==
                            null && (
                            <div className="mt-3 flex items-center gap-2">

                              <span className="rounded-lg bg-green-50 px-2 py-1 text-xs font-bold text-green-700">
                                ⭐{" "}
                                {Number(
                                  product.rating
                                ).toFixed(
                                  1
                                )}
                              </span>

                              {product.ratingCount >
                                0 && (
                                <span className="text-xs text-gray-400">
                                  (
                                  {Number(
                                    product.ratingCount
                                  ).toLocaleString(
                                    "en-IN"
                                  )}
                                  )
                                </span>
                              )}

                            </div>
                          )}

                          {/* PRICE */}

                          <div className="mt-5">

                            <div className="flex items-center gap-2">

                              <span className="text-2xl font-black text-gray-900">
                                ₹
                                {price.toLocaleString(
                                  "en-IN"
                                )}
                              </span>

                              {mrp >
                                price && (
                                <span className="text-sm text-gray-400 line-through">
                                  ₹
                                  {mrp.toLocaleString(
                                    "en-IN"
                                  )}
                                </span>
                              )}

                            </div>

                            {mrp >
                              price && (
                              <p className="mt-1 text-xs font-semibold text-green-600">
                                Save ₹
                                {(
                                  mrp -
                                  price
                                ).toLocaleString(
                                  "en-IN"
                                )}
                              </p>
                            )}

                          </div>

                          {/* AVAILABILITY */}

                          <p
                            className={`mt-3 text-xs font-semibold ${
                              product.available
                                ? "text-green-600"
                                : "text-red-500"
                            }`}
                          >
                            {product.available
                              ? "✓ Available"
                              : "Currently unavailable"}
                          </p>

                          {/* VIEW */}

                          {product.url && (
                            <a
                              href={
                                product.url
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-4 block w-full rounded-2xl bg-gray-900 px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-indigo-600"
                            >
                              View on{" "}
                              {
                                product.platform
                              }
                            </a>
                          )}

                          {/* SELECT */}

                          <button
                            type="button"
                            onClick={() =>
                              toggleSelection(
                                product.id
                              )
                            }
                            className={`mt-3 w-full rounded-2xl px-4 py-3 text-sm font-bold transition ${
                              isSelected
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-100 text-gray-900 hover:bg-indigo-50"
                            }`}
                          >
                            {isSelected
                              ? "✓ Selected"
                              : "Select product"}
                          </button>

                        </div>

                      </article>
                    );
                  }
                )}

              </div>

            </>
          )}

      </section>

      <Testimonials />

      <SocialCards />
    </>
  );
};