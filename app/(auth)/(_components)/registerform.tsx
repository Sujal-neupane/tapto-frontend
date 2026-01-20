"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Sparkles,
  CheckCircle2,
  Shirt,
  Heart,
  ArrowLeft,
  ArrowRight,
  Loader2
} from "lucide-react";

const registerSchema = z
  .object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    shoppingPreference: z.enum(["men", "women"], {
      message: "Please select your shopping preference",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [step, setStep] = useState(0);
  const {
    register,
    handleSubmit,
    trigger,
    watch,
    getValues,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const preference = watch("shoppingPreference");

  const goNext = async () => {
    if (step === 0) {
      const ok = await trigger(["fullName", "email", "password", "confirmPassword"]);
      if (ok) setStep(1);
      return;
    }
    if (step === 1) {
      const ok = await trigger(["shoppingPreference"]);
      if (ok) setStep(2);
      return;
    }
  };

  const goBack = () => setStep((s) => Math.max(0, s - 1));

  const onSubmit = async (data: RegisterFormData) => {
    if (step < 2) return;
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Register data:", data);
    router.push("/dashboard");
    setIsLoading(false);
  };

  const steps = [
    { title: "Account", desc: "Basic info" },
    { title: "Style", desc: "Pick your vibe" },
    { title: "Finish", desc: "Review & join" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            Step {step + 1} of 3
          </div>
          <div className="text-lg font-semibold text-gray-900">{steps[step].title}</div>
          <div className="text-sm text-gray-500">{steps[step].desc}</div>
        </div>
        <div className="flex items-center gap-2">
          {steps.map((_, i) => (
            <span
              key={i}
              className={`h-2 w-10 rounded-full transition-all ${i <= step ? "bg-blue-600" : "bg-gray-200"}`}
            />
          ))}
        </div>
      </div>

      {step === 0 && (
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="fullName" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <User className="w-4 h-4 text-blue-600" /> Full Name
            </label>
            <div className="relative">
              <input
                id="fullName"
                type="text"
                {...register("fullName")}
                className={`w-full rounded-xl border-2 px-4 py-3 pl-12 text-gray-900 placeholder-gray-400 transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/10 ${
                  errors.fullName ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-blue-500"
                }`}
                placeholder="Alex Carter"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <User className="w-5 h-5" />
              </div>
            </div>
            {errors.fullName && <p className="flex items-center gap-1 text-sm text-red-500"><span>⚠</span>{errors.fullName.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Mail className="w-4 h-4 text-blue-600" /> Email address
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                {...register("email")}
                className={`w-full rounded-xl border-2 px-4 py-3 pl-12 text-gray-900 placeholder-gray-400 transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/10 ${
                  errors.email ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-blue-500"
                }`}
                placeholder="you@example.com"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Mail className="w-5 h-5" />
              </div>
            </div>
            {errors.email && <p className="flex items-center gap-1 text-sm text-red-500"><span>⚠</span>{errors.email.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="password" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Lock className="w-4 h-4 text-blue-600" /> Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={`w-full rounded-xl border-2 px-4 py-3 pl-12 pr-12 text-gray-900 placeholder-gray-400 transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/10 ${
                    errors.password ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-blue-500"
                  }`}
                  placeholder="••••••••"
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock className="w-5 h-5" />
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="flex items-center gap-1 text-sm text-red-500"><span>⚠</span>{errors.password.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Lock className="w-4 h-4 text-blue-600" /> Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  {...register("confirmPassword")}
                  className={`w-full rounded-xl border-2 px-4 py-3 pl-12 pr-12 text-gray-900 placeholder-gray-400 transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/10 ${
                    errors.confirmPassword ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-blue-500"
                  }`}
                  placeholder="••••••••"
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock className="w-5 h-5" />
                </div>
                <button
                  type="button"
                  onClick={() => setShowConfirm((s) => !s)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="flex items-center gap-1 text-sm text-red-500"><span>⚠</span>{errors.confirmPassword.message}</p>}
            </div>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 bg-blue-50 rounded-xl p-3 text-blue-800">
            <Sparkles className="w-5 h-5" />
            <div>
              <div className="font-semibold">Pick your shopping vibe</div>
              <div className="text-sm text-blue-700">We’ll tune recommendations to your style.</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { key: "men", icon: <Shirt className="w-6 h-6" />, title: "Men", desc: "Suits, sneakers, street" },
              { key: "women", icon: <Heart className="w-6 h-6" />, title: "Women", desc: "Dresses, tops, chic" },
            ].map((item) => (
              <label
                key={item.key}
                className={`group relative cursor-pointer overflow-hidden rounded-xl border-2 transition-all ${
                  preference === item.key ? "border-blue-600 bg-blue-50" : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <input type="radio" value={item.key} {...register("shoppingPreference")!} className="sr-only" />
                <div className="p-4 text-center space-y-2">
                  <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-xl ${
                    preference === item.key
                      ? "bg-linear-to-br from-blue-500 to-indigo-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}>{item.icon}</div>
                  <div className="font-semibold text-gray-900">{item.title}</div>
                  <div className="text-xs text-gray-500">{item.desc}</div>
                </div>
                {preference === item.key && (
                  <div className="absolute right-2 top-2 h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                )}
              </label>
            ))}
          </div>
          {errors.shoppingPreference && <p className="text-sm text-red-500">{errors.shoppingPreference.message}</p>}
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 bg-green-50 rounded-xl p-3 text-green-800">
            <CheckCircle2 className="w-5 h-5" />
            <div>
              <div className="font-semibold">Ready to roll</div>
              <div className="text-sm text-green-700">Quick review before we create your account.</div>
            </div>
          </div>

          <div className="space-y-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Name</span>
              <span className="font-semibold text-gray-900">{getValues("fullName") || "Your name"}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Email</span>
              <span className="font-semibold text-gray-900">{getValues("email") || "you@example.com"}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Preference</span>
              <span className="font-semibold text-gray-900">
                {preference === "men" && "Men"}
                {preference === "women" && "Women"}
                {!preference && "Not set"}
              </span>
            </div>
          </div>

          <label className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4">
            <input
              id="terms"
              type="checkbox"
              required
              className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">
              I agree to the <a href="#" className="font-semibold text-blue-600 hover:text-blue-700">Terms</a> and {""}
              <a href="#" className="font-semibold text-blue-600 hover:text-blue-700">Privacy Policy</a>.
            </span>
          </label>
        </div>
      )}

      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 0}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {step < 2 ? (
          <button
            type="button"
            onClick={goNext}
            className="group inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:from-blue-700 hover:to-indigo-700 shadow-md"
          >
            Next
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={isLoading}
            className="group inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:from-blue-700 hover:to-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed shadow-md"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                Create Account
                <Sparkles className="h-4 w-4 group-hover:scale-125 transition-transform" />
              </>
            )}
          </button>
        )}
      </div>
    </form>
  );
}
