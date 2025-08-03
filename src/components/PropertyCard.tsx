import Image from "next/image";
import Link from "next/link";

// Define the PortableTextBlock type
type PortableTextBlock = {
  _type: string;
  _key: string;
  children: Array<{
    _type: string;
    _key: string;
    text: string;
    marks: string[];
  }>;
  markDefs: any[];
  style: string;
};

// Define the Property type
export type Property = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  location: string;
  address?: string;
  price: number;
  imageUrl?: string;
  mainImage?: string;
  images?: string[];
  description?: PortableTextBlock[];
  bedrooms?: number;
  bathrooms?: number;
  sqFeet?: number;
  propertySize?: number;
  features?: string[];
  categories?: string[];
};

// Property Card Component
export function PropertyCard({ property }: { property: Property }) {
  // Default description if none is provided
  const defaultDescription =
    "Beautiful property with modern amenities, located in a prime neighborhood with easy access to schools, parks, and shopping centers. Features updated kitchen and bathrooms.";

  // Extract text from Portable Text blocks
  const extractTextFromBlocks = (
    blocks: PortableTextBlock[] | undefined
  ): string => {
    if (!blocks || !Array.isArray(blocks)) return defaultDescription;

    return blocks
      .map((block) => {
        if (block._type !== "block" || !block.children) return "";
        return block.children.map((child) => child.text || "").join("");
      })
      .join(" ");
  };

  // Get description text
  const descriptionText = extractTextFromBlocks(property.description);

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full border border-gray-100 group">
      {/* Image Container with Hover Effect */}
      <div className="relative h-56 w-full overflow-hidden">
        {property.imageUrl ? (
          <>
            <Image
              src={property.imageUrl}
              alt={property.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {property.categories?.includes("buy") && (
              <div className="absolute top-3 left-3 z-10">
                <span className="bg-green-600 text-white text-xs font-medium px-2.5 py-1 rounded-md">
                  For Sale
                </span>
              </div>
            )}
          </>
        ) : (
          <div className="bg-gray-100 h-full w-full flex items-center justify-center">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Price */}
        <div className="mb-3">
          <p className="text-xl font-bold text-gray-800">
            ${property.price.toLocaleString()}
          </p>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
          {property.title}
        </h3>

        {/* Description with View More */}
        <div className="mb-3">
          <div className="relative">
            <p className={`text-sm text-gray-600 line-clamp-3 mb-1`}>
              {descriptionText}
            </p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center mb-4">
          <svg
            className="h-4 w-4 text-green-600 mr-1.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="text-gray-600 text-sm">{property.location}</span>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-2 py-3 border-t border-gray-100 mt-auto">
          {property.bedrooms && (
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center justify-center mb-1">
                <svg
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <span className="text-xs font-medium text-gray-500">
                {property.bedrooms} Beds
              </span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center justify-center mb-1">
                <svg
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span className="text-xs font-medium text-gray-500">
                {property.bathrooms} Baths
              </span>
            </div>
          )}
          {property.sqFeet && (
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center justify-center mb-1">
                <svg
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                  />
                </svg>
              </div>
              <span className="text-xs font-medium text-gray-500">
                {property.sqFeet} Sq Ft
              </span>
            </div>
          )}
        </div>

        {/* View Details Button */}
        <div className="mt-4">
          <Link
            href={`/property/${property.slug.current}`}
            className="block w-full text-center bg-green-600 hover:bg-green-700 text-white py-2.5 px-4 rounded-md font-medium transition-colors duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
