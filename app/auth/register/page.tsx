"use client";

import Link from "next/link";
import Image from "next/image";
import RegisterForm from "../../(auth)/(_components)/registerform";

import { ArrowLeft, Lock, ChevronRight } from "lucide-react";
import AuthHeroPanel from "@/app/(auth)/(_components)/auth-hero-panel";

export default function RegisterPage() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* ── Left Branding Panel ── */}
      <AuthHeroPanel variant="register" />

      {/* ── Right Form Panel ── */}
      <div
        className="flex items-center justify-center bg-white"
        style={{ flex: 1, minWidth: 0, padding: "2rem" }}
      >
        <div style={{ width: "100%", maxWidth: "28rem" }}>
          {/* Back link */}
          <Link
            href="/landingpage"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary-600 transition mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Mobile logo */}
          <div className="lg:hidden mb-8 flex items-center gap-3">
            <Image
              src="/logo1.png"
              alt="TAPTO"
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <span className="text-2xl font-bold text-primary-600">TAPTO</span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-2 text-xs font-semibold text-primary-700 border border-primary-100 mb-4">
              <Lock className="w-3 h-3" />
              Secure Registration
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Create Account
            </h2>
            <p className="text-gray-600">
              Sign up to start your shopping journey
            </p>
          </div>

          {/* Register Form */}
          <RegisterForm />

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">
                Already have an account?
              </span>
            </div>
          </div>

          {/* Sign-in CTA */}
          <Link
            href="/auth/login"
            className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-gray-200 px-4 py-3 font-semibold text-gray-700 hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50 transition-all"
          >
            Sign in
            <ChevronRight className="w-4 h-4" />
          </Link>

          <p className="mt-6 text-center text-xs text-gray-500">
            Protected by 256-bit SSL encryption
          </p>
        </div>
      </div>
    </div>
  );
}
