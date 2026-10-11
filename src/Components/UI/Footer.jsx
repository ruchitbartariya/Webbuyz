import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import webbuys from "../../assets/Webbuys.png";

import Newsletter from "./Newsletter";
import PaymentIcons from "./PaymentIcons";

export const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-[#ece7e2] mt-20">

      <div className="max-w-[1320px] mx-auto px-6 sm:px-8">

        {/* ---------------- TOP ---------------- */}

        <div className="flex flex-col gap-8 py-10 border-b border-[#ece7e2] sm:flex-row sm:items-center sm:justify-between">

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">

            <img
              src={webbuys}
              className="h-12 w-auto"
              alt="webbuys logo"
            />

            <p className="max-w-xl text-[17px] leading-7 font-medium text-gray-700">
              Webbuys offers premium, long-lasting luxury-inspired scents designed for bold style and everyday elegance.
            </p>

          </div>

          <div className="flex flex-wrap items-center gap-4">
            <span className="uppercase text-sm tracking-[0.24em] text-gray-500">
              Follow us
            </span>
            <div className="flex gap-3">
              {[FaFacebookF, FaInstagram, FaYoutube].map((Icon, i) => (
                <button
                  key={i}
                  className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:scale-105 transition duration-300"
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* ---------------- BODY ---------------- */}

        <div className="grid gap-10 py-12 lg:grid-cols-[1.8fr_1fr] lg:items-start">

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

            <div>
              <h4 className="uppercase text-gray-500 text-sm font-semibold tracking-wider mb-6">
                Shop
              </h4>

              <ul className="space-y-4 text-gray-700">
                {["Best Sellers", "New Arrivals", "Men", "Women", "Unisex"].map((item) => (
                  <li key={item}>
                    <Link className="font-medium hover:text-[#C59661] transition-colors duration-300">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="uppercase text-gray-500 text-sm font-semibold tracking-wider mb-6">
                Legal
              </h4>

              <ul className="space-y-4 text-gray-700">
                {["Terms & Conditions", "Privacy Policy", "Shipping Policy"].map((item) => (
                  <li key={item}>
                    <Link className="font-medium hover:text-[#C59661] transition-colors duration-300">
                      {item}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link className="font-medium hover:text-[#C59661] transition-colors duration-300">
                    Returns, Cancellation & Exchange Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="uppercase text-gray-500 text-sm font-semibold tracking-wider mb-6">
                Quick Links
              </h4>

              <ul className="space-y-4 text-gray-700">
                {['About Webbuys', 'Offers', 'Contact'].map((item) => (
                  <li key={item}>
                    <Link className="font-medium hover:text-[#C59661] transition-colors duration-300">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="uppercase text-gray-500 text-sm font-semibold tracking-wider mb-6">
                Contact
              </h4>

              <div className="space-y-4 text-gray-700">
                <p className="font-medium">avanorprime@gmail.com</p>
                <p className="font-medium">+91 9634950548</p>
                <p>
                  Uttar Pradesh 243002
                </p>
                <p className="inline-block rounded-full border border-[#E6D6BC] bg-[#F9F5EE] px-4 py-2 text-sm text-[#6B5841]">
                  Need help? Chat with us
                </p>
              </div>
            </div>

          </div>

          <div className="lg:flex lg:justify-end">
            <Newsletter />
          </div>

        </div>

        <PaymentIcons />

        <div className="border-t border-[#ece7e2] pt-8 pb-6 flex flex-col gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="text-base font-semibold text-gray-900">© 2026 Webbuys.</p>
            <p className="text-sm text-gray-500">All rights reserved.</p>
          </div>
          <p className="text-sm text-gray-500">
            Crafted with care for premium fragrance lovers.
          </p>
        </div>

      </div>

    </footer>
  );
};

