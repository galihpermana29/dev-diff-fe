import Link from "next/link";
import { Logo, SearchBar } from "./";

export function Header() {
  return (
    <header className="border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Logo />
          <div className="hidden md:block flex-1 mx-8">
            <SearchBar />
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-600 font-medium hover:text-green-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-green-600 transition-colors"
            >
              About us
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-green-600 transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/property"
              className="text-gray-600 hover:text-green-600 transition-colors"
            >
              Properties
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
