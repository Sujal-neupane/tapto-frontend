"use client";

import Link from "next/link";
import Image from "next/image";
import LoginForm from "../../(auth)/(_components)/loginform";
import { 
  CreditCard, 
  Sparkles, 
  Heart,
  ArrowLeft,
  Zap,
  Lock,
  ChevronRight
} from "lucide-react";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="flex min-h-screen relative z-10">
        {/* Left Side - Branding with creative elements */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-linear-to-br from-blue-600 via-indigo-600 to-purple-700 text-white">
          {/* Animated grid pattern */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
          
          {/* Floating shapes */}
          <div className="absolute top-20 left-20 w-24 h-24 border-4 border-white/20 rounded-3xl rotate-12 animate-pulse"></div>
          <div className="absolute bottom-40 right-20 w-32 h-32 bg-white/10 rounded-full backdrop-blur-sm animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-40 w-16 h-16 border-4 border-yellow-300/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>

          <div className="relative z-10 flex flex-col justify-between px-12 py-10 w-full">
            {/* Logo */}
            <div>
              <Link href="/landingpage" className="group flex items-center gap-3 mb-12 w-fit hover:scale-105 transition-transform">
                <div className="relative">
                  <div className="absolute inset-0 bg-white rounded-xl blur-md opacity-50 group-hover:opacity-75 transition"></div>
                  <Image
                    src="/logo1.png"
                    alt="TAPTO"
                    width={52}
                    height={52}
                    className="relative h-12 w-12 bg-white rounded-xl p-2 shadow-lg"
                  />
                </div>
                <div>
                  <div className="text-3xl font-bold">TAPTO</div>
                  <div className="text-sm text-blue-100">Swipe. Shop. Smile.</div>
                </div>
              </Link>

              {/* Main Content */}
              <div className="space-y-6 max-w-xl">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md px-4 py-2 text-sm font-semibold border border-white/30">
                    <Sparkles className="w-4 h-4" />
                    Welcome Back
                  </div>
                  <h1 className="text-5xl font-bold leading-tight">
                    Your shopping <span className="text-yellow-300">journey</span> continues here.
                  </h1>
                  <p className="text-lg text-blue-100 leading-relaxed">
                    Sign in to access your personalized shopping experience with exclusive perks.
                  </p>
                </div>

                {/* Feature cards */}
                <div className="grid gap-4 mt-8">
                  <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:bg-white/15 transition-all hover:scale-[1.02]">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 w-12 h-12 rounded-xl bg-linear-to-br from-emerald-400 to-green-500 flex items-center justify-center shadow-lg">
                        <CreditCard className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-white mb-1">Quick Checkout</h3>
                        <p className="text-sm text-blue-100">Lightning-fast checkout with saved payment methods.</p>
                      </div>
                    </div>
                  </div>

                  <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:bg-white/15 transition-all hover:scale-[1.02]">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 w-12 h-12 rounded-xl bg-linear-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-lg">
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-white mb-1">Synced Favorites</h3>
                        <p className="text-sm text-blue-100">Access your wishlist from any device, anytime.</p>
                      </div>
                    </div>
                  </div>

                  <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:bg-white/15 transition-all hover:scale-[1.02]">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 w-12 h-12 rounded-xl bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-white mb-1">Exclusive Deals</h3>
                        <p className="text-sm text-blue-100">Get member-only access to flash sales and drops.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom decorative elements */}
            <div className="flex items-center gap-8 mt-auto">
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">50K+</div>
                <div className="text-xs text-blue-100">Happy Shoppers</div>
              </div>
              <div className="h-12 w-px bg-white/20"></div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">10K+</div>
                <div className="text-xs text-blue-100">Daily Orders</div>
              </div>
              <div className="h-12 w-px bg-white/20"></div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">4.9★</div>
                <div className="text-xs text-blue-100">User Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form with creative design */}
        <div className="flex w-full lg:w-1/2 items-center justify-center p-6">
          <div className="w-full max-w-md">
            {/* Back to Home - Mobile/Desktop */}
            <div className="mb-6">
              <Link
                href="/landingpage"
                className="group inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-all"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
            </div>

            {/* Main Form Card */}
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-linear-to-br from-yellow-400 to-orange-500 rounded-full blur-2xl opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-linear-to-br from-blue-400 to-indigo-500 rounded-full blur-2xl opacity-20"></div>

              <div className="relative rounded-3xl bg-white p-8 shadow-2xl border border-gray-100 backdrop-blur-sm">
                {/* Mobile Logo */}
                <div className="lg:hidden mb-8 text-center">
                  <div className="inline-flex items-center gap-3">
                    <Image
                      src="/logo1.png"
                      alt="TAPTO"
                      width={40}
                      height={40}
                      className="h-10 w-10"
                    />
                    <span className="text-2xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">TAPTO</span>
                  </div>
                </div>

                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-blue-50 to-indigo-50 px-4 py-2 text-xs font-semibold text-blue-700 border border-blue-100">
                      <Lock className="w-3 h-3" />
                      Secure Login
                    </div>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
                  <p className="text-gray-600">Sign in to continue your shopping journey</p>
                </div>

                <LoginForm />

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">New to TAPTO?</span>
                  </div>
                </div>

                {/* Sign Up Link */}
                <Link
                  href="/auth/register"
                  className="group w-full flex items-center justify-center gap-2 rounded-xl border-2 border-gray-200 px-4 py-3 font-semibold text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all"
                >
                  Create an account
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Bottom info */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Protected by 256-bit SSL encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
