"use client";

import Link from "next/link";
import Image from "next/image";
import LoginForm from "../(_components)/loginform";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 text-white">
          {/* background accents */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,white,transparent_35%),radial-gradient(circle_at_80%_10%,white,transparent_35%),radial-gradient(circle_at_50%_80%,white,transparent_35%)]" />
          <div className="relative z-10 flex flex-col justify-center px-12 py-10">
            <div className="flex items-center gap-3 mb-8">
              <Image
                src="/logo1.png"
                alt="TAPTO"
                width={52}
                height={52}
                className="h-12 w-12 bg-white rounded-xl p-2 shadow-md"
              />
              <div>
                <div className="text-3xl font-bold">TAPTO</div>
                <div className="text-sm text-blue-100">Swipe. Shop. Smile.</div>
              </div>
            </div>

            <div className="space-y-4 max-w-xl">
              <h1 className="text-4xl font-bold leading-tight">Welcome back, trendsetter.</h1>
              <p className="text-lg text-blue-100">Sign in and keep your cart, favorites, and orders in sync.</p>
              <div className="flex items-center gap-3 text-sm text-blue-100">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">💳</span>
                <span>Quick checkout with your saved cards.</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-blue-100">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">💡</span>
                <span>Smart picks based on your recent likes.</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-blue-100">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">🎯</span>
                <span>Keep your streaks to unlock surprise drops.</span>
              </div>
            </div>

            {/* Illustration */}
            <div className="relative mt-8 h-64 w-full max-w-md self-end">
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80"
                alt="Person shopping"
                className="absolute inset-0 h-full w-full object-cover rounded-2xl shadow-2xl border border-white/20"
                loading="lazy"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-blue-900/60 to-transparent" />
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex w-full lg:w-1/2 items-center justify-center p-6">
          <div className="w-full max-w-md">
            <div className="rounded-2xl bg-white p-8 shadow-lg border border-gray-200">
              {/* Mobile Logo */}
              <div className="lg:hidden mb-6 text-center">
                <div className="inline-flex items-center gap-3 mb-2">
                  <Image
                    src="/logo1.png"
                    alt="TAPTO"
                    width={40}
                    height={40}
                    className="h-10 w-10"
                  />
                  <span className="text-2xl font-bold text-gray-900">TAPTO</span>
                </div>
              </div>

              {/* Header */}
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 mb-3">Secure Login</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Sign In</h2>
                <p className="text-gray-600">Welcome back to TAPTO</p>
              </div>

              <LoginForm />

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Create account
                  </Link>
                </p>
              </div>

            </div>

            {/* Back to Home Link */}
            <div className="mt-4 text-center">
              <Link
                href="/landingpage"
                className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
