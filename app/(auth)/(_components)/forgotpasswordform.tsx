"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Mail,
	Sparkles,
	Loader2,
	CheckCircle2,
	Timer,
	ShieldCheck,
	RefreshCw,
} from "lucide-react";
import {
	forgotPasswordSchema,
	type ForgotPasswordFormData,
} from "../../../lib/validations";

export default function ForgotPasswordForm() {
	const [isLoading, setIsLoading] = useState(false);
	const [sent, setSent] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ForgotPasswordFormData>({
		resolver: zodResolver(forgotPasswordSchema),
	});

	const [emailValue, setEmailValue] = useState("");

	const onSubmit = async (data: ForgotPasswordFormData) => {
		setIsLoading(true);
		await new Promise((resolve) => setTimeout(resolve, 1200));
		console.log("Forgot password:", data);
		setSent(true);
		setIsLoading(false);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			<div className="flex items-center justify-between">
				<div className="space-y-1">
					<div className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-blue-50 to-indigo-50 px-4 py-1.5 text-xs font-semibold text-blue-700 border border-blue-100">
						<ShieldCheck className="w-4 h-4" />
						Reset access
					</div>
					<div className="text-2xl font-bold text-gray-900">Forgot your password?</div>
					<p className="text-sm text-gray-600">We will send a secure reset link to your inbox.</p>
				</div>
				<div className="hidden sm:flex items-center gap-2 text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded-full px-3 py-1">
					<Timer className="w-4 h-4 text-amber-500" />
					<span>90s average recovery</span>
				</div>
			</div>

			<div className="space-y-2">
				<label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
					<Mail className="w-4 h-4 text-blue-600" />
					Account email
				</label>
				<div className="relative group">
					<input
						id="email"
						type="email"
						{...register("email", { onChange: (e) => setEmailValue(e.target.value) })}
						className={`w-full rounded-xl border-2 px-4 py-3 pl-12 text-gray-900 placeholder-gray-400 transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/10 bg-white ${
							errors.email ? "border-red-300 focus:border-red-500" : emailValue ? "border-blue-500" : "border-gray-200"
						}`}
						placeholder="you@example.com"
					/>
					<div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all ${
						emailValue ? "text-blue-600 scale-110" : "text-gray-400"
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
					<p className="flex items-center gap-1 text-sm text-red-500">
						<span>⚠</span>
						{errors.email.message}
					</p>
				)}
			</div>

			<div className="space-y-3 rounded-2xl border border-gray-100 bg-gradient-to-br from-blue-50/70 via-white to-indigo-50/70 p-4">
				<div className="flex items-center gap-3">
					<div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg">
						{sent ? <CheckCircle2 className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
					</div>
					<div className="space-y-0.5">
						<div className="font-semibold text-gray-900">{sent ? "Link sent" : "One quick step"}</div>
						<div className="text-sm text-gray-600">
							{sent ? "Check your inbox for the reset link." : "Enter your email and we will deliver a magic reset link."}
						</div>
					</div>
				</div>
				<div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
					{["Enter email", "Check inbox", "Tap the link"].map((label, idx) => (
						<div
							key={label}
							className={`rounded-lg border px-3 py-2 flex items-center gap-2 ${
								sent || idx === 0 ? "border-blue-200 bg-white" : "border-gray-200 bg-gray-50"
							}`}
						>
							<span className={`h-6 w-6 flex items-center justify-center rounded-full text-xs font-semibold ${
								idx === 0 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
							}`}>
								{idx + 1}
							</span>
							<span>{label}</span>
						</div>
					))}
				</div>
			</div>

			<button
				type="submit"
				disabled={isLoading}
				className="group relative w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3.5 font-bold text-white transition-all hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-60 shadow-lg shadow-blue-600/25 hover:shadow-xl hover:-translate-y-0.5 overflow-hidden"
			>
				{!isLoading && (
					<span className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
				)}
				<span className="flex items-center justify-center gap-2">
					{isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : sent ? <RefreshCw className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
					{isLoading ? "Sending secure link..." : sent ? "Resend link" : "Send reset link"}
				</span>
			</button>

			<div className="text-xs text-center text-gray-500">
				This action is protected by encryption. If you do not see the email, check spam or request again.
			</div>
		</form>
	);
}
