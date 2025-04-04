/*
File: Navbar.tsx
Description: Navbar component.
*/

"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { NavbarConfig, WebName } from "@/constants";
import { useSession } from "next-auth/react";
import GithubButton from "./GithubButton";
import YouTubeButton from "./YoutubeButton";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  const handleOpen = () => {
    setOpen((cur) => !cur);
    document.body.classList.toggle("overflow-hidden", !open);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1260) {
        setOpen(false);
        document.body.classList.remove("overflow-hidden");
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav id="navbar" className="h-20">
      <div className="w-full fixed z-[100] bg-white px-6 shadow-md">
        {/* Default Bar */}
        <div className="h-20 mx-auto container flex items-center justify-between">
          {/* Left Section: Logo + Buttons */}
          <div className="flex items-center gap-4">
            <Link href="/" className="text-lg font-bold text-black">
              <p className="block antialiased font-sans text-black text-2xl font-bold tracking-tighter">
                {WebName}
              </p>
            </Link>
            <div className="hidden lg:flex ml-4 gap-4">
              <GithubButton />
              <YouTubeButton />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {NavbarConfig.map((item) => (
              <div key={item.id}>
                <Link
                  href={`${item.id}`}
                  className="text-black font-[500] hover:bg-black/10 py-3 px-4 rounded-lg transition"
                >
                  {item.name}
                </Link>
              </div>
            ))}
            {session ? (
              <Link
                href="/auth/settings"
                onClick={() => setOpen(false)}
                className="text-black border border-black font-semibold hover:bg-black hover:text-white py-2 px-4 rounded-md transition w-fit"
              >
                Profile
              </Link>
            ) : (
              <Link
                href="/auth/login"
                onClick={() => setOpen(false)}
                className="text-black border border-black font-semibold hover:bg-black hover:text-white py-2 px-4 rounded-md transition w-fit"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-black hover:bg-black/10 p-2 rounded-lg transition"
            onClick={handleOpen}
          >
            <span className="sr-only">
              {open ? "Menü schließen" : "Menü öffnen"}
            </span>
            <div className="relative w-8 h-8">
              <XMarkIcon
                className={`absolute w-8 h-8 transition-transform duration-300 ${
                  open ? "rotate-0 opacity-100" : "rotate-90 opacity-0"
                }`}
              />
              <Bars3Icon
                className={`absolute w-8 h-8 transition-transform duration-300 ${
                  open ? "-rotate-90 opacity-0" : "rotate-0 opacity-100"
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Fullscreen Navigation */}
        <div
          className={`fixed inset-0 z-[100] h-full w-full mt-20 transition-opacity duration-300 ${
            open ? "opacity-100 visible" : "opacity-0 invisible"
          } lg:hidden`}
        >
          <div className="w-full h-full bg-gray-200">
            <div className="w-full flex flex-col items-center py-6 gap-4 text-black text-xl font-semibold">
              {NavbarConfig.map((item) => (
                <div className="w-full" key={item.id}>
                  <Link
                    href={`${item.id}`}
                    onClick={() => setOpen(false)}
                    className="text-black font-[500] hover:bg-black/10 py-3 px-8 rounded-lg transition w-full text-center block"
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
              {session ? (
                <Link
                  href="/auth/settings"
                  onClick={() => setOpen(false)}
                  className="text-black font-[500] hover:bg-black/10 py-3 px-8 rounded-lg transition w-full text-center block"
                >
                  Profile
                </Link>
              ) : (
                <Link
                  href="/auth/login"
                  onClick={() => setOpen(false)}
                  className="text-black font-[500] hover:bg-black/10 py-3 px-8 rounded-lg transition w-full text-center block"
                >
                  Sign In
                </Link>
              )}
              {/* Extra buttons for mobile view */}
              <div className="w-full">
                <div className="pt-3 rounded-lg transition w-full text-center flex justify-center">
                  <GithubButton />
                </div>
              </div>
              <div className="w-full">
                <div className="py-0 rounded-lg transition w-full text-center flex justify-center">
                  <YouTubeButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
