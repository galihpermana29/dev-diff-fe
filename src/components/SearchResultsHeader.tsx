"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSearch } from "@/context/SearchContext";

interface SearchResultsHeaderProps {
  searchKeyword: string;
  resultsCount: number;
}

export function SearchResultsHeader({ searchKeyword, resultsCount }: SearchResultsHeaderProps) {
  const router = useRouter();
  const { clearSearch } = useSearch();

  const handleClearSearch = () => {
    clearSearch(); // Clear the search query in context
    router.push("/property");
  };

  return (
    <div className="mb-6 flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          Search Results for "{searchKeyword}"
        </h2>
        <p className="text-gray-500">
          Found {resultsCount} {resultsCount === 1 ? "property" : "properties"}
        </p>
      </div>
      <button
        onClick={handleClearSearch}
        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md transition-colors flex items-center"
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        Clear Search
      </button>
    </div>
  );
}
