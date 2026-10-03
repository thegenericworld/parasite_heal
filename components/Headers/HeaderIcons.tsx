import Link from "next/link";

const HeaderIcons = () => {

  return (
    <div className="flex justify-start gap-1 sm:gap-2 py-1 sm:py-2">

      {/* Cart Icon + Dropdown */}
      <div className="relative group shrink-0">

        <Link
          href="/cart"
          className="md:p-3 md:px-5 text-blue-900 font-semibold md:bg-white md:border md:border-blue-400 md:rounded-full text-sm md:shadow-md md:hover:shadow-xl hover:border-blue-500 hover:bg-blue-50 md:transition-all md:duration-300 ease-in-out flex items-center md:gap-2 cursor-pointer flex-col md:flex-row gap-1"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1H5L7.68 14.39C7.77 14.8504 8.02124 15.2578 8.38843 15.5583C8.75562 15.8588 9.2181 16.04 9.68 16H20.4C20.8619 16.04 21.3244 15.8588 21.6916 15.5583C22.0588 15.2578 22.31 14.8504 22.4 14.39L23.9 6.5H6"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="9.5" cy="22" r="1.5" stroke="black" strokeWidth="2" fill="none" />
            <circle cx="20.5" cy="22" r="1.5" stroke="black" strokeWidth="2" fill="none" />
          </svg>
          <span className="text-sm text-gray-800 font-semibold ">
            Cart
          </span>
        </Link>
      </div>
    </div>
  );
};

export default HeaderIcons;
