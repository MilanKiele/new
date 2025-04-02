/*
File: Footer.tsx
Description: Handles the footer.
*/

import { FooterContent, WebName } from "@/constants";
import SocialMediaContainer from "./SocialMediaContainer";

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="pt-12 bg-white">
      <div className="container mx-auto flex flex-col w-full mx-auto px-6">
        {/* Footer content */}
        <div className="px-6 flex gap-24 w-full">
          <div className="flex flex-col md:flex-row md:justify-between gap-12 py-8">
            {FooterContent.sections.map((section) => (
              <div key={section.title} className="flex flex-col gap-3">
                <h3 className="font-semibold text-gray-900 text-lg">
                  {section.title}
                </h3>
                <ul className="space-y-2 text-gray-600">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <a
                        key={link.href}
                        href={link.href}
                        className="text-md font-normal text-gray-600 hover:text-black transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-16 px-6 flex flex-wrap items-center justify-between gap-y-4 border-t border-gray-200 py-6 justify-between max-md:flex-col max-md:flex-col-reverse">
          <p className="text text-center text-low text-gray-800">
            &copy; {CURRENT_YEAR} {WebName}. All rights reserved.
          </p>
          <div className="flex gap-8 items-center">
            <SocialMediaContainer />
          </div>
          <div className="flex gap-8 items-center">
            {FooterContent.bottomLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text text-low font-normal text-gray-800 hover:text-black hover:text-black transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
