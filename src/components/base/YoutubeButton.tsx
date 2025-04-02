/*
File: YoutubeButton.tsx
Description: YoutubeButton component.
*/

"use client";

import { YoutubeLink } from "@/constants";
import { FaYoutube } from "react-icons/fa";
import Link from "next/link";

export default function YouTubeButton() {
  return (
    <Link
      href={YoutubeLink}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center text-red-200 hover:text-red-600 rounded transition"
    >
      <FaYoutube className="text-sm mr-2" />
      YouTube
    </Link>
  );
}
