'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { useDrag, usePinch } from '@use-gesture/react';
import { useSpring, animated } from '@react-spring/web';

export default function CardEditor() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState('/symbol-1.svg');
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [name, setName] = useState('');
  const [socialLinks, setSocialLinks] = useState({
    x: '',
    facebook: '',
    instagram: '',
    linkedin: '',
  });
  const [symbolPosition, setSymbolPosition] = useState({ x: 0, y: 0 });
  const [namePosition, setNamePosition] = useState({ x: 0, y: 0 });
  const [symbolScale, setSymbolScale] = useState(1);
  const [nameScale, setNameScale] = useState(1);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [showColors, setShowColors] = useState(false);
  const [showSymbols, setShowSymbols] = useState(false);
  const [previewRotation, setPreviewRotation] = useState({ x: 0, y: 0 });

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSymbolChange = (symbol: string) => {
    setSelectedSymbol(symbol);
    setShowSymbols(false);
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    setShowColors(false);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const handleSocialChange = (platform: string, value: string) =>
    setSocialLinks((prev) => ({ ...prev, [platform]: value }));

  const cardRef = useRef<HTMLDivElement>(null);

  const bindSymbolDrag = useDrag(
    ({ movement: [mx, my], event, delta: [dx, dy] }) => {
      event.preventDefault();
      event.stopPropagation();
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const scale = symbolScale;
        const symbolWidth = 80 * scale;
        const symbolHeight = 80 * scale;
        setSymbolPosition((prev) => {
          const newX = Math.max(
            -rect.width / 2 + symbolWidth / 2,
            Math.min(rect.width / 2 - symbolWidth / 2, prev.x + dx)
          );
          const newY = Math.max(
            -rect.height / 2 + symbolHeight / 2,
            Math.min(rect.height / 2 - symbolHeight / 2, prev.y + dy)
          );
          return { x: newX, y: newY };
        });
      }
    },
    { bounds: cardRef, preventDefault: true, threshold: 0, delay: 0 }
  );

  const bindNameDrag = useDrag(
    ({ movement: [mx, my], event, delta: [dx, dy] }) => {
      event.preventDefault();
      event.stopPropagation();
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const scale = nameScale;
        const nameWidth = 100 * scale;
        const nameHeight = 20 * scale;
        setNamePosition((prev) => {
          const newX = Math.max(
            -rect.width / 2 + nameWidth / 2,
            Math.min(rect.width / 2 - nameWidth / 2, prev.x + dx)
          );
          const newY = Math.max(
            -rect.height / 2 + nameHeight / 2,
            Math.min(rect.height / 2 - nameHeight / 2, prev.y + dy)
          );
          return { x: newX, y: newY };
        });
      }
    },
    { bounds: cardRef, preventDefault: true, threshold: 0, delay: 0 }
  );

  const bindSymbolPinch = usePinch(
    ({ offset: [scale], event }) => {
      event.preventDefault();
      const newScale = Math.max(0.5, Math.min(2, scale));
      setSymbolScale(newScale);
    },
    { scaleBounds: { min: 0.5, max: 2 }, rubberband: 0.2 }
  );

  const bindNamePinch = usePinch(
    ({ offset: [scale], event }) => {
      event.preventDefault();
      const newScale = Math.max(0.5, Math.min(2, scale));
      setNameScale(newScale);
    },
    { scaleBounds: { min: 0.5, max: 2 }, rubberband: 0.2 }
  );

  const handleWheel = (
    e: React.WheelEvent<HTMLDivElement>,
    setScale: React.Dispatch<React.SetStateAction<number>>
  ) => {
    e.preventDefault();
    setScale((prev) => {
      const delta = e.deltaY > 0 ? -0.05 : 0.05;
      return Math.max(0.5, Math.min(2, prev + delta));
    });
  };

  const [cardSpring, api] = useSpring(() => ({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    config: { mass: 2, tension: 120, friction: 60 },
  }));

  const backSVGs: { [key: string]: string } = {
    '#000000': 'BACK TEST',
    '#4B5563': 'BACK TEST',
    '#FFFFFF': 'BACK TEST',
    '#3B82F6': 'BACK TEST',
    '#EF4444': 'BACK TEST',
  };

  const bindCardActions = useDrag(
    ({ active, movement: [mx, my] }) => {
      if (cardRef.current && isPreviewMode) {
        const deltaX = -(mx / 12) * 90;
        const deltaY = (my / 12) * 90;
        const newRotateY = Math.max(-180, Math.min(180, previewRotation.y + deltaX));
        const newRotateX = Math.max(-45, Math.min(45, previewRotation.x + deltaY));
        setPreviewRotation({ x: newRotateX, y: newRotateY });
        api.start({
          rotateX: newRotateX,
          rotateY: newRotateY,
          scale: active ? 1.1 : 1.0,
        });
      }
    },
    { filterTaps: true }
  );

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
    if (isPreviewMode) {
      setPreviewRotation({ x: 0, y: 0 });
      setIsFlipped(false);
      api.start({ rotateX: 0, rotateY: 0, scale: 1 });
    } else {
      setPreviewRotation({ x: 0, y: 0 });
    }
  };

  const toggleCardBack = () => {
    if (isPreviewMode) {
      setIsFlipped(!isFlipped);
      const newRotateY = isFlipped ? 0 : 180;
      setPreviewRotation((prev) => ({ ...prev, y: newRotateY }));
      api.start({ rotateY: newRotateY, scale: 1.1 });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 font-sans">
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          background: black;
          border-radius: 50%;
          cursor: pointer;
        }
        input[type="range"]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: black;
          border-radius: 50%;
          cursor: pointer;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>

      {isPreviewMode && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-lg flex items-center justify-center">
          <button
            type="button"
            onClick={togglePreviewMode}
            className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-all duration-300"
            aria-label="Exit Preview"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button
            type="button"
            onClick={toggleCardBack}
            className="absolute top-4 right-16 p-2 bg-white/90 rounded-full hover:bg-white transition-all duration-300"
            aria-label={isFlipped ? "Show Front" : "Show Back"}
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </button>
          <animated.div
            ref={cardRef}
            className="w-full max-w-[32rem] aspect-[1.6/1] rounded-2xl shadow-2xl relative overflow-hidden"
            style={{
              transformStyle: 'preserve-3d',
              transform: cardSpring.rotateX.to(
                (rx: number) => `perspective(1200px) rotateX(${rx}deg) rotateY(${cardSpring.rotateY.get()}deg) scale(${cardSpring.scale.get()})`
              ),
            }}
            {...bindCardActions()}
          >
            <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden' }}>
              <div
                className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white/10 to-white/5 rounded-2xl"
                style={{ backgroundColor: selectedColor }}
              >
                <div
                  className="absolute touch-none"
                  style={{ transform: `translate(${symbolPosition.x}px, ${symbolPosition.y}px) scale(${symbolScale})` }}
                >
                  <Image
                    src={selectedSymbol}
                    alt="Selected Symbol"
                    width={80}
                    height={80}
                    sizes="(max-width: 640px) 60px, 80px"
                    className="w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24"
                  />
                </div>
                <div
                  className="absolute touch-none"
                  style={{ transform: `translate(${namePosition.x}px, ${namePosition.y}px) scale(${nameScale})` }}
                >
                  <p
                    className={`text-sm sm:text-base lg:text-lg font-medium text-center px-3 ${selectedColor === '#FFFFFF' ? 'text-black' : 'text-white'}`}
                    style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 500, letterSpacing: '0.02em' }}
                  >
                    {name || 'Your Name'}
                  </p>
                </div>
              </div>
            </div>
            <div
              className="absolute inset-0"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-2xl">
                <p className="text-lg font-medium text-gray-600">{backSVGs[selectedColor]}</p>
              </div>
            </div>
          </animated.div>
        </div>
      )}

      <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-b border-gray-100">
        <nav className="flex items-center justify-between px-4 sm:px-12 lg:px-16 py-4 sm:py-5">
          <Link href="/" className="text-xl sm:text-2xl font-medium tracking-tight">
            NFC Studio
          </Link>
          <div className="hidden md:flex gap-6 lg:gap-10">
            <a href="#home" className="text-gray-500 hover:text-black transition-colors duration-300 text-sm sm:text-base">Home</a>
            <a href="#nfc-cards" className="text-gray-500 hover:text-black transition-colors duration-300 text-sm sm:text-base">NFC Cards</a>
            <a href="#vision" className="text-gray-500 hover:text-black transition-colors duration-300 text-sm sm:text-base">Vision</a>
            <a href="#team" className="text-gray-500 hover:text-black transition-colors duration-300 text-sm sm:text-base">Team</a>
          </div>
          <button
            type="button"
            className="md:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1.5"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className={`w-6 h-0.5 bg-black rounded transition-all duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-0.5 bg-black rounded transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-black rounded transition-all duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </nav>
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-lg border-b border-gray-100 px-4 py-6 animate-fadeIn">
            <div className="flex flex-col items-center gap-4">
              <a href="#home" className="text-gray-500 hover:text-black transition-colors duration-300 text-lg" onClick={toggleMenu}>Home</a>
              <a href="#nfc-cards" className="text-gray-500 hover:text-black transition-colors duration-300 text-lg" onClick={toggleMenu}>NFC Cards</a>
              <a href="#vision" className="text-gray-500 hover:text-black transition-colors duration-300 text-lg" onClick={toggleMenu}>Vision</a>
              <a href="#team" className="text-gray-500 hover:text-black transition-colors duration-300 text-lg" onClick={toggleMenu}>Team</a>
            </div>
          </div>
        )}
      </header>

      {!isPreviewMode && (
        <section id="card-editor" className="flex flex-col items-center justify-start px-4 sm:px-12 lg:px-16 pt-24 sm:pt-32 pb-12 sm:pb-16 min-h-screen">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-black text-center mb-8 sm:mb-12">
            Design Your NFC Card
          </h2>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-12 w-full max-w-6xl">
            <div className="w-full lg:w-1/2 flex flex-col items-center gap-4 sm:gap-6 order-1 lg:order-2">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-medium">Card Preview</h3>
              <div
                ref={cardRef}
                className="w-full max-w-[28rem] aspect-[1.6/1] rounded-2xl shadow-xl relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5"
                style={{ backgroundColor: selectedColor, pointerEvents: 'none' }}
              >
                <div
                  {...bindSymbolDrag()}
                  {...bindSymbolPinch()}
                  className="absolute cursor-move group touch-none ring-2 ring-transparent hover:ring-blue-500/50 transition-all duration-200"
                  style={{ transform: `translate(${symbolPosition.x}px, ${symbolPosition.y}px) scale(${symbolScale})`, pointerEvents: 'auto' }}
                  onWheel={(e) => handleWheel(e, setSymbolScale)}
                >
                  <Image
                    src={selectedSymbol}
                    alt="Selected Symbol"
                    width={80}
                    height={80}
                    sizes="(max-width: 640px) 60px, 80px"
                    className="w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24"
                  />
                  <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" title="Scroll to resize" />
                </div>
                <div
                  {...bindNameDrag()}
                  {...bindNamePinch()}
                  className="absolute cursor-move group touch-none ring-2 ring-transparent hover:ring-blue-500/50 transition-all duration-200"
                  style={{ transform: `translate(${namePosition.x}px, ${namePosition.y}px) scale(${nameScale})`, pointerEvents: 'auto' }}
                  onWheel={(e) => handleWheel(e, setNameScale)}
                >
                  <p
                    className={`text-sm sm:text-base lg:text-lg font-medium text-center px-3 ${selectedColor === '#FFFFFF' ? 'text-black' : 'text-white'}`}
                    style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 500, letterSpacing: '0.02em' }}
                  >
                    {name || 'Your Name'}
                  </p>
                  <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" title="Scroll to resize" />
                </div>
              </div>
              <div className="flex gap-4 w-full max-w-xs">
                <div className="w-full">
                  <label className="text-sm font-light">Symbol Size</label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.05"
                    value={symbolScale}
                    onChange={(e) => setSymbolScale(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                  />
                </div>
                <div className="w-full">
                  <label className="text-sm font-light">Name Size</label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.05"
                    value={nameScale}
                    onChange={(e) => setNameScale(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                  />
                </div>
              </div>
              <div className="flex gap-4 w-full max-w-xs">
                <button
                  type="button"
                  onClick={togglePreviewMode}
                  className="flex-1 rounded-full px-6 py-3 text-sm sm:text-base font-medium bg-black text-white hover:bg-gray-800 transition-all duration-300 ease-out hover:scale-105 active:scale-95"
                >
                  Preview 3D
                </button>
                <a
                  href="https://checkout.thirdparty.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-full bg-gradient-to-r from-black to-gray-800 text-white px-10 py-3 text-sm sm:text-base font-medium hover:from-gray-800 hover:to-gray-700 transition-all duration-300 ease-out hover:scale-105 active:scale-95"
                >
                  Checkout
                </a>
              </div>
            </div>
            <div className="w-full lg:w-1/2 flex flex-col gap-6 sm:gap-8 order-2 lg:order-1">
              <div className="flex flex-col gap-4">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-light">Choose a Symbol</h3>
                <div className="relative">
                  <button
                    type="button"
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg border border-gray-300 hover:border-blue-500 transition-all duration-300 ease-out hover:scale-105"
                    onClick={() => setShowSymbols(!showSymbols)}
                  >
                    <Image
                      src={selectedSymbol}
                      alt="Selected Symbol"
                      width={48}
                      height={48}
                      sizes="(max-width: 640px) 40px, 48px"
                      className="w-full h-full p-2"
                    />
                  </button>
                  {showSymbols && (
                    <div className="absolute top-14 sm:top-16 left-0 flex flex-wrap gap-2 bg-white shadow-lg p-4 rounded-lg z-10 animate-fadeIn">
                      {['/symbol-1.svg', '/symbol-2.svg', '/symbol-3.svg', '/symbol-4.svg', '/symbol-5.svg'].map((symbol) => (
                        <button
                          key={symbol}
                          type="button"
                          onClick={() => handleSymbolChange(symbol)}
                          className={`w-12 h-12 sm:w-16 sm:h-16 rounded-lg border ${selectedSymbol === symbol ? 'border-blue-500' : 'border-gray-200'} hover:border-blue-600 transition-all duration-200 ease-out hover:scale-105`}
                        >
                          <Image
                            src={symbol}
                            alt="Symbol"
                            width={48}
                            height={48}
                            sizes="(max-width: 640px) 40px, 48px"
                            className="w-full h-full p-2"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-light">Choose a Color</h3>
                <div className="relative">
                  <div
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg border border-gray-300 hover:border-blue-500 hover:scale-105 cursor-pointer transition-all duration-300 ease-out"
                    style={{ backgroundColor: selectedColor }}
                    onClick={() => setShowColors(!showColors)}
                  ></div>
                  {showColors && (
                    <div className="absolute top-14 sm/top-16 left-0 flex flex-wrap gap-2 bg-white shadow-lg p-4 rounded-lg z-10 animate-fadeIn">
                      {[
                        { color: '#000000', name: 'Black' },
                        { color: '#4B5563', name: 'Gray' },
                        { color: '#FFFFFF', name: 'White' },
                        { color: '#3B82F6', name: 'Blue' },
                        { color: '#EF4444', name: 'Red' },
                      ].map(({ color, name }) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => handleColorChange(color)}
                          className={`w-12 h-12 sm:w-16 sm:h-16 rounded-lg border ${
                            selectedColor === color ? 'border-blue-500' : 'border-gray-200'
                          } hover:border-blue-600 hover:scale-105 transition-all duration-200 ease-out`}
                          style={{ backgroundColor: color }}
                          aria-label={`Select ${name} color`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-light">Enter Your Name</h3>
                <input
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  placeholder="Your Name"
                  className="w-full max-w-sm px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm sm:text-base transition-all duration-200 ease-out"
                />
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-light">Enter Social Media Links</h3>
                <div className="flex flex-col gap-4">
                  {['x', 'facebook', 'instagram', 'linkedin'].map((platform) => (
                    <input
                      key={platform}
                      type="url"
                      value={socialLinks[platform as keyof typeof socialLinks]}
                      onChange={(e) => handleSocialChange(platform, e.target.value)}
                      placeholder={`https://${platform}.com/yourprofile`}
                      className="w-full max-w-sm px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm sm:text-base transition-all duration-300 ease-out"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {!isPreviewMode && (
        <footer className="flex flex-col gap-6 sm:gap-8 items-center justify-center py-12 sm:py-16 px-4 sm:px-12 lg:px-32 bg-white border-t border-gray-100">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
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
              className="flex items. flex items-center gap-2 text-gray-500 hover:text-black transition-all duration-300 ease-out hover:scale-105"
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
      )}
    </div>
  );
}
