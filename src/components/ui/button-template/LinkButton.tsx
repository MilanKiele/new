/*
File: LinkButton.tsx
Description: Reusable styled button components.
*/

import Link from "next/link";

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const LinkButton = ({
  href,
  children,
  className = "text-sky-600 hover:text-sky-800",
}: LinkButtonProps) => (
  <Link href={href} className={`font-bold ${className}`}>
    {children}
  </Link>
);
