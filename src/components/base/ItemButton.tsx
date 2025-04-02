/*
File: ItemButton.tsx
Description: This creates an icon button
*/

import React from "react";
import Image from "next/image";

const ItemButton = ({
  size = 32,
  link = "/",
  src = "icons/youtube.svg",
  alt = "YouTube",
  id = "youtube-icon",
}) => {
  return (
    <div className="p-2 rounded-full flex items-center justify-center">
      <div className="rounded-full flex items-center justify-center transform hover:scale-125 transition-transform">
        <a
          href={link}
          className="rounded-full"
          id={id}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={src}
            alt={alt}
            width={size}
            height={size}
            className="svg-icon bg-white"
          />
        </a>
      </div>
    </div>
  );
};

export default ItemButton;
