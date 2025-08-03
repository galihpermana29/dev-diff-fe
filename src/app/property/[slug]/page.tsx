import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { client } from "../../../sanity/client";
import { Header, Footer, type Property } from "../../../components";

async function getProperty(slug: string): Promise<Property | null> {
  const query = `*[_type == "property" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    price,
    bedrooms,
    bathrooms,
    propertySize,
    address,
    description,
    categories,
  "imageUrl": image.asset->url,
    features
  }`;

  const property = await client.fetch(query, { slug });
  return property;
}

export default async function PropertyDetail({
  params,
}: {
  params: { slug: string };
}) {
  const property = await getProperty(params.slug);

  if (!property) {
    notFound();
  }

  console.log(property, "? property");

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {property.title}
          </h1>
          <p className="text-gray-600">{property.address}</p>
        </div>

        {/* Main Image */}
        <div className="relative w-full h-[500px] rounded-lg overflow-hidden mb-8">
          {property.imageUrl && (
            <Image
              src={property.imageUrl}
              alt={property.title}
              fill
              className="object-cover"
              priority
            />
          )}
          {property.categories?.includes("buy") && (
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-green-600 text-white text-sm font-medium px-3 py-1.5 rounded-md">
                For Sale
              </span>
            </div>
          )}
          {property.categories?.includes("rent") && (
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-blue-600 text-white text-sm font-medium px-3 py-1.5 rounded-md">
                For Rent
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-500">
                Property Details
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex flex-col">
                  <span className="text-gray-500 text-sm">Price</span>
                  <span className="font-semibold text-lg text-black">
                    ${property.price?.toLocaleString()}
                  </span>
                </div>
                {/* <div className="flex flex-col">
                  <span className="text-gray-500 text-sm">Bedrooms</span>
                  <span className="font-semibold text-lg">
                    {property.bedrooms}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500 text-sm">Bathrooms</span>
                  <span className="font-semibold text-lg">
                    {property.bathrooms}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500 text-sm">Size</span>
                  <span className="font-semibold text-lg">
                    {property.propertySize} sq ft
                  </span>
                </div> */}
              </div>

              <span className="text-gray-500 text-sm">Description</span>
              <div className="prose max-w-none text-gray-700">
                {property.description && (
                  <PortableText value={property.description} />
                )}
              </div>
            </div>

            {/* Features */}
            {property.features && property.features.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4">Features</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {property.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Gallery */}
            {property.images && property.images.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.images.map((image: string, index: number) => (
                    <div
                      key={index}
                      className="relative h-64 rounded-lg overflow-hidden"
                    >
                      <Image
                        src={image}
                        alt={`${property.title} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6 sticky top-6">
              <h3 className="text-xl font-semibold mb-4">Contact Agent</h3>
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    defaultValue={`I'm interested in ${property.title}`}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
