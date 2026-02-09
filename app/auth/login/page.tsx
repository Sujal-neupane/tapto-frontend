"use client";

import Link from "next/link";
import Image from "next/image";
import LoginForm from "../../(auth)/(_components)/loginform";
import { ArrowLeft, Lock, ChevronRight } from "lucide-react";
import AuthHeroPanel from "@/app/(auth)/(_components)/auth-hero-panel";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-white">
      {/* ── Left Branding Panel ── */}
      <AuthHeroPanel variant="login" />

      {/* ── Right Form Panel ── */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8 bg-white">
        <div className="w-full max-w-[420px] space-y-8 animate-fadeIn">

          {/* Back link */}
          <Link
            href="/landingpage"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-primary-600 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          {/* Mobile logo (Visible only on small screens) */}
          <div className="lg:hidden flex items-center gap-3">
            <Image
              src="/logo1.png"
              alt="TAPTO"
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <span className="text-2xl font-bold font-heading text-gray-900">TAPTO</span>
          </div>

          {/* Header */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-xs font-bold text-primary-700 border border-primary-100 mb-6 uppercase tracking-wider">
              <Lock className="w-3 h-3" />
              Secure Login
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 tracking-tight">
              Welcome Back!
            </h2>
            <p className="mt-2 text-gray-600 text-lg">
              Sign in to continue your shopping journey.
            </p>
          </div>

          {/* Login Form */}
          <LoginForm />

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100" />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
              <span className="bg-white px-2 text-gray-400">
                New to Tapto?
              </span>
            </div>
          </div>

          {/* Sign-up CTA */}
          <Link
            href="/auth/register"
            className="group w-full flex items-center justify-center gap-2 rounded-xl border-2 border-gray-100 px-4 py-3.5 font-bold text-gray-700 hover:border-primary-600 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200"
          >
            Create an account
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
          </Link>

          <p className="text-center text-xs text-gray-400 pt-4 flex items-center justify-center gap-1.5">
            <Lock className="w-3 h-3" />
            Protected by 256-bit SSL encryption
          </p>
        </div>
      </div>
    </div>
  );
}
