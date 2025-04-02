/*
File: GithubButton.tsx
Description: GithubButton component.
*/

"use client";

import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { GithubLink } from "@/constants";

export default function GithubButton() {
  return (
    <Link
      href={GithubLink}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center text-yellow-200 hover:text-yellow-600 rounded transition"
    >
      <FaGithub className="text-sm mr-2" />
      GitHub
    </Link>
  );
}
