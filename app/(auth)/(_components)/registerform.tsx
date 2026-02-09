"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
  Loader2,
  Phone,
} from "lucide-react";
import { RegisterFormData, registerSchema } from "../../../lib/validations/auth";
import { handleRegister } from "../../../lib/actions/auth-action";
import { useAuth } from "@/lib/context/auth-context";

export default function RegisterForm() {
  const router = useRouter();
  const { setUser, setToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [step, setStep] = useState(0);
  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const preference = watch("shoppingPreference");

  const goNext = async () => {
    if (step === 0) {
      const ok = await trigger(["fullName", "email", "password", "confirmPassword"]);
      if (ok) setStep(1);
      return;
    }
    if (step === 1) {
      const ok = await trigger(["countryCode", "phoneNumber"]);
      if (ok) setStep(2);
      return;
    }
  };

  const goBack = () => setStep((s) => Math.max(0, s - 1));

  const onSubmit = async (data: RegisterFormData) => {
    if (step < 2) return;
    setIsLoading(true);
    setServerError(null);
    
    try {
      // Combine country code and phone number
      const fullPhoneNumber = `${data.countryCode}${data.phoneNumber}`;
      
      const result = await handleRegister({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        phoneNumber: fullPhoneNumber,
        shoppingPreference: data.shoppingPreference,
      });
      
      if (result.success) {
        // Update auth context immediately so UI reflects login state
        if (result.data) setUser(result.data);
        if (result.token) setToken(result.token);

        router.push(result.redirect || "/dashboard");
        router.refresh();
      } else {
        setServerError(result.message || "Registration failed");
      }
    } catch (error: any) {
      setServerError(error.message || "An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { title: "Account", desc: "Basic info" },
    { title: "Contact", desc: "Phone number" },
    { title: "Style", desc: "Shopping preference" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      {/* Server Error Message */}
      {serverError && (
        <div className="rounded-lg bg-red-50 border-2 border-red-200 p-4 text-sm text-red-700 animate-in slide-in-from-top">
          <p className="font-semibold">Registration Failed</p>
          <p className="text-red-600">{serverError}</p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
            Step {step + 1} of 3
          </div>
          <div className="text-lg font-semibold text-gray-900">{steps[step].title}</div>
          <div className="text-sm text-gray-500">{steps[step].desc}</div>
        </div>
        <div className="flex items-center gap-2">
          {steps.map((_, i) => (
            <span
              key={i}
              className={`h-2 w-10 rounded-full transition-all ${i <= step ? "bg-primary-600" : "bg-gray-200"}`}
            />
          ))}
        </div>
      </div>

      {step === 0 && (
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="fullName" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <User className="w-4 h-4 text-primary-600" /> Full Name
            </label>
            <div className="relative">
              <input
                id="fullName"
                type="text"
                {...register("fullName")}
                className={`w-full rounded-xl border-2 px-4 py-3 pl-12 text-gray-900 placeholder-gray-400 transition-all focus:outline-none focus:ring-4 focus:ring-primary-500/10 ${
                  errors.fullName ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-primary-500"
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
              <Mail className="w-4 h-4 text-primary-600" /> Email address
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                {...register("email")}
                className={`w-full rounded-xl border-2 px-4 py-3 pl-12 text-gray-900 placeholder-gray-400 transition-all focus:outline-none focus:ring-4 focus:ring-primary-500/10 ${
                  errors.email ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-primary-500"
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
                <Lock className="w-4 h-4 text-primary-600" /> Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={`w-full rounded-xl border-2 px-4 py-3 pl-12 pr-12 text-gray-900 placeholder-gray-400 transition-all focus:outline-none focus:ring-4 focus:ring-primary-500/10 ${
                    errors.password ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-primary-500"
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
                <Lock className="w-4 h-4 text-primary-600" /> Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  {...register("confirmPassword")}
                  className={`w-full rounded-xl border-2 px-4 py-3 pl-12 pr-12 text-gray-900 placeholder-gray-400 transition-all focus:outline-none focus:ring-4 focus:ring-primary-500/10 ${
                    errors.confirmPassword ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-primary-500"
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
          <div className="flex items-center gap-3 bg-primary-50 rounded-xl p-3 text-primary-800">
            <Phone className="w-5 h-5" />
            <div>
              <div className="font-semibold">Add your phone number</div>
              <div className="text-sm text-primary-700">We'll use this for account security and updates.</div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="countryCode" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Phone className="w-4 h-4 text-primary-600" /> Country Code
            </label>
            <select
              id="countryCode"
              {...register("countryCode")}
              className={`w-full rounded-xl border-2 px-4 py-3 text-gray-900 transition-all focus:outline-none focus:ring-4 focus:ring-primary-500/10 ${
                errors.countryCode ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-primary-500"
              }`}
            >
              <option value="">Select country code</option>
              <option value="+1">🇺🇸 United States (+1)</option>
              <option value="+44">🇬🇧 United Kingdom (+44)</option>
              <option value="+91">🇮🇳 India (+91)</option>
              <option value="+977">🇳🇵 Nepal (+977)</option>
              <option value="+86">🇨🇳 China (+86)</option>
              <option value="+81">🇯🇵 Japan (+81)</option>
              <option value="+82">🇰🇷 South Korea (+82)</option>
              <option value="+61">🇦🇺 Australia (+61)</option>
              <option value="+49">🇩🇪 Germany (+49)</option>
              <option value="+33">🇫🇷 France (+33)</option>
            </select>
            {errors.countryCode && <p className="flex items-center gap-1 text-sm text-red-500"><span>⚠</span>{errors.countryCode.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="phoneNumber" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Phone className="w-4 h-4 text-primary-600" /> Phone Number
            </label>
            <div className="relative">
              <input
                id="phoneNumber"
                type="tel"
                {...register("phoneNumber")}
                className={`w-full rounded-xl border-2 px-4 py-3 pl-12 text-gray-900 placeholder-gray-400 transition-all focus:outline-none focus:ring-4 focus:ring-primary-500/10 ${
                  errors.phoneNumber ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-primary-500"
                }`}
                placeholder="1234567890"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Phone className="w-5 h-5" />
              </div>
            </div>
            {errors.phoneNumber && <p className="flex items-center gap-1 text-sm text-red-500"><span>⚠</span>{errors.phoneNumber.message}</p>}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 bg-purple-50 rounded-xl p-3 text-purple-800">
            <Sparkles className="w-5 h-5" />
            <div>
              <div className="font-semibold">Choose your fashion preference</div>
              <div className="text-sm text-purple-700">Help us personalize your shopping experience.</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { key: "Mens Fashion", icon: <Shirt className="w-6 h-6" />, title: "Men's Fashion", desc: "Suits, casual wear, accessories" },
              { key: "Womens Fashion", icon: <Heart className="w-6 h-6" />, title: "Women's Fashion", desc: "Dresses, tops, accessories" },
            ].map((item) => (
              <label
                key={item.key}
                className={`group relative cursor-pointer overflow-hidden rounded-xl border-2 transition-all ${
                  preference === item.key ? "border-purple-600 bg-purple-50" : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <input type="radio" value={item.key} {...register("shoppingPreference")!} className="sr-only" />
                <div className="p-4 text-center space-y-2">
                  <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-xl ${
                    preference === item.key
                      ? "bg-linear-to-br from-purple-500 to-pink-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}>{item.icon}</div>
                  <div className="font-semibold text-gray-900">{item.title}</div>
                  <div className="text-xs text-gray-500">{item.desc}</div>
                </div>
                {preference === item.key && (
                  <div className="absolute right-2 top-2 h-6 w-6 rounded-full bg-purple-600 flex items-center justify-center text-white">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                )}
              </label>
            ))}
          </div>
          {errors.shoppingPreference && <p className="text-sm text-red-500">{errors.shoppingPreference.message}</p>}
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
            className="group inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-700 shadow-md"
          >
            Next
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={isLoading}
            className="group inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-purple-600 to-pink-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:from-purple-700 hover:to-pink-700 disabled:opacity-60 disabled:cursor-not-allowed shadow-md"
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
