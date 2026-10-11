import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcPaypal,
  FaApplePay,
} from "react-icons/fa";

import {
  SiGooglepay,
  SiShopify,
} from "react-icons/si";

const cards = [
  FaCcVisa,
  FaCcMastercard,
  SiGooglepay,
  FaCcAmex,
  FaCcPaypal,
  FaApplePay,
  SiShopify,
];

const PaymentIcons = () => {
  return (
    <div className="mt-16">

      <h4 className="uppercase text-sm font-semibold tracking-wider text-gray-500 mb-5">
        Payment Methods
      </h4>

      <div className="flex flex-wrap gap-3">
        {cards.map((Icon, i) => (
          <div
            key={i}
            className="w-14 h-12 rounded-2xl border border-[#E6D6BC] bg-white flex items-center justify-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <Icon className="text-2xl text-gray-700" />
          </div>
        ))}
      </div>

    </div>
  );
};

export default PaymentIcons;