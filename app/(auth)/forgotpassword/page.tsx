"use client";

import Link from "next/link";
import Image from "next/image";
import ForgotPasswordForm from "../(_components)/forgotpasswordform";
import {
	ArrowLeft,
	Sparkles,
	Shield,
	HeartPulse,
	BellRing,
	ShieldCheck,
	Zap,
} from "lucide-react";

export default function ForgotPasswordPage() {
	return (
		<main className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-16 -left-24 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
				<div className="absolute bottom-10 -right-24 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1.5s" }}></div>
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: "3s" }}></div>
			</div>

			<div className="flex min-h-screen relative z-10">
				{/* Left Side - Storytelling */}
				<div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-linear-to-br from-blue-600 via-indigo-600 to-purple-700 text-white">
					<div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
					<div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,white,transparent_35%),radial-gradient(circle_at_80%_10%,white,transparent_35%),radial-gradient(circle_at_50%_80%,white,transparent_35%)]" />
					<div className="absolute top-16 left-16 w-24 h-24 border-4 border-white/20 rounded-3xl rotate-12 animate-pulse"></div>
					<div className="absolute bottom-32 right-16 w-28 h-28 bg-white/10 rounded-full backdrop-blur-sm animate-pulse" style={{ animationDelay: "0.8s" }}></div>

					<div className="relative z-10 flex flex-col justify-between px-12 py-10 w-full">
						<div>
							<Link href="/landingpage" className="group flex items-center gap-3 mb-10 w-fit hover:scale-105 transition-transform">
								<div className="relative">
									<div className="absolute inset-0 bg-white rounded-xl blur-md opacity-50 group-hover:opacity-70 transition"></div>
									<Image
										src="/logo1.png"
										alt="TAPTO"
										width={52}
										height={52}
										className="relative h-12 w-12 bg-white rounded-xl p-2 shadow-lg"
									/>
								</div>
								<div>
									<div className="text-3xl font-bold">TAPTO</div>
									<div className="text-sm text-blue-100">Swipe. Shop. Smile.</div>
								</div>
							</Link>

							<div className="space-y-6 max-w-xl">
								<div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md px-4 py-2 text-sm font-semibold border border-white/30">
									<Sparkles className="w-4 h-4" />
									Reset and rejoin the flow
								</div>
								<h1 className="text-5xl font-bold leading-tight">
									Lost access? <span className="text-yellow-300">One tap</span> brings you back.
								</h1>
								<p className="text-lg text-blue-100 leading-relaxed">
									Recover your account with a single, secure link. Get back to curating your looks and chasing fresh drops.
								</p>

								<div className="grid gap-3">
									{[{
										icon: <HeartPulse className="w-5 h-5" />, title: "Stay in the loop", desc: "Instant alerts once your reset link lands."}, {
										icon: <Shield className="w-5 h-5" />, title: "Bank-grade safety", desc: "Encrypted resets keep your account locked to you."}, {
										icon: <Zap className="w-5 h-5" />, title: "Back in seconds", desc: "Average recovery time under two minutes."}
									].map((item, idx) => (
										<div key={idx} className="group bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:bg-white/15 transition-all hover:scale-[1.02]">
											<div className="flex items-start gap-3">
												<div className="flex-shrink-0 w-10 h-10 rounded-xl bg-linear-to-br from-blue-200/70 to-indigo-200/70 flex items-center justify-center text-blue-900">
													{item.icon}
												</div>
												<div>
													<div className="font-semibold text-white">{item.title}</div>
													<div className="text-sm text-blue-100">{item.desc}</div>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>

						<div className="flex items-center gap-8 mt-10">
							<div className="text-center">
								<div className="text-3xl font-bold mb-1">99%</div>
								<div className="text-xs text-blue-100">Links arrive first try</div>
							</div>
							<div className="h-12 w-px bg-white/20"></div>
							<div className="text-center">
								<div className="text-3xl font-bold mb-1"><span className="align-middle">24/7</span></div>
								<div className="text-xs text-blue-100">Always-on support</div>
							</div>
							<div className="h-12 w-px bg-white/20"></div>
							<div className="text-center">
								<div className="text-3xl font-bold mb-1">2 min</div>
								<div className="text-xs text-blue-100">Average reset</div>
							</div>
						</div>
					</div>
				</div>

				{/* Right Side - Form */}
				<div className="flex w-full lg:w-1/2 items-center justify-center p-6">
					<div className="w-full max-w-md">
						<div className="mb-6">
							<Link
								href="/login"
								className="group inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-all"
							>
								<ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
								Back to sign in
							</Link>
						</div>

						<div className="relative">
							<div className="absolute -top-4 -right-4 w-24 h-24 bg-linear-to-br from-yellow-400 to-orange-500 rounded-full blur-2xl opacity-20"></div>
							<div className="absolute -bottom-4 -left-4 w-32 h-32 bg-linear-to-br from-blue-400 to-indigo-500 rounded-full blur-2xl opacity-20"></div>

							<div className="relative rounded-3xl bg-white p-8 shadow-2xl border border-gray-100 backdrop-blur-sm">
								<div className="lg:hidden mb-8 text-center">
									<div className="inline-flex items-center gap-3">
										<Image
											src="/logo1.png"
											alt="TAPTO"
											width={40}
											height={40}
											className="h-10 w-10"
										/>
										<span className="text-2xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">TAPTO</span>
									</div>
								</div>

								<div className="mb-8">
									<div className="flex items-center justify-between mb-4">
										<div className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-blue-50 to-indigo-50 px-4 py-2 text-xs font-semibold text-blue-700 border border-blue-100">
											<ShieldCheck className="w-3 h-3" />
											Secure recovery
										</div>
										<div className="flex gap-1">
											<div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
											<div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
											<div className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
										</div>
									</div>
									<h2 className="text-3xl font-bold text-gray-900 mb-2">Reset password</h2>
									<p className="text-gray-600">Enter the email you use for TAPTO and we will send a reset link.</p>
								</div>

								<ForgotPasswordForm />

								<div className="mt-6 flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50 p-4 text-sm text-gray-700">
									<div className="flex items-center gap-2">
										<BellRing className="w-4 h-4 text-blue-600" />
										<span>Keep an eye on promotions tab too.</span>
									</div>
									<Link href="/register" className="font-semibold text-blue-600 hover:text-blue-700 transition">
										New here?
									</Link>
								</div>
							</div>
						</div>

						<div className="mt-6 text-center text-xs text-gray-500">
							Need a hand? Our support squad replies in under 5 minutes.
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
