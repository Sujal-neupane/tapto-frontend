"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/auth-context";
import { updateUserProfile } from "@/lib/api/admin";
import { toast } from "react-toastify";
import { User, Mail, Phone, Camera, Save, ArrowLeft, Shield, Check, X, Edit3, Upload, LogOut } from "lucide-react";
import Link from "next/link";
import LogoutButton from "../../_components/logout-button";
import { resolveImageUrl } from "../../../lib/utils/image";

const UserProfilePage = () => {
  const router = useRouter();
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    shoppingPreference: "",
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [imageHover, setImageHover] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        fullName: user.fullName || "",
        email: user.email || "",
        phoneNumber: (user as any).phoneNumber || "",
        shoppingPreference: (user as any).shoppingPreference || "",
      });
      const profilePic = (user as any).profilePicture || null;
      console.log("🖼️ Setting preview from user:", { profilePic, user });
      setPreview(profilePic);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const changed =
        form.fullName !== (user.fullName || "") ||
        form.email !== (user.email || "") ||
        form.phoneNumber !== ((user as any).phoneNumber || "") ||
        form.shoppingPreference !== ((user as any).shoppingPreference || "") ||
        profileImage !== null;
      setHasChanges(changed);
    }
  }, [form, profileImage, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "profilePicture" && (e.target as HTMLInputElement).files?.[0]) {
      const file = (e.target as HTMLInputElement).files![0];
      setProfileImage(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = user?._id || (user as any)?.id;
    if (!userId) {
      toast.error("User not found");
      return;
    }
    
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
      if (profileImage) {
        formData.append("profilePicture", profileImage);
      }

      const response = await updateUserProfile(userId, formData);
      if (response.success) {
        console.log("✅ Profile update successful:", response.data);
        toast.success("Profile updated successfully!");
        setUser(response.data as any);
        if (response.data.profilePicture) {
          console.log("📸 Setting preview to:", response.data.profilePicture);
          setPreview(response.data.profilePicture);
        }
        setProfileImage(null);
        setHasChanges(false);
      } else {
        toast.error(response.message || "Update failed");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setForm({
        fullName: user.fullName || "",
        email: user.email || "",
        phoneNumber: (user as any).phoneNumber || "",
        shoppingPreference: (user as any).shoppingPreference || "",
      });
      setPreview((user as any).profilePicture || null);
      setProfileImage(null);
      setHasChanges(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fadeIn">
          <button
            onClick={() => router.push("/user")}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-all duration-200 group mb-6 bg-transparent border-none cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Dashboard</span>
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                Edit Profile
              </h1>
              <p className="text-gray-600 mt-2 flex items-center gap-2">
                <Edit3 className="w-4 h-4" />
                Update your personal information and preferences
              </p>
            </div>
            <div className="flex items-center gap-3">
              {hasChanges && (
                <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg animate-slideIn">
                  <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-amber-700">Unsaved changes</span>
                </div>
              )}
              <LogoutButton className="inline-flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition font-semibold">
                <LogOut className="w-4 h-4" />
                Logout
              </LogoutButton>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-fadeIn">
          {/* Profile Picture Section with Enhanced Gradient */}
          <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 px-8 py-16 text-center overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-32 -translate-y-32" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-32 translate-y-32" />
            </div>

            {/* Profile Image */}
            <div className="relative inline-block animate-scaleIn">
              <div 
                className="relative"
                onMouseEnter={() => setImageHover(true)}
                onMouseLeave={() => setImageHover(false)}
              >
                <img
                  src={resolveImageUrl(preview)}
                  alt="Profile"
                  className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-2xl transition-all duration-300 hover:scale-105"
                  onError={(e) => {
                    console.error("❌ Image failed to load:", resolveImageUrl(preview));
                    e.currentTarget.src = "/default-avatar.svg";
                  }}
                  onLoad={() => console.log("✅ Image loaded successfully:", resolveImageUrl(preview))}
                />
                
                {/* Image Upload Overlay */}
                <label
                  htmlFor="profilePicture"
                  className={`absolute inset-0 rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center ${
                    imageHover ? 'bg-black/60 backdrop-blur-sm' : 'bg-transparent'
                  }`}
                >
                  <div className={`transition-all duration-300 ${imageHover ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}>
                    <Upload className="w-8 h-8 text-white mb-2" />
                    <span className="text-white text-sm font-medium">Change Photo</span>
                  </div>
                  <input
                    id="profilePicture"
                    name="profilePicture"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleChange}
                  />
                </label>

                {/* Camera Button */}
                <label
                  htmlFor="profilePicture"
                  className="absolute bottom-2 right-2 bg-white text-blue-600 rounded-full p-3 cursor-pointer shadow-lg hover:bg-blue-50 hover:scale-110 transition-all duration-200"
                >
                  <Camera className="w-5 h-5" />
                </label>
              </div>

              {profileImage && (
                <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1.5 shadow-lg animate-scaleIn">
                  <Check className="w-4 h-4" />
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="relative mt-6">
              <h2 className="text-white text-2xl font-bold tracking-wide">
                {user?.fullName || "User Name"}
              </h2>
              <div className="flex items-center justify-center gap-2 mt-3">
                <Shield className="w-5 h-5 text-blue-200" />
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-blue-50 text-sm font-medium capitalize border border-white/30">
                  {user?.role}
                </span>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="p-8 lg:p-12 space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Full Name */}
              <div className="space-y-3 animate-slideIn" style={{ animationDelay: '100ms' }}>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <div className="p-1.5 bg-blue-50 rounded-lg">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  Full Name
                </label>
                <input
                  name="fullName"
                  type="text"
                  value={form.fullName}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all duration-200 bg-gray-50/50 hover:bg-white"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div className="space-y-3 animate-slideIn" style={{ animationDelay: '200ms' }}>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <div className="p-1.5 bg-blue-50 rounded-lg">
                    <Mail className="w-4 h-4 text-blue-600" />
                  </div>
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all duration-200 bg-gray-50/50 hover:bg-white"
                  placeholder="Enter your email"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-3 animate-slideIn" style={{ animationDelay: '300ms' }}>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <div className="p-1.5 bg-blue-50 rounded-lg">
                    <Phone className="w-4 h-4 text-blue-600" />
                  </div>
                  Phone Number
                </label>
                <input
                  name="phoneNumber"
                  type="text"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all duration-200 bg-gray-50/50 hover:bg-white"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Shopping Preference */}
              <div className="space-y-3 animate-slideIn" style={{ animationDelay: '400ms' }}>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <div className="p-1.5 bg-blue-50 rounded-lg">
                    <Shield className="w-4 h-4 text-blue-600" />
                  </div>
                  Shopping Preference
                </label>
                <select
                  name="shoppingPreference"
                  value={form.shoppingPreference}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all duration-200 bg-gray-50/50 hover:bg-white cursor-pointer"
                >
                  <option value="">Select preference</option>
                  <option value="Mens Fashion">Men&apos;s Fashion</option>
                  <option value="Womens Fashion">Women&apos;s Fashion</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 space-y-4 animate-slideIn" style={{ animationDelay: '500ms' }}>
              {/* Mobile Unsaved Changes Indicator */}
              {hasChanges && (
                <div className="md:hidden flex items-center justify-center gap-2 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl">
                  <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-amber-700">You have unsaved changes</span>
                </div>
              )}

              {/* Button Group */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={loading || !hasChanges}
                  className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin relative z-10" />
                      <span className="relative z-10">Updating Profile...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5 relative z-10" />
                      <span className="relative z-10">Save Changes</span>
                    </>
                  )}
                </button>

                {hasChanges && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={loading}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-3 bg-gray-100 text-gray-700 py-4 px-8 rounded-xl font-semibold hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200"
                  >
                    <X className="w-5 h-5" />
                    Cancel
                  </button>
                )}
              </div>

              {/* Help Text */}
              <p className="text-center text-sm text-gray-500">
                Your information is secure and will only be used to improve your experience
              </p>
            </div>
          </form>
        </div>

        {/* Additional Info Card */}
        <div className="mt-6 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 animate-fadeIn" style={{ animationDelay: '600ms' }}>
          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Shield className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Privacy & Security</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We take your privacy seriously. Your personal information is encrypted and stored securely. 
                You can update your preferences at any time.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .animate-slideIn {
          animation: slideIn 0.5s ease-out forwards;
        }

        .animate-scaleIn {
          animation: scaleIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default UserProfilePage;