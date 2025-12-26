"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LoginForm from "../(_components)/loginform";

export default function LoginPage() {
  const [isVisible] = useState(true);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 text-white">
      <div className="flex min-h-screen">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-blue-900">
            {/* Animated Background Elements */}
            <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-white/10 blur-3xl animate-pulse-slow"></div>
            <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-white/10 blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }}></div>
          </div>
          
          <div className={`relative z-10 flex flex-col justify-center px-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"}`}>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center text-3xl font-bold text-blue-600">
                  T
                </div>
                <span className="text-3xl font-bold tracking-tight">TAPTO</span>
              </div>
              <h1 className="text-4xl font-bold mb-4">Welcome to a Better Shopping Experience</h1>
              <p className="text-xl text-blue-100">Swipe. Shop. Style.</p>
            </div>

            {/* Decorative Product Card */}
            <div className="animate-float max-w-sm">
              <div className="rounded-3xl bg-white/10 backdrop-blur-md p-6 border border-white/20">
                <div className="relative mb-4 h-48 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl animate-pulse-slow">👔</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold">Discover Your Style</h3>
                  <p className="text-sm text-blue-100">Browse curated collections tailored for you</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex w-full lg:w-1/2 items-center justify-center p-6 lg:p-12">
          <div className={`w-full max-w-md transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="rounded-3xl bg-white p-8 lg:p-10 shadow-2xl">
              {/* Mobile Logo */}
              <div className="lg:hidden mb-8 text-center">
                <div className="inline-flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-2xl font-bold text-white">
                    T
                  </div>
                  <span className="text-2xl font-bold tracking-tight text-gray-900">TAPTO</span>
                </div>
                <p className="text-sm text-gray-600">Welcome Back</p>
              </div>

              {/* Desktop Header */}
              <div className="hidden lg:block mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                <p className="text-gray-600">Sign in to continue shopping</p>
              </div>

              <LoginForm />

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="font-semibold text-blue-600 hover:text-blue-700 transition"
                  >
                    Sign up for free
                  </Link>
                </p>
              </div>
            </div>

            {/* Back to Home Link */}
            <div className="mt-6 text-center">
              <Link
                href="/landingpage"
                className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition"
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
