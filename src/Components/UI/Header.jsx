import { useState } from "react";
import { Link } from "react-router-dom";
import webbuys from "../../assets/Webbuys.png";
import { CategorySlider } from "./CategorySlider";

import {
    HiOutlineMenuAlt3,
    HiOutlineX,
    HiOutlineChevronDown,
} from "react-icons/hi";

import {
    FiSearch,
    FiUser,
    FiShoppingBag,
    FiTrendingUp,
} from "react-icons/fi";

import { FaWhatsapp } from "react-icons/fa";

const navLinks = [
    {
        title: "Shop All",
        path: "/shop",
        dropdown: true,
    },
    {
        title: "🔥 New Arrivals",
        path: "/new-arrivals",
    },
    {
        title: "Brands",
        path: "/brands",
    },
    {
        title: "Decant/Partial",
        path: "/decants",
    },
    {
        title: "Collections",
        path: "/collections",
    },
    {
        title: "About",
        path: "/about",
    },
    {
        title: "Offers",
        path: "/offers",
    },
    {
        title: "Blog Post",
        path: "/blog",
    },
];

export const Header = () => {
    const [mobile, setMobile] = useState(false);
    const [lockedDropdown, setLockedDropdown] = useState(null);
    const [activeDropdown, setActiveDropdown] = useState(null);

    return (
        <>
            <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
                <div className="max-w-[1380px] mx-auto h-20  px-5 lg:px-8 flex items-center justify-between">

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobile(!mobile)}
                        className="lg:hidden text-3xl"
                    >
                        {mobile ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
                    </button>

                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center"
                        onClick={() => setMobile(false)}
                    >
                        <img
                            src={webbuys}
                            alt="Logo"
                            className="h-14 object-contain"
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {navLinks.map((item) => (
                            <div
                                key={item.title}
                                className="relative"
                                onMouseEnter={() => {
                                    if (!lockedDropdown && item.dropdown) {
                                        setActiveDropdown(item.title);
                                    }
                                }}
                                onMouseLeave={() => {
                                    if (!lockedDropdown) {
                                        setActiveDropdown(null);
                                    }
                                }}
                            >
                                <div className="flex items-center gap-1">
  <Link
    to={item.path}
    className="font-medium text-[15px] hover:text-[#c89a63]"
  >
    {item.title}
  </Link>

  {item.dropdown && (
    <button
      type="button"
      onClick={() => {
        if (lockedDropdown === item.title) {
          setLockedDropdown(null);
          setActiveDropdown(null);
        } else {
          setLockedDropdown(item.title);
          setActiveDropdown(item.title);
        }
      }}
    >
      <HiOutlineChevronDown />
    </button>
  )}
</div>

                                {(activeDropdown === item.title ||
                                    lockedDropdown === item.title) && (
                                        <div
                                            className="absolute  top-full pt-7 z-50"
                                            onMouseEnter={() => setActiveDropdown(item.title)}
                                            onMouseLeave={() => {
                                                if (!lockedDropdown) {
                                                    setActiveDropdown(null);
                                                }
                                            }}
                                        >
                                            <div className="w-[1000px] rounded-xl bg-white shadow-xl border p-6">
                                                <CategorySlider />
                                            </div>
                                        </div>
                                    )}
                            </div>
                        ))}
                    </nav>

                    {/* Desktop Icons */}
                    <div className="hidden lg:flex items-center gap-5">
                        <FaWhatsapp className="text-[#25D366] text-2xl cursor-pointer" />

                        <FiSearch className="text-2xl cursor-pointer" />

                        <div className="w-1 h-1 rounded-full bg-black"></div>

                        <FiUser className="text-2xl cursor-pointer" />

                        <Link 
                            to="/seller/dashboard"
                            title="Seller Dashboard"
                            className="text-2xl cursor-pointer hover:text-[#c89a63] transition-colors"
                        >
                            <FiTrendingUp />
                        </Link>

                        <button className="relative">
                            <FiShoppingBag className="text-2xl cursor-pointer" />

                            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] w-5 h-5 rounded-full flex justify-center items-center">
                                1
                            </span>
                        </button>
                    </div>

                    {/* Mobile Icons */}
                    <div className="flex lg:hidden items-center gap-3">

                        {/* WhatsApp */}
                        <FaWhatsapp className="text-[#25D366] text-2xl cursor-pointer hover:scale-110 transition" />

                        {/* Vertical Divider */}
                        <div className="h-6 w-px bg-gray-300"></div>

                        {/* Search */}
                        <FiSearch className="text-2xl cursor-pointer hover:text-[#c89a63] transition" />

                        {/* Account */}
                        <FiUser className="text-2xl cursor-pointer hover:text-[#c89a63] transition" />

                        {/* Seller Dashboard */}
                        <Link 
                            to="/seller/dashboard"
                            title="Seller Dashboard"
                            className="text-2xl cursor-pointer hover:text-[#c89a63] transition"
                        >
                            <FiTrendingUp />
                        </Link>

                        {/* Cart */}
                        <button className="relative">
                            <FiShoppingBag className="text-2xl cursor-pointer hover:text-[#c89a63] transition" />

                            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                                1
                            </span>
                        </button>

                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`lg:hidden overflow-hidden transition-all duration-300 ${mobile ? "max-h-[700px]" : "max-h-0"
                        }`}
                >
                    <div className="px-6 pb-6 flex flex-col gap-5">

                        {navLinks.map((item) => (
                            <Link
                                key={item.title}
                                to="/"
                                onClick={() => setMobile(false)}
                                className="font-medium border-b border-gray-200 pb-3 flex items-center justify-between"
                            >
                                {item.title}

                                {item.dropdown && <HiOutlineChevronDown />}
                            </Link>
                        ))}

                        <Link
                            to="/seller/dashboard"
                            onClick={() => setMobile(false)}
                            className="font-medium border-b border-gray-200 pb-3 flex items-center gap-2 text-[#c89a63]"
                        >
                            <FiTrendingUp className="text-xl" />
                            Seller Dashboard
                        </Link>

                        <div className="flex items-center gap-5 pt-3">
                            <FaWhatsapp className="text-2xl text-[#25D366]" />
                            <FiSearch className="text-2xl" />
                            <FiUser className="text-2xl" />
                            <FiShoppingBag className="text-2xl" />
                        </div>

                    </div>
                </div>
            </header>
        </>



    );
};