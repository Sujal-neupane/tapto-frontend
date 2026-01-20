"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, Loader2, Sparkles } from "lucide-react";
import { loginSchema, type LoginFormData } from "..//..//../lib/validations/auth";
import { handleLogin } from "../../../lib/actions/auth-action";

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const emailValue = watch("email");
  const passwordValue = watch("password");

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setServerError(null);
    
    try {
      const result = await handleLogin(data);
      
      if (result.success) {
        // Redirect to dashboard after successful login
        router.push(result.redirect || "/dashboard");
        router.refresh();
      } else {
        setServerError(result.message || "Login failed");
      }
    } catch (error: any) {
      setServerError(error.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
      {/* Server Error Message */}
      {serverError && (
        <div className="rounded-lg bg-red-50 border-2 border-red-200 p-4 text-sm text-red-700 animate-in slide-in-from-top">
          <p className="font-semibold">Login Failed</p>
          <p className="text-red-600">{serverError}</p>
        </div>
      )}

      {/* Email Field */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="flex items-center gap-2 text-sm font-semibold text-gray-700"
        >
          <Mail className="w-4 h-4 text-blue-600" />
          Email address
        </label>
        <div className="relative group">
          <input
            id="email"
            type="email"
            {...register("email")}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
            className={`w-full rounded-xl border-2 ${
              errors.email 
                ? 'border-red-300 focus:border-red-500' 
                : emailFocused || emailValue
                ? 'border-blue-500'
                : 'border-gray-200'
            } px-4 py-3 pl-12 text-gray-900 placeholder-gray-400 transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/10 bg-white`}
            placeholder="you@example.com"
          />
          <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all ${
            emailFocused || emailValue ? 'text-blue-600 scale-110' : 'text-gray-400'
          }`}>
            <Mail className="w-5 h-5" />
          </div>
          {emailValue && !errors.email && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-green-600" />
              </div>
            </div>
          )}
        </div>
        {errors.email && (
          <p className="flex items-center gap-1 text-sm text-red-500 animate-in slide-in-from-left">
            <span className="text-red-500">⚠</span> {errors.email.message}
          </p>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="flex items-center gap-2 text-sm font-semibold text-gray-700"
        >
          <Lock className="w-4 h-4 text-blue-600" />
          Password
        </label>
        <div className="relative group">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            className={`w-full rounded-xl border-2 ${
              errors.password 
                ? 'border-red-300 focus:border-red-500' 
                : passwordFocused || passwordValue
                ? 'border-blue-500'
                : 'border-gray-200'
            } px-4 py-3 pl-12 pr-12 text-gray-900 placeholder-gray-400 transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/10 bg-white`}
            placeholder="Enter your password"
          />
          <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all ${
            passwordFocused || passwordValue ? 'text-blue-600 scale-110' : 'text-gray-400'
          }`}>
            <Lock className="w-5 h-5" />
          </div>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-all hover:scale-110"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="flex items-center gap-1 text-sm text-red-500 animate-in slide-in-from-left">
            <span className="text-red-500">⚠</span> {errors.password.message}
          </p>
        )}
      </div>

      {/* Remember & Forgot */}
      <div className="flex items-center justify-between text-sm">
        <label className="group flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="peer w-5 h-5 rounded-md border-2 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer transition-all checked:bg-blue-600 checked:border-blue-600"
          />
          <span className="text-gray-600 group-hover:text-gray-900 transition">Remember me</span>
        </label>
        <a href="/forgotpassword" className="group font-semibold text-blue-600 hover:text-blue-700 transition flex items-center gap-1">
          <span>Forgot Password?</span>
          <Lock className="w-3 h-3 group-hover:rotate-12 transition-transform" />
        </a>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="group relative w-full rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 px-4 py-3.5 font-bold text-white transition-all hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 hover:-translate-y-0.5 disabled:hover:translate-y-0 overflow-hidden"
      >
        {!isLoading && (
          <span className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
        )}
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            Signing you in...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            Sign In
            <Sparkles className="w-4 h-4 group-hover:scale-125 transition-transform" />
          </span>
        )}
      </button>

      {/* Google Sign In */}
      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-4 text-gray-500 font-medium">Or continue with</span>
        </div>
      </div>

      <button
        type="button"
        className="group w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 font-semibold text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50 hover:shadow-md hover:-translate-y-0.5"
      >
        <span className="flex items-center justify-center gap-3">
          <svg className="h-5 w-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span className="group-hover:text-gray-900 transition">Continue with Google</span>
        </span>
      </button>
    </form>
  );
}
  
