            "use client";

            import Link from "next/link";
            import Image from "next/image";
            import RegisterForm from "../(_components)/registerform";
            import {
              Sparkles,
              Gift,
              ShoppingBag,
              Heart,
              Shield,
              Zap,
              ArrowLeft,
              ChevronRight,
              Star
            } from "lucide-react";

            export default function RegisterPage() {
              return (
                <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
                  {/* Animated background */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-16 -left-24 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                    <div className="absolute bottom-10 -right-24 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1.5s" }}></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: "3s" }}></div>
                  </div>

                  <div className="flex min-h-screen relative z-10">
                    {/* Left Side - Story */}
                    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white">
                      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
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
                              <Sparkles className="w-4 h-4" /> New member perks
                            </div>
                            <h1 className="text-5xl font-bold leading-tight">
                              Join the <span className="text-yellow-300">drop squad</span> today.
                            </h1>
                            <p className="text-lg text-blue-100 leading-relaxed">
                              Create your account, set your style, and unlock exclusive drops tailored to your vibe.
                            </p>

                            <div className="grid gap-3">
                              <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:bg-white/15 transition-all hover:scale-[1.02]">
                                <div className="flex items-start gap-3">
                                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center shadow-lg">
                                    <ShoppingBag className="w-5 h-5 text-white" />
                                  </div>
                                  <div>
                                    <div className="font-semibold text-white">Sync everything</div>
                                    <div className="text-sm text-blue-100">Cart, favorites, and orders stay in sync across devices.</div>
                                  </div>
                                </div>
                              </div>

                              <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:bg-white/15 transition-all hover:scale-[1.02]">
                                <div className="flex items-start gap-3">
                                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-lg">
                                    <Gift className="w-5 h-5 text-white" />
                                  </div>
                                  <div>
                                    <div className="font-semibold text-white">Members-only drops</div>
                                    <div className="text-sm text-blue-100">Early access to secret sales and surprise bundles.</div>
                                  </div>
                                </div>
                              </div>

                              <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:bg-white/15 transition-all hover:scale-[1.02]">
                                <div className="flex items-start gap-3">
                                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                                    <Zap className="w-5 h-5 text-white" />
                                  </div>
                                  <div>
                                    <div className="font-semibold text-white">Faster checkout</div>
                                    <div className="text-sm text-blue-100">Save cards and addresses for lightning-fast checkout.</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-8 mt-10">
                          <div className="text-center">
                            <div className="text-3xl font-bold mb-1">80K+</div>
                            <div className="text-xs text-blue-100">New members</div>
                          </div>
                          <div className="h-12 w-px bg-white/20"></div>
                          <div className="text-center">
                            <div className="text-3xl font-bold mb-1">120+</div>
                            <div className="text-xs text-blue-100">Drops / month</div>
                          </div>
                          <div className="h-12 w-px bg-white/20"></div>
                          <div className="text-center">
                            <div className="text-3xl font-bold mb-1">4.9★</div>
                            <div className="text-xs text-blue-100">User rating</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Side - Register Form */}
                    <div className="flex w-full lg:w-1/2 items-center justify-center p-6">
                      <div className="w-full max-w-md">
                        <div className="mb-6">
                          <Link
                            href="/landingpage"
                            className="group inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-all"
                          >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Home
                          </Link>
                        </div>

                        <div className="relative">
                          <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-2xl opacity-20"></div>
                          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full blur-2xl opacity-20"></div>

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
                                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">TAPTO</span>
                              </div>
                            </div>

                            <div className="mb-8">
                              <div className="flex items-center justify-between mb-4">
                                <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 text-xs font-semibold text-blue-700 border border-blue-100">
                                  <Shield className="w-3 h-3" />
                                  Create your account
                                </div>
                                <div className="flex gap-1">
                                  <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
                                  <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                                  <div className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                                </div>
                              </div>
                              <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign up</h2>
                              <p className="text-gray-600">Set your style and start shopping</p>
                            </div>

                            <RegisterForm />

                            <div className="relative my-6">
                              <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                              </div>
                              <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-gray-500">Already with us?</span>
                              </div>
                            </div>

                            <Link
                              href="/login"
                              className="group w-full flex items-center justify-center gap-2 rounded-xl border-2 border-gray-200 px-4 py-3 font-semibold text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all"
                            >
                              Sign in
                              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </div>
                        </div>

                        <div className="mt-6 text-center text-xs text-gray-500">
                          Trusted by shoppers worldwide — secured by modern encryption.
                        </div>
                      </div>
                    </div>
                  </div>
                </main>
              );
            }
