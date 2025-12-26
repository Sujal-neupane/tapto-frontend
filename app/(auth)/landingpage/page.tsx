"use client";

import { useState } from "react";
import Link from "next/link";

export default function LandingPage() {
  const [isVisible] = useState(true);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 text-white overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-white/10 blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-white/10 blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }}></div>
      </div>

      {/* Logo Header */}
      <header className="relative z-10 px-4 py-6 md:py-8">
        <div className={`mx-auto max-w-6xl transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-2xl font-bold text-blue-600">
              T
            </div>
            <span className="text-2xl font-bold tracking-tight">TAPTO</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-4 py-12 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left: Content */}
            <div className={`space-y-8 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"}`}>
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
                  Welcome to a Better Shopping Experience
                </h1>
                <p className="text-xl md:text-2xl text-blue-100 font-medium">
                  Swipe. Shop. Style.
                </p>
                <p className="text-lg text-blue-50/90 max-w-lg">
                  Discover your perfect style with our swipe-based shopping experience. 
                  Browse curated fashion collections tailored just for you.
                </p>
              </div>

              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-blue-600 shadow-xl transition-all hover:scale-105 hover:shadow-2xl active:scale-95"
              >
                Get Started
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>

              <p className="text-blue-100">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold underline hover:text-white transition">
                  Sign in
                </Link>
              </p>
            </div>

            {/* Right: Product Card Demo */}
            <div className={`relative transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"}`}>
              <div className="relative mx-auto max-w-sm">
                {/* Floating Card with Animation */}
                <div className="animate-float">
                  <div className="relative rounded-3xl bg-white p-6 shadow-2xl">
                    {/* Product Image Area */}
                    <div className="relative mb-4 h-80 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center space-y-2">
                          <div className="text-6xl animate-pulse-slow">👔</div>
                          <div className="text-2xl font-bold text-gray-800">SALE</div>
                          <div className="text-4xl font-black text-red-600">50% OFF</div>
                        </div>
                      </div>
                      {/* Phone Frame mockup */}
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 text-xs font-semibold text-gray-700">
                        New Arrival
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-gray-900">Smart Watch</h3>
                      <p className="text-sm text-gray-600">
                        Premium quality with modern design
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-blue-600">$299.99</span>
                        <button className="rounded-full bg-blue-600 p-3 text-white shadow-lg transition-all hover:scale-110 active:scale-95">
                          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-white/20 blur-2xl"></div>
                <div className="absolute -top-4 -left-4 h-32 w-32 rounded-full bg-white/20 blur-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-4 py-16 bg-white/10 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl">
          <div className={`mb-12 text-center transition-all duration-700 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Why Choose TAPTO?</h2>
            <p className="text-blue-100 text-lg">Everything you need for the perfect shopping experience</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <FeatureCard
              icon="🛍️"
              title="Easy Shopping"
              desc="Swipe through personalized collections. Like what you see? Add it to cart instantly."
              delay="delay-[800ms]"
              isVisible={isVisible}
            />
            <FeatureCard
              icon="🔔"
              title="Notifications"
              desc="Get notified about new arrivals, exclusive deals, and items back in stock."
              delay="delay-[900ms]"
              isVisible={isVisible}
            />
            <FeatureCard
              icon="👤"
              title="Best Profile"
              desc="Your personalized shopping profile learns your style and preferences over time."
              delay="delay-[1000ms]"
              isVisible={isVisible}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-4 py-16">
        <div className={`mx-auto max-w-3xl text-center transition-all duration-700 delay-[1100ms] ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Shopping?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of happy shoppers discovering their style every day
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-blue-600 shadow-xl transition-all hover:scale-105 hover:shadow-2xl active:scale-95"
          >
            Start Shopping Now
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/20 px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
            <div className="flex items-center gap-2 text-blue-100">
              <div className="h-6 w-6 rounded bg-white/20 flex items-center justify-center text-sm font-bold">
                T
              </div>
              <span>© 2025 TAPTO. All rights reserved.</span>
            </div>
            <nav className="flex items-center gap-6 text-blue-100">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms</a>
              <a href="#" className="hover:text-white transition">Contact</a>
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
    <div className={`rounded-2xl bg-white/10 backdrop-blur-md p-6 border border-white/20 transition-all duration-700 hover:bg-white/20 hover:scale-105 ${delay} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
      <div className="mb-4 text-5xl">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-blue-100 leading-relaxed">{desc}</p>
    </div>
  );
}
