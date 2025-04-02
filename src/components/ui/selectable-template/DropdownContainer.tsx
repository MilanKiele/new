/*
File: DropdownContainer.tsx
Description: A small dropdown menu.
*/

import React from "react";
import Link from "next/link";

interface DropdownProps {
  title: string;
  links: { href: string; label: string }[];
}

const DropdownContainer: React.FC<DropdownProps> = ({ title, links }) => {
  return (
    <div className="relative group">
      <button className="text-white font-[500] hover:bg-white/10 py-2 px-4 rounded-lg transition border border-gray-500 min-w-[160px] flex items-center justify-center gap-2">
        <span>{title}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div className="absolute hidden group-hover:block bg-white shadow-md rounded-lg p-2">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="block px-4 py-2 text-black hover:bg-gray-200 rounded-md"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DropdownContainer;
