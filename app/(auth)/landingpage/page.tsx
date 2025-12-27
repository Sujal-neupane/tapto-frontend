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
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                ✨ Daily drops live now
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Swipe. Save. Smile.
              </h1>
              <p className="text-lg text-gray-600 max-w-xl">
                Tap through curated looks, heart your favorites, and unlock member-only perks every day.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/register"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-600/30"
                >
                  Start for free
                </Link>
                <Link
                  href="/login"
                  className="border-2 border-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-gray-300 hover:bg-gray-50 transition"
                >
                  Login
                </Link>
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm border border-gray-200 text-sm text-gray-700">
                  <span className="text-green-500">●</span> 3.2k shoppers online
                </div>
              </div>
            </div>

            {/* Right: Product Card with real image */}
            <div className="relative mx-auto max-w-md w-full">
              <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-200">
                <div className="relative h-[440px] rounded-2xl overflow-hidden bg-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1100&q=80"
                    alt="Sale items"
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/50" />

                  <div className="absolute top-4 left-4 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-blue-700 shadow">
                    ⚡ Flash Sale · 50% off
                  </div>


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
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-3xl font-bold text-gray-900">Built to keep you hooked</h2>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-blue-700 font-semibold">🔥 Streak-safe checkout</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-green-700 font-semibold">⚡ Fast delivery</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition border border-gray-200 relative overflow-hidden">
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-blue-100 opacity-50" />
              <div className="relative mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700 text-2xl">🛍️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">One-swipe carts</h3>
              <p className="text-gray-600 text-sm">Add, remove, and reorder in a tap. No clutter, just vibes.</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition border border-gray-200 relative overflow-hidden">
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-pink-100 opacity-50" />
              <div className="relative mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-pink-100 text-pink-700 text-2xl">💖</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Heart it, get it</h3>
              <p className="text-gray-600 text-sm">Favorites auto-sync to your phone so you never lose a crush.</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition border border-gray-200 relative overflow-hidden">
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-indigo-100 opacity-50" />
              <div className="relative mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 text-2xl">🔔</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Drop alerts</h3>
              <p className="text-gray-600 text-sm">Real-time pings when your size or style drops. Zero FOMO.</p>
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