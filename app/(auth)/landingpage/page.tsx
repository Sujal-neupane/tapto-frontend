"use client";

import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Image
                src="/logo1.png"
                alt="TAPTO Logo"
                width={50}
                height={50}
                className="h-12 w-12"
              />
              <div>
                <div className="text-2xl font-bold text-gray-900">TAPTO</div>
                <div className="text-xs text-gray-600">Swipe. Shop. Smile.</div>
              </div>
            </div>

            {/* Nav Actions */}
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-blue-600 transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold shadow hover:bg-blue-700 transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: CTA */}
            <div className="space-y-6">
              <div>
                <Image
                src="/logo1.png"
                alt="logo"
                width={40}
                height={40}
                className="h-10 w-10 hidden"
              />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                TAPTO
              </h1>
              <p className="text-xl text-gray-600">
                Swipe. Shop. Smile.
              </p>
              
              <div className="flex gap-4">
                <Link
                  href="/register"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-600/30"
                >
                  Get Started
                </Link>
                <Link
                  href="/login"
                  className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition"
                >
                  Login
                </Link>
              </div>
            </div>

            {/* Right: Product Card with real image */}
            <div className="relative mx-auto max-w-md w-full">
              <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-200">
                <div className="relative h-[440px] rounded-2xl overflow-hidden bg-gray-100">
                  <img
                    src="https://lilacinfotech.com/lilac_assets/images/blog/How-to-Create-a-Shopping-App-for-Your-Business:Features-Cost-and-More.jpg"
                    alt="Sale items"
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />


                  {/* Floating heart */}
                  <button className="absolute bottom-4 right-4 bg-white text-blue-600 shadow-lg rounded-full p-3 hover:shadow-xl transition">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Easy Shopping */}
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition border border-gray-200">
              <div className="mb-4">
                <svg className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Easy Shopping</h3>
              <p className="text-gray-600 text-sm">Browse and shop with just a tap. Simple, fast, and intuitive.</p>
            </div>

            {/* Save Favorites */}
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition border border-gray-200">
              <div className="mb-4">
                <svg className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Save Favorites</h3>
              <p className="text-gray-600 text-sm">Keep track of items you love and never miss a deal.</p>
            </div>

            {/* Personal Profile */}
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition border border-gray-200">
              <div className="mb-4">
                <svg className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Personal Profile</h3>
              <p className="text-gray-600 text-sm">Manage your orders and preferences in one place.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>© 2025 TAPTO. All rights reserved.</span>
            </div>
            <nav className="flex gap-6 text-sm text-gray-600">
              <a href="#" className="hover:text-blue-600 transition">Privacy Policy</a>
              <a href="#" className="hover:text-blue-600 transition">Terms of Service</a>
              <a href="#" className="hover:text-blue-600 transition">Contact Us</a>
            </nav>
          </div>
        </div>
      </footer>
    </main>
  );
}