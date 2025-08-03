import Image from "next/image";
import { client } from "../sanity/client";
import { type Property, Header, Footer } from "../components";
import HomepageListedClient from "../view/HomepageListedClient";

// Fetch all published property items
async function getAllProperties(): Promise<Property[]> {
  return await client.fetch(`
    *[_type == "property" && isPublished == true] {
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
    }
  `);
}

export default async function Home() {
  const properties = await getAllProperties();
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Header />

      {/* Hero Section */}
      <section className="relative bg-green-900 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-8 items-center">
          <div className="z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Perfect Home — Easily & Affordably
            </h1>
            <p className="text-gray-200 mb-8">
              Browse verified listings, explore top neighborhoods, and connect
              with trusted agents — all in one seamless experience.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium transition-colors">
                Explore Listings
              </button>
              <button className="bg-white text-green-800 px-6 py-3 rounded-md font-medium transition-colors hover:bg-gray-100">
                List your property
              </button>
            </div>
          </div>
          <div className="relative h-64 md:h-auto">
            <Image
              src="https://res.cloudinary.com/dqipjpy1w/image/upload/v1754213015/Grange-258Q-Harmony-Lodge-Facade-2-1190x680_honrzy.jpg"
              alt="Beautiful modern home"
              width={600}
              height={400}
              className="rounded-lg shadow-xl object-cover h-full w-full"
              priority
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <HomepageListedClient properties={properties} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
