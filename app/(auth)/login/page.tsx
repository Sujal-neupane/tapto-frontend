"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LoginForm from "../(_components)/loginform";

export default function LoginPage() {
  const [isVisible] = useState(true);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-emerald-600 relative overflow-hidden">
          <div className="relative z-10 flex flex-col justify-center px-12 text-white">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <Image
                  src="/logo1.png"
                  alt="TAPTO"
                  width={48}
                  height={48}
                  className="h-12 w-12 bg-white rounded-xl p-2"
                />
                <span className="text-3xl font-bold">TAPTO</span>
              </div>
              <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
              <p className="text-xl text-emerald-50">Sign in to continue shopping</p>
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
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Sign In</h2>
                <p className="text-gray-600">Welcome back to TAPTO</p>
              </div>

              <LoginForm />

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="font-semibold text-emerald-600 hover:text-emerald-700"
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
