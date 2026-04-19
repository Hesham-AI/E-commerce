import React from 'react'
import freshcart from '../assets/images/freshcart.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useRef, useState } from 'react'
import { authContext } from '../context/AuthContext'

export default function Navbar() {
  const { Token, setToken } = useContext(authContext);
  const navigate = useNavigate();

  // ===== SCROLL STATE =====
  const [show, setShow] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current) {
        setShow(false); // scroll down
      } else {
        setShow(true); // scroll up
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function logoutUser() {
    localStorage.removeItem("tkn");
    setToken(null);
    navigate("/login");
  }

  return (
    <div
      className={`bg-emerald-600 shadow-md sticky top-0 z-50 transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >

      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">

        {/* LEFT */}
        <div className="flex items-center gap-8">

          {/* LOGO */}
          <img src={freshcart} alt="FreshCart Logo" className="w-32" />

          {/* LINKS */}
          <ul className="hidden md:flex gap-6 text-white font-medium">

            {Token && (
              <>
                <li>
                  <NavLink
                    to="/products"
                 className={({ isActive }) =>
    `relative transition ${
      isActive
        ? "text-yellow-300 font-semibold after:w-full"
        : "text-white after:w-0"
    } after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-blue-300 after:transition-all after:duration-300`
  }
                  >
                    Products
                  </NavLink>
                </li>

                <li>
                  <NavLink
                 to="/cart"
  className={({ isActive }) =>
    `relative transition ${
      isActive
        ? "text-yellow-300 font-semibold after:w-full"
        : "text-white after:w-0"
    } after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-blue-300 after:transition-all after:duration-300`
  }
>
  Cart
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/categories"
                className={({ isActive }) =>
    `relative transition ${
      isActive
        ? "text-yellow-300 font-semibold after:w-full"
        : "text-white after:w-0"
    } after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-blue-300 after:transition-all after:duration-300`
  }
                  >
                    Categories
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/brands"
                  className={({ isActive }) =>
    `relative transition ${
      isActive
        ? "text-yellow-300 font-semibold after:w-full"
        : "text-white after:w-0"
    } after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-blue-300 after:transition-all after:duration-300`
  }
                  >
                    Brands
                  </NavLink>
                </li>
              </>
            )}

          </ul>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-6">

          {/* SOCIAL */}
          <div className="hidden md:flex gap-4 text-white text-lg">
            <i className="fa-brands fa-instagram hover:text-pink-300 cursor-pointer transition"></i>
            <i className="fa-brands fa-facebook hover:text-blue-300 cursor-pointer transition"></i>
            <i className="fa-brands fa-twitter hover:text-sky-300 cursor-pointer transition"></i>
            <i className="fa-brands fa-linkedin hover:text-blue-200 cursor-pointer transition"></i>
          </div>

          {/* AUTH */}
          <ul className="flex items-center gap-4 text-white font-medium">

            {Token ? (
              <li>
                <button
                  onClick={logoutUser}
                  className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-lg transition"
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <NavLink to="/register" className="hover:text-yellow-200 transition">
                    Register
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/login" className="hover:text-yellow-200 transition">
                    Login
                  </NavLink>
                </li>
              </>
            )}

          </ul>

        </div>

      </div>

    </div>
  );
}