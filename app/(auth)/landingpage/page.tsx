"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  const [isVisible] = useState(true);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Logo Header */}
      <header className="relative z-10 px-4 py-6 border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/logo1.png"
                alt="TAPTO"
                width={40}
                height={40}
                className="h-10 w-10"
              />
              <div>
                <div className="text-2xl font-black tracking-tight">TAPTO</div>
                <div className="text-xs text-slate-400 font-medium">SWIPE. SHOP. CONQUER.</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="rounded-lg px-5 py-2.5 text-sm font-semibold text-slate-300 transition-all hover:text-white hover:bg-slate-800"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-900/50 transition-all hover:bg-emerald-500 hover:shadow-xl"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-4 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            {/* Left: Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-2">
                  <svg className="h-4 w-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-semibold text-emerald-400">PREMIUM FASHION MARKETPLACE</span>
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none">
                  SHOP LIKE A
                  <span className="block bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    CHAMPION
                  </span>
                </h1>

                <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
                  Swipe through elite collections. Find gear that matches your style. 
                  <span className="text-white font-semibold"> Build your wardrobe, your way.</span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/register"
                  className="group inline-flex items-center justify-center gap-3 rounded-xl bg-emerald-600 px-8 py-4 text-base font-bold text-white shadow-2xl shadow-emerald-900/50 transition-all hover:bg-emerald-500 hover:scale-105"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  START NOW
                  <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <button className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-700 px-8 py-4 text-base font-bold transition-all hover:border-slate-600 hover:bg-slate-800">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  WATCH DEMO
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800">
                <div>
                  <div className="text-3xl font-black text-emerald-400">50K+</div>
                  <div className="text-sm text-slate-500 font-medium">Active Users</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-emerald-400">100K+</div>
                  <div className="text-sm text-slate-500 font-medium">Products</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-emerald-400">4.9★</div>
                  <div className="text-sm text-slate-500 font-medium">Rating</div>
                </div>
              </div>
            </div>

            {/* Right: Interactive Product Card */}
            <div className="relative">
              <div className="relative mx-auto max-w-sm">
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-3xl blur-2xl"></div>
                
                <div className="relative rounded-2xl bg-slate-800 border border-slate-700 p-6 shadow-2xl">
                  {/* Top bar with icons */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                    <button className="rounded-full bg-slate-700 p-2 transition hover:bg-emerald-600 hover:scale-110">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </button>
                  </div>

                  {/* Product showcase */}
                  <div className="relative mb-5 h-72 overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="text-8xl filter drop-shadow-2xl">💎</div>
                        <div className="space-y-2">
                          <div className="text-sm font-bold text-emerald-400 uppercase tracking-wider">Premium Collection</div>
                          <div className="text-4xl font-black">
                            <span className="text-white">UP TO </span>
                            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">70% OFF</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Badge */}
                    <div className="absolute top-4 left-4 rounded-full bg-red-600 px-4 py-1.5 text-xs font-black text-white shadow-lg">
                      🔥 HOT DEAL
                    </div>
                  </div>

                  {/* Product info */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-bold">Limited Edition</div>
                      <div className="text-2xl font-black text-emerald-400">$299.99</div>
                    </div>
                    <button className="group rounded-full bg-emerald-600 p-4 shadow-lg shadow-emerald-900/50 transition-all hover:bg-emerald-500 hover:scale-110">
                      <svg className="h-6 w-6 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 bg-slate-900/50 backdrop-blur-sm border-y border-slate-800">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-3">
              BUILT FOR <span className="text-emerald-400">CHAMPIONS</span>
            </h2>
            <p className="text-slate-400">Everything you need to dominate the fashion game</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div
              onMouseEnter={() => setHoveredFeature(0)}
              onMouseLeave={() => setHoveredFeature(null)}
              className={`group rounded-xl bg-slate-800 border-2 p-6 transition-all cursor-pointer ${
                hoveredFeature === 0 ? 'border-emerald-500 shadow-xl shadow-emerald-900/50 scale-105' : 'border-slate-700'
              }`}
            >
              <div className="mb-4">
                <svg className={`h-12 w-12 transition-all ${hoveredFeature === 0 ? 'text-emerald-400 scale-110' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-black mb-2">LIGHTNING FAST</h3>
              <p className="text-sm text-slate-400">Swipe, tap, done. Shopping at the speed of thought.</p>
            </div>

            <div
              onMouseEnter={() => setHoveredFeature(1)}
              onMouseLeave={() => setHoveredFeature(null)}
              className={`group rounded-xl bg-slate-800 border-2 p-6 transition-all cursor-pointer ${
                hoveredFeature === 1 ? 'border-emerald-500 shadow-xl shadow-emerald-900/50 scale-105' : 'border-slate-700'
              }`}
            >
              <div className="mb-4">
                <svg className={`h-12 w-12 transition-all ${hoveredFeature === 1 ? 'text-emerald-400 scale-110' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-black mb-2">SECURE CHECKOUT</h3>
              <p className="text-sm text-slate-400">Military-grade encryption. Your data is locked down.</p>
            </div>

            <div
              onMouseEnter={() => setHoveredFeature(2)}
              onMouseLeave={() => setHoveredFeature(null)}
              className={`group rounded-xl bg-slate-800 border-2 p-6 transition-all cursor-pointer ${
                hoveredFeature === 2 ? 'border-emerald-500 shadow-xl shadow-emerald-900/50 scale-105' : 'border-slate-700'
              }`}
            >
              <div className="mb-4">
                <svg className={`h-12 w-12 transition-all ${hoveredFeature === 2 ? 'text-emerald-400 scale-110' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-black mb-2">ELITE PICKS</h3>
              <p className="text-sm text-slate-400">Curated collections that match your winning style.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 bg-gradient-to-r from-emerald-600 to-teal-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
        <div className="relative mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-2">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-bold">LIMITED TIME OFFER</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            READY TO LEVEL UP?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join the elite. Start shopping smarter today.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-3 rounded-xl bg-slate-900 px-10 py-5 text-lg font-black text-white shadow-2xl transition-all hover:scale-105 hover:shadow-slate-900/50"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            GET STARTED NOW
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/50 px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Image
                src="/logo1.png"
                alt="TAPTO"
                width={20}
                height={20}
                className="h-5 w-5"
              />
              <span>© 2025 TAPTO</span>
            </div>
            <nav className="flex gap-6 text-sm text-slate-500">
              <a href="#" className="hover:text-emerald-400 transition">Privacy</a>
              <a href="#" className="hover:text-emerald-400 transition">Terms</a>
              <a href="#" className="hover:text-emerald-400 transition">Contact</a>
            </nav>
          </div>
        </div>
      </footer>
    </main>
  );
}
interface FeatureCardProps {
  icon: string;
  title: string;
  desc: string;
  delay: string;
  isVisible: boolean;
}

function FeatureCard({ icon, title, desc, delay, isVisible }: FeatureCardProps) {
  return (
    <div className={`rounded-2xl bg-white p-8 border border-gray-200 shadow-sm transition-all duration-700 hover:shadow-md ${delay} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
      <div className="mb-4 text-4xl">{icon}</div>
      <h3 className="text-lg font-bold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}