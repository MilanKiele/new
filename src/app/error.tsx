/*
File: error.tsx
Description: Always active when error occurs
*/

"use client";

import Link from "next/link";

export default function ErrorPage() {
  return (
    <section className="error-page">
      <div className="flex justify-center items-center h-[80vh] text-center">
        <div className="flex flex-col items-center justify-center">
          <div>
            <h1 className="font-bold text-6xl bg-gradient-to-t from-accent-3 to-accent-1 bg-clip-text header-color">
              404.
            </h1>
            <h1 className="font-bold text-4xl bg-gradient-to-t from-accent-3 to-accent-1 bg-clip-text header-color">
              Error occured!
            </h1>
          </div>
          <Link
            className="mt-6 text-color px-6 py-3 bg-accent-4 rounded-lg transform hover:scale-110 hover:bg-accent-3 transition-transform duration-300 ease-in-out text-black"
            href="/"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
