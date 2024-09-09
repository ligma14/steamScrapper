'use client';

import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-8 ">
      <div className="container text-sm mx-auto flex flex-col md:flex-row justify-between items-center sm:px-10 px-5">
        {/* Logo and Info */}
        <div className="mb-6 md:mb-0 max-sm:text-center max-sm:flex-col">
          <Link href="/">
            <img src='/logo-stsc.svg' alt='logo' />
          </Link>
          <p className="mt-2 text-gray-400">
            Lorem ipsum dolor sit amet.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row gap-8 text-center text-gray-500 text-sm transition-all">
          <Link href="/about" className="hover:text-white">
            About Us
          </Link>
          <Link href="/services" className="hover:text-white">
            Services
          </Link>
          <Link href="/contact" className="hover:text-white">
            Contact
          </Link>
          <Link href="/faq" className="hover:text-white">
            FAQ
          </Link>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-6 mt-6 md:mt-0 items-center">
          <a href="https://www.github.com" target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 transition-all">
            <img src="./github.svg"></img>
          </a>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-8 pt-4">
        <div className="container mx-auto text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} SteamScrapper. This site is not affiliated with Valve, Steam, or any of their partners. All copyrights reserved to their respective owners.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;