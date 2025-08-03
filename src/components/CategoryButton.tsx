import React from "react";

interface CategoryButtonProps {
  text: string;
  isActive?: boolean;
  onClick?: () => void;
}

export function CategoryButton({
  text,
  isActive = false,
  onClick,
}: CategoryButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
        isActive ? "bg-green-600 text-white" : "text-gray-600 hover:bg-gray-50"
      }`}
    >
      {text}
    </button>
  );
}
