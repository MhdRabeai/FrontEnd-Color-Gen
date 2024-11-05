import { FC, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Navbar: FC = () => {
  useEffect(() => {}, []);
  return (
    <header className="absolute top-0 inset-x-0 flex flex-wrap justify-center md:flex-nowrap z-50 w-full text-sm mb-4">
      <nav className="mt-4 relative max-w-2xl w-full bg-white border border-gray-200 rounded-[2rem] mx-2 py-2.5 flex items-center justify-between md:py-0 md:px-4 md:mx-auto dark:bg-[#242424] dark:border-neutral-700">
        <div className="px-4 md:px-0 flex justify-between items-center">
          <div>
            <NavLink
              className="flex-none rounded-md text-xl inline-block  focus:outline-none focus:opacity-80 text-neutral-200"
              to={"/"}
              aria-label="Preline"
            >
              <h5> Mhd.</h5>
            </NavLink>
          </div>
        </div>

        <div
          id="hs-navbar-header-floating"
          className=" hs-collapse overflow-hidden transition-all duration-300 basis-full grow "
          aria-labelledby="hs-navbar-header-floating-collapse"
        >
          <div className="flex   items-center justify-end  gap-3  mt-0  py-0 md:ps-7">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "active py-0.5 md:py-3 px-4 md:px-1 border-s-2 md:border-s-0 md:border-b-2  font-medium text-blue-500  focus:outline-none dark:border-neutral-200 dark:text-neutral-200  "
                  : "py-0.5 md:py-3 px-4 md:px-1 border-s-2 md:border-s-0 md:border-b-2 border-transparent text-gray-500 hover:text-gray-800 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-200"
              }
              to="/"
              aria-current="page"
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "active py-0.5 md:py-3 px-4 md:px-1 border-s-2 md:border-s-0 md:border-b-2  font-medium text-blue-500  focus:outline-none dark:border-neutral-200 dark:text-neutral-200  "
                  : "py-0.5 md:py-3 px-4 md:px-1 border-s-2 md:border-s-0 md:border-b-2 border-transparent text-gray-500 hover:text-gray-800 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-200"
              }
              to="/palettes"
            >
              Palettes
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
