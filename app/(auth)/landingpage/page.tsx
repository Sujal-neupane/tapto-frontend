"use client";

import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
	return (
		<main className="min-h-dvh bg-white text-slate-900">
			{/* Navbar */}
			<header className="border-b">
				<div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<Image
							src="/logo1.png"
							alt="Tapto logo"
							width={36}
							height={36}
							className="h-9 w-9 object-contain"
							priority
						/>
						<span className="text-xl font-semibold tracking-tight">TAPTO</span>
					</div>
				</div>
			</header>

			{/* Hero */}
			<section className="mx-auto max-w-6xl px-4">
				<div className="grid grid-cols-1 gap-10 py-12 md:grid-cols-2 md:py-16 lg:py-20">
					{/* Left: copy + CTAs */}
					<div className="flex flex-col justify-center">
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
							TAPTO
						</h1>
						<p className="mt-3 text-slate-600">Swipe. Shop. Smile.</p>

						<div className="mt-6 flex items-center gap-3">
							<Link
								href="/register"
								className="rounded-md bg-blue-600 px-5 py-2.5 text-white transition hover:bg-blue-700"
							>
								Get Started
							</Link>
							<Link
								href="/login"
								className="rounded-md border border-slate-300 px-5 py-2.5 text-slate-700 transition hover:bg-slate-50"
							>
								Login
							</Link>
						</div>
					</div>

					{/* Right: simple promo block (no external image required) */}
					<div className="relative">
						<div className="rounded-2xl border bg-slate-50 p-6 shadow-sm">
							<div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-gradient-to-br from-slate-100 via-white to-slate-100">
								<div className="absolute inset-0 grid place-items-center">
									<div className="text-center">
										<div className="text-5xl font-black tracking-tight text-red-600">SALE</div>
										<div className="mt-1 text-3xl font-bold text-slate-800">50% OFF</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Features */}
			<section className="bg-slate-50 border-t">
				<div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
					<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
						<FeatureCard
							title="Easy Shopping"
							desc="Browse and shop with just a tap. Simple, fast, intuitive."
						/>
						<FeatureCard
							title="Save Favorites"
							desc="Keep track of items you love and never miss a deal."
						/>
						<FeatureCard
							title="Personal Profile"
							desc="Manage orders and preferences in one place."
						/>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="border-t">
				<div className="mx-auto max-w-6xl px-4 py-6 text-sm text-slate-600">
					<div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
						<div className="flex items-center gap-2">
							<Image src="/logo1.png" alt="Tapto" width={18} height={18} className="h-4 w-4" />
							<span>© 2025 TAPTO. All rights reserved.</span>
						</div>
						<nav className="flex items-center gap-5">
							<a href="#" className="hover:text-slate-900">Privacy Policy</a>
							<a href="#" className="hover:text-slate-900">Terms of Service</a>
							<a href="#" className="hover:text-slate-900">Contact Us</a>
						</nav>
					</div>
				</div>
			</footer>
		</main>
	);
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
	return (
		<div className="rounded-xl border bg-white p-5 shadow-sm">
			<div className="text-base font-semibold text-slate-900">{title}</div>
			<p className="mt-2 text-sm text-slate-600">{desc}</p>
		</div>
	);
}

