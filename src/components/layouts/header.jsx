import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { FaAnglesUp } from "react-icons/fa6";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOutsideClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div id="header-icon" className="flex items-center">
          <div id="icon-class" className="text-2xl font-bold">
            <span id="icon-name">Kampung Ramiki</span>
          </div>
        </div>

        {/* Hamburger Menu for Tablet and Mobile */}
        <button
          className="lg:hidden text-black text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaAnglesUp /> : <FaBars />}
        </button>

        {/* Navigation for Desktop */}
        <nav className="hidden lg:flex space-x-8">
          <ul className="flex space-x-8">
            <li className="hover:text-orange-200 transition">Home</li>
            <li className="hover:text-orange-200 transition">Contact</li>
            <li className="hover:text-orange-200 transition">Education</li>
          </ul>
        </nav>
      </div>

      {/* Overlay for Tablet */}
      {isMenuOpen && (
        <div
          className="hidden md:block fixed inset-0 bg-black opacity-70 z-40 lg:hidden"
          onClick={handleOutsideClick}
        ></div>
      )}

      {/* Slide-in Menu for Tablet */}
      <div
        className={`hidden md:block lg:hidden fixed top-0 right-0 h-full w-1/2 bg-white z-50 transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300`}
      >
        <ul className="flex flex-col space-y-4 p-6">
          <li
            className="hover:text-orange-200 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </li>
          <li
            className="hover:text-orange-200 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </li>
          <li
            className="hover:text-orange-200 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Education
          </li>
        </ul>
      </div>

      {/* Dropdown Menu for Mobile */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col items-center space-y-4 bg-white py-4 shadow-md">
          <li
            className="hover:text-orange-200 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </li>
          <li
            className="hover:text-orange-200 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </li>
          <li
            className="hover:text-orange-200 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Education
          </li>
        </ul>
      </div>
    </header>
  );
}
