"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  Heart, 
  ShoppingBag, 
  Zap, 
  Bell, 
  Shield, 
  TrendingUp, 
  Sparkles,
  Star,
  Clock,
  Users,
  ChevronRight,
  Check,
  Package,
  Smartphone
} from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
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
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">TAPTO</div>
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
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center gap-2"
              >
                Get Started <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-20 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: CTA */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 text-sm font-semibold text-blue-700 border border-blue-100">
                <Sparkles className="w-4 h-4" /> Daily drops live now
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
                Swipe. Save. <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Smile.</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-xl leading-relaxed">
                Tap through curated looks, heart your favorites, and unlock member-only perks every day. Shopping has never been this addictive.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/register"
                  className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-2xl shadow-blue-600/40 hover:shadow-3xl hover:-translate-y-0.5 flex items-center gap-2 relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                  <span className="relative">Start for free</span>
                  <ChevronRight className="w-5 h-5 relative group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/login"
                  className="group border-2 border-gray-300 text-gray-700 px-10 py-4 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center gap-2"
                >
                  Login
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-6">
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-100 group hover:shadow-md transition-all">
                  <div className="flex items-center gap-2 text-emerald-700 mb-1">
                    <Check className="w-4 h-4" />
                    <span className="font-bold text-sm">Free Shipping</span>
                  </div>
                  <p className="text-xs text-emerald-600">On orders over $50</p>
                </div>
                <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-4 border border-violet-100 group hover:shadow-md transition-all">
                  <div className="flex items-center gap-2 text-violet-700 mb-1">
                    <Shield className="w-4 h-4" />
                    <span className="font-bold text-sm">Secure</span>
                  </div>
                  <p className="text-xs text-violet-600">256-bit encryption</p>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-100 group hover:shadow-md transition-all">
                  <div className="flex items-center gap-2 text-amber-700 mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="font-bold text-sm">24/7 Support</span>
                  </div>
                  <p className="text-xs text-amber-600">Always here to help</p>
                </div>
                <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-4 border border-rose-100 group hover:shadow-md transition-all">
                  <div className="flex items-center gap-2 text-rose-700 mb-1">
                    <Heart className="w-4 h-4" />
                    <span className="font-bold text-sm">Easy Returns</span>
                  </div>
                  <p className="text-xs text-rose-600">30-day guarantee</p>
                </div>
              </div>
            </div>

            {/* Right: Product Card with real image */}
            <div className="relative mx-auto max-w-md w-full">
              {/* Floating badges */}
              <div className="absolute -top-4 -left-4 z-20 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl px-4 py-3 shadow-xl flex items-center gap-2 animate-bounce">
                <Zap className="w-5 h-5 fill-white" />
                <span className="font-bold text-sm">50% OFF</span>
              </div>
              
              {/* Additional floating element */}
              <div className="absolute -top-2 -right-2 z-20">
                <div className="relative">
                  <div className="absolute inset-0 bg-yellow-400 rounded-full blur-md opacity-75 animate-pulse"></div>
                  <div className="relative bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-xl">
                    <div className="text-center">
                      <div className="text-xs font-bold">NEW</div>
                      <div className="text-[10px] -mt-0.5">2025</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-200 relative overflow-hidden">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 pointer-events-none"></div>
                
                <div className="relative h-120 rounded-2xl overflow-hidden bg-gray-100 shadow-inner">
                  <img
                    src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1100&q=80"
                    alt="Sale items"
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />

                  {/* Product info overlay */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-1">Summer Collection</h3>
                        <p className="text-sm text-gray-600">Limited time offer</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-2xl font-bold text-blue-600">$49</span>
                          <span className="text-sm text-gray-400 line-through">$99</span>
                        </div>
                      </div>
                      <button className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg rounded-xl p-3 hover:shadow-xl transition-all hover:scale-105">
                        <Heart className="w-6 h-6" />
                      </button>
                    </div>
                  </div>

                  {/* Quick actions */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <button className="bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-md hover:shadow-lg transition-all">
                      <ShoppingBag className="w-5 h-5 text-gray-700" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating stats */}
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl px-6 py-4 shadow-xl flex items-center gap-3">
                <TrendingUp className="w-6 h-6" />
                <div>
                  <div className="text-xs opacity-90">Trending</div>
                  <div className="font-bold text-lg">Top 10%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-blue-100 text-sm">Happy Shoppers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-blue-100 text-sm">Daily Orders</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">99%</div>
              <div className="text-blue-100 text-sm">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100 text-sm">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-24 bg-white">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              <Sparkles className="w-4 h-4" /> Features
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Built to keep you hooked</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Experience shopping like never before with our cutting-edge features</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="group bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 hover:shadow-2xl transition-all border border-blue-100 relative overflow-hidden hover:-translate-y-1">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-blue-200 opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">One-swipe carts</h3>
              <p className="text-gray-600 leading-relaxed">Add, remove, and reorder in a tap. Lightning-fast checkout with zero friction. Shopping should be effortless.</p>
            </div>

            <div className="group bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-8 hover:shadow-2xl transition-all border border-pink-100 relative overflow-hidden hover:-translate-y-1">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-pink-200 opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-lg">
                <Heart className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Heart it, get it</h3>
              <p className="text-gray-600 leading-relaxed">Favorites auto-sync across all devices. Never lose track of items you love. Your wishlist, always within reach.</p>
            </div>

            <div className="group bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 hover:shadow-2xl transition-all border border-indigo-100 relative overflow-hidden hover:-translate-y-1">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-indigo-200 opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg">
                <Bell className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Drop alerts</h3>
              <p className="text-gray-600 leading-relaxed">Real-time notifications when your style drops. Be first in line for exclusive deals. Zero FOMO, guaranteed.</p>
            </div>

            <div className="group bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 hover:shadow-2xl transition-all border border-green-100 relative overflow-hidden hover:-translate-y-1">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-green-200 opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg">
                <Shield className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Secure payments</h3>
              <p className="text-gray-600 leading-relaxed">Bank-level encryption protects every transaction. Shop with confidence knowing your data is safe and secure.</p>
            </div>

            <div className="group bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 hover:shadow-2xl transition-all border border-orange-100 relative overflow-hidden hover:-translate-y-1">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-orange-200 opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-lg">
                <Package className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Fast delivery</h3>
              <p className="text-gray-600 leading-relaxed">Same-day delivery available in major cities. Track your order in real-time from warehouse to doorstep.</p>
            </div>

            <div className="group bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-8 hover:shadow-2xl transition-all border border-violet-100 relative overflow-hidden hover:-translate-y-1">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-violet-200 opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg">
                <Smartphone className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Mobile first</h3>
              <p className="text-gray-600 leading-relaxed">Designed for your phone. Smooth swipes, instant loads, and intuitive gestures make shopping addictive.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-24 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjA1IiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-30"></div>
        
        <div className="mx-auto max-w-4xl text-center relative z-10">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Ready to revolutionize your shopping?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join thousands of shoppers who've already discovered the future of online shopping. Start your journey today.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link
                href="/register"
                className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-2xl hover:shadow-3xl hover:-translate-y-0.5 flex items-center gap-2 text-lg"
              >
                Get Started Free <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                href="/login"
                className="border-2 border-white/30 text-white px-10 py-4 rounded-xl font-bold hover:bg-white/10 transition-all flex items-center gap-2 text-lg backdrop-blur-sm"
              >
                Sign In
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-8 pt-8 text-white/90">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/logo1.png"
                  alt="TAPTO Logo"
                  width={40}
                  height={40}
                  className="h-10 w-10"
                />
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">TAPTO</div>
              </div>
              <p className="text-gray-600 mb-4 max-w-md">
                The future of online shopping. Swipe, save, and smile with every purchase.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-blue-100 transition">
                  <Users className="w-5 h-5 text-gray-600" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-blue-100 transition">
                  <Heart className="w-5 h-5 text-gray-600" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-blue-100 transition">
                  <Star className="w-5 h-5 text-gray-600" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Company</h4>
              <nav className="flex flex-col gap-2 text-gray-600">
                <a href="#" className="hover:text-blue-600 transition">About Us</a>
                <a href="#" className="hover:text-blue-600 transition">Careers</a>
                <a href="#" className="hover:text-blue-600 transition">Press</a>
                <a href="#" className="hover:text-blue-600 transition">Blog</a>
              </nav>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Support</h4>
              <nav className="flex flex-col gap-2 text-gray-600">
                <a href="#" className="hover:text-blue-600 transition">Help Center</a>
                <a href="#" className="hover:text-blue-600 transition">Contact Us</a>
                <a href="#" className="hover:text-blue-600 transition">Privacy Policy</a>
                <a href="#" className="hover:text-blue-600 transition">Terms of Service</a>
              </nav>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
            <div>© 2025 TAPTO. All rights reserved.</div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Secured by industry-leading encryption</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

