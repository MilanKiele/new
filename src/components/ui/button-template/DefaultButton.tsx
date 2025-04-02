/*
File: Button.tsx
Description: Reusable styled button components.
*/

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const Button = ({
  children,
  onClick,
  disabled,
  className = "bg-sky-600 hover:bg-sky-700",
}: ButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 ${className} text-white font-bold rounded disabled:opacity-50`}
  >
    {children}
  </button>
);
