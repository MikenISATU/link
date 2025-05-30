'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCardsActive, setIsCardsActive] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCards = () => {
    setIsCardsActive(!isCardsActive);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-black font-sf-pro">
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-100">
        <nav className="flex items-center justify-between px-4 sm:px-12 lg:px-24 py-4 sm:py-5">
          <Link href="/" className="text-xl sm:text-2xl font-medium tracking-tight">
            NFC Studio
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6 lg:gap-10">
            <a
              href="#home"
              className="text-gray-500 hover:text-black transition-all duration-300 ease-out text-sm sm:text-base"
            >
              Home
            </a>
            <a
              href="#nfc-cards"
              className="text-gray-500 hover:text-black transition-all duration-300 ease-out text-sm sm:text-base"
            >
              NFC Cards
            </a>
            <a
              href="#vision"
              className="text-gray-500 hover:text-black transition-all duration-300 ease-out text-sm sm:text-base"
            >
              Vision
            </a>
            <a
              href="#team"
              className="text-gray-500 hover:text-black transition-all duration-300 ease-out text-sm sm:text-base"
            >
              Team
            </a>
          </div>
          {/* Mobile Burger Menu Button */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`w-6 h-0.5 bg-black transition-all duration-300 ease-out ${
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-black transition-all duration-300 ease-out ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-black transition-all duration-300 ease-out ${
                isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </nav>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-lg border-b border-gray-100 px-4 py-6 animate-fade">
            <div className="flex flex-col gap-4 text-center">
              <a
                href="#home"
                className="text-gray-500 hover:text-black transition-all duration-300 ease-out text-lg"
                onClick={toggleMenu}
              >
                Home
              </a>
              <a
                href="#nfc-cards"
                className="text-gray-500 hover:text-black transition-all duration-300 ease-out text-lg"
                onClick={toggleMenu}
              >
                NFC Cards
              </a>
              <a
                href="#vision"
                className="text-gray-500 hover:text-black transition-all duration-300 ease-out text-lg"
                onClick={toggleMenu}
              >
                Vision
              </a>
              <a
                href="#team"
                className="text-gray-500 hover:text-black transition-all duration-300 ease-out text-lg"
                onClick={toggleMenu}
              >
                Team
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="flex flex-col lg:flex-row items-center justify-between min-h-screen px-4 sm:px-12 lg:px-32 pt-20 sm:pt-28 pb-12 sm:pb-20 animate-fade"
      >
        {/* Left Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left gap-6 sm:gap-8 animate-fade">
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-light tracking-tight leading-tight">
            Your NFC Card, Your Way
          </h1>
          <p className="text-sm sm:text-xl lg:text-2xl text-gray-500 max-w-md leading-relaxed">
            Craft a unique NFC card with custom colors, elements, and names. Tap to connect instantly.
          </p>
          <Link
            href="/layout"
            className="rounded-full bg-black text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg font-medium hover:bg-gray-800 transition-all duration-300 ease-out hover:scale-105 active:scale-95"
          >
            Start Customizing
          </Link>
        </div>

        {/* Right Cards */}
        <div className="w-full lg:w-1/2 flex justify-center mt-8 sm:mt-12 lg:mt-0">
          <div
            className="relative w-[18rem] sm:w-[22rem] lg:w-[26rem] h-[10rem] sm:h-[14rem] lg:h-[16rem] group"
            onClick={toggleCards}
          >
            {/* Default Large Card */}
            <div
              className={`absolute inset-0 bg-white rounded-3xl shadow-xl flex flex-col items-center justify-center transition-opacity duration-1000 ease-out ${
                isCardsActive ? "opacity-0" : "md:group-hover:opacity-0"
              }`}
            >
              <Image
                src="/nfc-card.svg"
                alt="NFC Card Preview"
                width={160}
                height={160}
                sizes="(max-width: 640px) 120px, (max-width: 1024px) 140px, 160px"
                className="mb-4 sm:mb-6 w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24"
              />
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light">Your NFC Card</h3>
              <p className="text-xs sm:text-sm lg:text-base text-gray-500 px-4 sm:px-6 lg:px-8 text-center leading-relaxed">
                Tap to explore customization options.
              </p>
            </div>
            {/* Hover/Tap Cards */}
            <div
              className={`absolute inset-0 flex gap-4 sm:gap-6 lg:gap-8 justify-center items-center transition-opacity duration-1000 ease-out ${
                isCardsActive ? "opacity-100" : "opacity-0 md:group-hover:opacity-100"
              }`}
            >
              <div
                className={`w-40 sm:w-44 lg:w-48 h-28 sm:h-30 lg:h-32 bg-black rounded-3xl shadow-lg md:group-hover:shadow-2xl flex flex-col items-center justify-center transition-all duration-1000 ease-out ${
                  isCardsActive
                    ? "-translate-x-16 lg:-translate-x-24 -rotate-12 animate-fade"
                    : "md:group-hover:-translate-x-16 lg:md:group-hover:-translate-x-24 md:group-hover:-rotate-12 md:group-hover:animate-fade"
                }`}
              >
                <p className="text-xs sm:text-sm lg:text-base text-white font-light px-3 sm:px-4 text-center">
                  Black
                </p>
              </div>
              <div
                className={`w-40 sm:w-44 lg:w-48 h-28 sm:h-30 lg:h-32 bg-gray-600 rounded-3xl shadow-lg md:group-hover:shadow-2xl flex flex-col items-center justify-center transition-all duration-1000 ease-out ${
                  isCardsActive
                    ? "scale-110 animate-fade"
                    : "md:group-hover:scale-110 md:group-hover:animate-fade"
                }`}
              >
                <p className="text-xs sm:text-sm lg:text-base text-white font-light px-3 sm:px-4 text-center">
                  Gray
                </p>
              </div>
              <div
                className={`w-40 sm:w-44 lg:w-48 h-28 sm:h-30 lg:h-32 bg-white border border-gray-200 rounded-3xl shadow-lg md:group-hover:shadow-2xl flex flex-col items-center justify-center transition-all duration-1000 ease-out ${
                  isCardsActive
                    ? "translate-x-16 lg:translate-x-24 rotate-12 animate-fade"
                    : "md:group-hover:translate-x-16 lg:md:group-hover:translate-x-24 md:group-hover:rotate-12 md:group-hover:animate-fade"
                }`}
              >
                <p className="text-xs sm:text-sm lg:text-base text-black font-light px-3 sm:px-4 text-center">
                  White
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NFC Cards Section */}
      <section id="nfc-cards" className="px-4 sm:px-12 lg:px-32 py-12 sm:py-20 bg-white animate-fade">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-center mb-8 sm:mb-16">
          NFC Cards
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
          <div className="flex flex-col items-center text-center group animate-fade">
            <Image
              src="/nfc-icon.svg"
              alt="NFC technology"
              width={72}
              height={72}
              sizes="(max-width: 640px) 48px, 72px"
              className="mb-4 sm:mb-6 w-12 sm:w-16 h-12 sm:h-16 transition-transform duration-300 ease-out group-hover:scale-110"
            />
            <h3 className="text-lg sm:text-xl lg:text-2xl font-light mb-2 sm:mb-3">Instant Connection</h3>
            <p className="text-xs sm:text-sm lg:text-base text-gray-500 leading-relaxed">
              Share your details with a single tap using NFC technology.
            </p>
          </div>
          <div className="flex flex-col items-center text-center group animate-fade">
            <Image
              src="/custom-icon.svg"
              alt="Customization"
              width={72}
              height={72}
              sizes="(max-width: 640px) 48px, 72px"
              className="mb-4 sm:mb-6 w-12 sm:w-16 h-12 sm:h-16 transition-transform duration-300 ease-out group-hover:scale-110"
            />
            <h3 className="text-lg sm:text-xl lg:text-2xl font-light mb-2 sm:mb-3">Personalized Design</h3>
            <p className="text-xs sm:text-sm lg:text-base text-gray-500 leading-relaxed">
              Customize colors, elements, and names to match your style.
            </p>
          </div>
          <div className="flex flex-col items-center text-center group animate-fade">
            <Image
              src="/secure-icon.svg"
              alt="Security"
              width={72}
              height={72}
              sizes="(max-width: 640px) 48px, 72px"
              className="mb-4 sm:mb-6 w-12 sm:w-16 h-12 sm:h-16 transition-transform duration-300 ease-out group-hover:scale-110"
            />
            <h3 className="text-lg sm:text-xl lg:text-2xl font-light mb-2 sm:mb-3">Secure & Durable</h3>
            <p className="text-xs sm:text-sm lg:text-base text-gray-500 leading-relaxed">
              Encrypted and built to last for reliable use.
            </p>
          </div>
        </div>
      </section>

      {/* NFC Card Customize Section */}
      <section id="nfc-customize" className="px-4 sm:px-12 lg:px-32 py-12 sm:py-20 animate-fade">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-center mb-8 sm:mb-16">
          Customize Your NFC Card
        </h2>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-16">
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left gap-6 sm:gap-8 animate-fade">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-light">Design Like a Pro</h3>
            <p className="text-xs sm:text-sm lg:text-lg text-gray-500 max-w-md leading-relaxed">
              Use our intuitive editor to choose your card's color, add unique elements, and engrave your name or brand. Preview your design in real-time.
            </p>
            <Link
              href="/layout"
              className="rounded-full bg-black text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg font-medium hover:bg-gray-800 transition-all duration-300 ease-out hover:scale-105 active:scale-95"
            >
              Try Editor1
            </Link>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="w-64 sm:w-80 lg:w-96 h-[18rem] sm:h-[24rem] lg:h-[28rem] bg-white rounded-3xl shadow-xl flex flex-col items-center justify-center animate-fade">
              <Image
                src="/nfc-card-preview.svg"
                alt="NFC Card Editor Preview"
                width={240}
                height={140}
                sizes="(max-width: 640px) 160px, (max-width: 1024px) 200px, 240px"
                className="mb-4 sm:mb-6 w-32 sm:w-40 lg:w-48 h-[4rem] sm:h-[5rem] lg:h-[6rem]"
              />
              <p className="text-xs sm:text-sm lg:text-sm text-gray-500 px-4 sm:px-6 lg:px-8 text-center leading-relaxed">
                Preview your custom NFC card with real-time updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="px-4 sm:px-12 lg:px-32 py-12 sm:py-20 bg-white animate-fade">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-center mb-8 sm:mb-16">
          Our Vision
        </h2>
        <div className="flex flex-col items-center gap-6 sm:gap-10 max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto text-center">
          <p className="text-xs sm:text-sm lg:text-lg text-gray-500 leading-relaxed">
            At NFC Studio, we envision a world where connections are seamless and personal. Our NFC cards empower you to share your identity with a tap, blending cutting-edge technology with stunning design.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="px-4 sm:px-12 lg:px-32 py-12 sm:py-20 animate-fade">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-center mb-8 sm:mb-16">
          Our Team
        </h2>
        <div className="flex flex-col items-center gap-6 sm:gap-10 max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto text-center">
          <p className="text-xs sm:text-sm lg:text-lg text-gray-500 leading-relaxed">
            Meet the innovators behind NFC Studio. Our team of designers, engineers, and visionaries is dedicated to crafting the future of connectivity.
          </p>
          <a
            className="rounded-full border border-gray-200 text-black px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg font-medium hover:bg-gray-100 hover:border-gray-300 transition-all duration-300 ease-out hover:scale-105 active:scale-95"
            href="#contact"
          >
            Contact Us
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex flex-col gap-6 sm:gap-8 items-center justify-center py-12 sm:py-16 px-4 sm:px-12 lg:px-32 bg-white border-t border-gray-100">
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
          <a
            className="flex items-center gap-2 text-gray-500 hover:text-black transition-all duration-300 ease-out hover:scale-105"
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/x-icon.svg"
              alt="X icon"
              width={16}
              height={16}
              sizes="(max-width: 640px) 16px, 20px"
              className="w-4 sm:w-5 h-4 sm:h-5"
            />
            X
          </a>
          <a
            className="flex items-center gap-2 text-gray-500 hover:text-black transition-all duration-300 ease-out hover:scale-105"
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/facebook-icon.svg"
              alt="Facebook icon"
              width={16}
              height={16}
              sizes="(max-width: 640px) 16px, 20px"
              className="w-4 sm:w-5 h-4 sm:h-5"
            />
            Facebook
          </a>
          <a
            className="flex items-center gap-2 text-gray-500 hover:text-black transition-all duration-300 ease-out hover:scale-105"
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/instagram-icon.svg"
              alt="Instagram icon"
              width={16}
              height={16}
              sizes="(max-width: 640px) 16px, 20px"
              className="w-4 sm:w-5 h-4 sm:h-5"
            />
            Instagram
          </a>
        </div>
        <p className="text-xs sm:text-sm text-gray-400">
          © 2025 NFC Studio. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
