"use client";

import React from "react";
import { useAuth } from "@/lib/context/auth-context";
import Link from "next/link";
import {
  User,
  Settings,
  ShoppingBag,
  Heart,
  Package,
  CreditCard,
  LogOut,
} from "lucide-react";
import LogoutButton from "../_components/logout-button";
import { resolveImageUrl } from "../../lib/utils/image";

export default function UserHomePage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-600">Could not load profile</h2>
          <Link href="/auth/login" className="text-blue-600 hover:underline mt-2 inline-block">
            Please login again
          </Link>
        </div>
      </div>
    );
  }

  const menuItems = [
    {
      icon: User,
      label: "Edit Profile",
      description: "Update your personal information",
      href: "/user/profile",
      color: "blue",
    },
    {
      icon: Package,
      label: "My Orders",
      description: "Track your orders and history",
      href: "/user/orders",
      color: "green",
    },
    {
      icon: Heart,
      label: "Wishlist",
      description: "Items you've saved for later",
      href: "/user/wishlist",
      color: "pink",
    },
    {
      icon: ShoppingBag,
      label: "Shopping Cart",
      description: "View items in your cart",
      href: "/user/cart",
      color: "orange",
    },
    {
      icon: CreditCard,
      label: "Payment Methods",
      description: "Manage your payment options",
      href: "/user/payments",
      color: "purple",
    },
    {
      icon: Settings,
      label: "Settings",
      description: "Account settings and preferences",
      href: "/user/settings",
      color: "gray",
    },
  ];

  const colorClasses: Record<string, string> = {
    blue: "bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
    green: "bg-green-100 text-green-600 group-hover:bg-green-600 group-hover:text-white",
    pink: "bg-pink-100 text-pink-600 group-hover:bg-pink-600 group-hover:text-white",
    orange: "bg-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white",
    purple: "bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white",
    gray: "bg-gray-100 text-gray-600 group-hover:bg-gray-600 group-hover:text-white",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-all duration-200 group bg-transparent border-none cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Dashboard</span>
          </Link>
        </div>

        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-12">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <img
                src={resolveImageUrl((user as any).profilePicture)}
                alt={user.fullName}
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-xl"
                onError={(e) => (e.currentTarget.src = "/default-avatar.svg")}
              />
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold text-white">{user.fullName}</h1>
                <p className="text-blue-100 mt-1">{user.email}</p>
                <div className="flex items-center justify-center md:justify-start gap-3 mt-3">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-white/20 text-white">
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                  {(user as any).shoppingPreference && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-white/20 text-white">
                      {(user as any).shoppingPreference}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 divide-x divide-gray-100 border-t border-gray-100">
            <div className="py-4 text-center">
              <p className="text-2xl font-bold text-gray-900">0</p>
              <p className="text-sm text-gray-500">Orders</p>
            </div>
            <div className="py-4 text-center">
              <p className="text-2xl font-bold text-gray-900">0</p>
              <p className="text-sm text-gray-500">Wishlist</p>
            </div>
            <div className="py-4 text-center">
              <p className="text-2xl font-bold text-gray-900">0</p>
              <p className="text-sm text-gray-500">Cart Items</p>
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition flex items-start gap-4"
            >
              <div className={`p-3 rounded-xl transition ${colorClasses[item.color]}`}>
                <item.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition">
                  {item.label}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Logout Button */}
        <div className="text-center">
          <LogoutButton className="inline-flex items-center gap-2 px-6 py-3 text-red-600 hover:bg-red-50 rounded-xl transition font-medium">
            <LogOut className="w-5 h-5" />
            Sign Out
          </LogoutButton>
        </div>
      </div>
    </div>
  );
}
