import React, { useState, useEffect } from 'react';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

// Responsive, sticky, animated dark-themed navigation bar with neon accents, smooth scroll, animated underline/glow, active section highlight, hamburger menu for mobile, and a scroll progress indicator at the top. Built with React, Tailwind CSS, and react-scroll.

const sections = [
  { name: 'Home', to: 'home' },
  { name: 'About', to: 'about' },
  { name: 'Resume', to: '/mycv.pdf', type: 'external' },
  { name: 'Projects', to: 'projects' },
  { name: 'Contact', to: 'contact' },
];

const neon = 'text-[#39ff14]';
const neonBg = 'bg-[#39ff14]';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll progress bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section highlight
  useEffect(() => {
    const handleScroll = () => {
      const offsets = sections.map(({ to }) => {
        const el = document.getElementById(to);
        if (!el) return 0;
        return el.getBoundingClientRect().top;
      });
      const activeIdx = offsets.findIndex((offset, i) => {
        if (i === offsets.length - 1) return true;
        return offset >= -100 && offset < 200;
      });
      setActive(sections[Math.max(0, activeIdx)].to);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <div
          className={`h-1 ${neonBg} transition-all duration-200`}
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-40 bg-[#18181b] bg-opacity-95 shadow-lg border-b border-[#222]">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-2">
          <div className="font-bold text-xl tracking-widest text-white cursor-pointer select-none" onClick={() => scroll.scrollToTop()}>
            <span className={neon}>Rojan Rayaskhetri</span>
          </div>
          {/* Desktop Nav */}
          <ul className="hidden md:flex gap-8 text-lg font-semibold">
            {sections.map(({ name, to, type }) => (
              <li key={to}>
                {type === 'external' ? (
                  <a
                    href={to}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative px-2 py-1 cursor-pointer transition-colors duration-200
                      ${active === to ? `${neon} font-extrabold` : 'text-white'}
                    `}
                  >
                    <span className="relative group">
                      {name}
                      {/* Underline/Glow */}
                      <span
                        className={`absolute left-0 -bottom-1 w-full h-1 rounded-full
                          transition-all duration-300
                          ${active === to ? `opacity-100 ${neonBg} shadow-[0_0_8px_2px_#39ff14]` : 'opacity-0 group-hover:opacity-100 group-hover:' + neonBg + ' group-hover:shadow-[0_0_8px_2px_#39ff14]'}`}
                      />
                    </span>
                  </a>
                ) : (
                  <ScrollLink
                    to={to}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    className={`relative px-2 py-1 cursor-pointer transition-colors duration-200
                      ${active === to ? `${neon} font-extrabold` : 'text-white'}
                    `}
                    activeClass=""
                  >
                    <span className="relative group">
                      {name}
                      {/* Underline/Glow */}
                      <span
                        className={`absolute left-0 -bottom-1 w-full h-1 rounded-full
                          transition-all duration-300
                          ${active === to ? `opacity-100 ${neonBg} shadow-[0_0_8px_2px_#39ff14]` : 'opacity-0 group-hover:opacity-100 group-hover:' + neonBg + ' group-hover:shadow-[0_0_8px_2px_#39ff14]'}`}
                      />
                    </span>
                  </ScrollLink>
                )}
              </li>
            ))}
          </ul>
          {/* Hamburger */}
          <button
            className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#39ff14]"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? (
              <XMarkIcon className="w-8 h-8 text-[#39ff14]" />
            ) : (
              <Bars3Icon className="w-8 h-8 text-[#39ff14]" />
            )}
          </button>
        </div>
        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed top-0 left-0 w-full h-full bg-[#18181b] bg-opacity-95 z-40 transition-transform duration-300 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="flex flex-col items-center justify-center h-full gap-10">
            {sections.map(({ name, to, type }) => (
              <li key={to}>
                {type === 'external' ? (
                  <a
                    href={to}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-2xl font-bold cursor-pointer transition-colors duration-200
                      ${active === to ? `${neon} font-extrabold` : 'text-white'}
                    `}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="relative group">
                      {name}
                      <span
                        className={`absolute left-0 -bottom-1 w-full h-1 rounded-full
                          transition-all duration-300
                          ${active === to ? `opacity-100 ${neonBg} shadow-[0_0_8px_2px_#39ff14]` : 'opacity-0 group-hover:opacity-100 group-hover:' + neonBg + ' group-hover:shadow-[0_0_8px_2px_#39ff14]'}`}
                      />
                    </span>
                  </a>
                ) : (
                  <ScrollLink
                    to={to}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    className={`text-2xl font-bold cursor-pointer transition-colors duration-200
                      ${active === to ? `${neon} font-extrabold` : 'text-white'}
                    `}
                    onClick={() => setMenuOpen(false)}
                    activeClass=""
                  >
                    <span className="relative group">
                      {name}
                      <span
                        className={`absolute left-0 -bottom-1 w-full h-1 rounded-full
                          transition-all duration-300
                          ${active === to ? `opacity-100 ${neonBg} shadow-[0_0_8px_2px_#39ff14]` : 'opacity-0 group-hover:opacity-100 group-hover:' + neonBg + ' group-hover:shadow-[0_0_8px_2px_#39ff14]'}`}
                      />
                    </span>
                  </ScrollLink>
                )}
              </li>
            ))}
          </div>
        </div>
        {/* Overlay for mobile menu */}
        {menuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </nav>
      {/* Spacer for sticky nav */}
      <div className="h-14 md:h-16" />
    </>
  );
} 