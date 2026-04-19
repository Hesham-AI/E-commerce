import React from 'react'
import { Link, NavLink } from "react-router-dom";

export default function Notfound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="text-center space-y-6">

        {/* 404 NUMBER */}
        <h1 className="text-[120px] font-extrabold text-emerald-600 leading-none">
          404
        </h1>

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-gray-800">
          Oops! Page Not Found
        </h2>

        {/* DESCRIPTION */}
        <p className="text-gray-500 max-w-md mx-auto">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        {/* IMAGE (optional icon feel) */}
        <div className="flex justify-center">
          <img
            src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
            alt="not found"
            className="w-72"
          />
        </div>

        {/* BUTTON */}
       <NavLink to="/Login" >
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition">
            Go Back Home
          </button> 
       </NavLink>
      
       

      </div>

    </div>
  );
}
