import { Property, Header, Footer, SearchResultsHeader } from "@/components";
import { client } from "@/sanity/client";
import HomepageListedClient from "@/view/HomepageListedClient";

// Fetch all published property items with optional search keyword
async function getProperties(searchKeyword?: string): Promise<Property[]> {
  let query = `*[_type == "property" && isPublished == true`;

  // Add search condition if keyword is provided
  if (searchKeyword) {
    query += ` && (title match "*${searchKeyword}*" || location match "*${searchKeyword}*")`;
  }

  query += `] {
    _id,
    title,
    slug,
    location,
    price,
    "imageUrl": image.asset->url,
    description,
    bedrooms,
    bathrooms,
    sqFeet,
    categories
  }`;

  return await client.fetch(query);
}

export default async function PropertyPage({
  searchParams,
}: {
  searchParams?: Promise<{ keyword?: string }>;
}) {
  // Get the search keyword from URL query parameters
  // Convert searchParams to string to avoid Next.js warning about sync dynamic APIs
  const searchKeyword = (await searchParams)?.keyword
    ? String((await searchParams).keyword)
    : "";

  // Fetch properties with optional search keyword
  const properties = await getProperties(searchKeyword);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Header />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {searchKeyword && (
          <SearchResultsHeader
            searchKeyword={searchKeyword}
            resultsCount={properties.length}
          />
        )}

        <HomepageListedClient properties={properties} />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
