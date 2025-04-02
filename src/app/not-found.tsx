/*
File: not-found.tsx
Description: Active when no page was found.
*/

import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="flex justify-center items-center h-[90vh] text-center">
        <div className="flex flex-col items-center justify-center">
          <div>
            <h1 className="font-bold text-6xl bg-gradient-to-t from-accent-3 to-accent-1 bg-clip-text header-color">
              404.
            </h1>
            <h1 className="font-bold text-4xl bg-gradient-to-t from-accent-3 to-accent-1 bg-clip-text header-color">
              Page not found!
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
