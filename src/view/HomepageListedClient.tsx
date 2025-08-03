"use client";

import { useState, useEffect } from "react";
import { CategoryButton, PropertyCard, type Property } from "../components";

interface HomepageListedClientProps {
  properties: Property[];
}

// Define available categories with title and value mapping to match Sanity schema
const CATEGORIES = [
  { title: "All", value: "" },
  { title: "Buy", value: "buy" },
  { title: "Rent", value: "rent" },
  { title: "Vacation Rentals", value: "vacation-rentals" },
  { title: "Luxury", value: "luxury" },
  { title: "Commercial", value: "commercial" },
];

const HomepageListedClient = ({ properties }: HomepageListedClientProps) => {
  // State for active category filter (store the value, not the title)
  const [activeCategory, setActiveCategory] = useState<string>(""); // Empty string for 'All' category
  // State for filtered properties
  const [filteredProperties, setFilteredProperties] =
    useState<Property[]>(properties);

  // Filter properties when active category changes
  useEffect(() => {
    if (activeCategory === "") {
      // If no category is selected, show all properties
      setFilteredProperties(properties);
    } else {
      // Filter properties by the selected category
      const filtered = properties.filter(
        (property) =>
          property.categories && property.categories.includes(activeCategory)
      );
      setFilteredProperties(filtered.length > 0 ? filtered : []);
    }
  }, [activeCategory, properties]);

  // Handle category button click
  const handleCategoryClick = (categoryValue: string) => {
    setActiveCategory(categoryValue === activeCategory ? "" : categoryValue);
  };

  return (
    <main className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-500">
        Find your Home
      </h2>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {CATEGORIES.map((category) => (
          <CategoryButton
            key={category.value}
            text={category.title}
            isActive={category.value === activeCategory}
            onClick={() => handleCategoryClick(category.value)}
          />
        ))}
      </div>

      {/* Properties Grid */}
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-400 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No properties found
            </h3>
            <p className="text-gray-600">
              {activeCategory
                ? `No properties found in the "${
                    CATEGORIES.find((cat) => cat.value === activeCategory)
                      ?.title || activeCategory
                  }" category. Try selecting a different category.`
                : "There are currently no properties available. Please check back later or contact us for more information."}
            </p>
          </div>
        </div>
      )}
    </main>
  );
};

export default HomepageListedClient;
