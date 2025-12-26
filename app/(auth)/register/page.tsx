"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import RegisterForm from "../(_components)/registerform";

export default function RegisterPage() {
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
              <p className="text-xl text-blue-100 mb-6">Swipe. Shop. Style.</p>
              <p className="text-blue-100">
                Join thousands of happy shoppers discovering their perfect style every day. 
                Create your account and start your fashion journey today!
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="space-y-4 max-w-md">
              <div className="flex items-start gap-3 animate-fadeInUp">
                <div className="rounded-full bg-white/20 p-2 mt-1">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Personalized Shopping</h3>
                  <p className="text-sm text-blue-100">Get recommendations based on your style</p>
                </div>
              </div>
              <div className="flex items-start gap-3 animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
                <div className="rounded-full bg-white/20 p-2 mt-1">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Exclusive Deals</h3>
                  <p className="text-sm text-blue-100">Access member-only discounts</p>
                </div>
              </div>
              <div className="flex items-start gap-3 animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
                <div className="rounded-full bg-white/20 p-2 mt-1">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Fast & Secure</h3>
                  <p className="text-sm text-blue-100">Shop with confidence</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Register Form */}
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
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Create Account</h2>
                <p className="text-gray-600">Start your shopping journey</p>
              </div>

              <RegisterForm />

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-semibold text-emerald-600 hover:text-emerald-700"
                  >
                    Sign in
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
