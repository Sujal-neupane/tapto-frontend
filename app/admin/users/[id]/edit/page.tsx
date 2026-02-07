
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getAdminUserById, updateAdminUser } from "@/lib/api/admin";
import { toast } from "react-toastify";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Shield,
  Camera,
  Save,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import { resolveImageUrl } from "@/lib/utils/image";

const AdminUserEditPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    role: "user",
    shoppingPreference: "",
    phoneNumber: "",
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const response = await getAdminUserById(id);
        if (response.success) {
          const user = response.data;
          setForm({
            fullName: user.fullName || "",
            email: user.email || "",
            role: user.role || "user",
            shoppingPreference: user.shoppingPreference || "",
            phoneNumber: user.phoneNumber || "",
          });
          setPreview(user.profilePicture || null);
        }
      } catch (error: any) {
        toast.error(error.message || "Failed to fetch user");
        router.push("/admin/users");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id, router]);

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
    setSubmitting(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
      if (profileImage) {
        formData.append("profilePicture", profileImage);
      }

      const response = await updateAdminUser(id, formData);
      if (response.success) {
        toast.success("User updated successfully!");
        router.push(`/admin/users/${id}`);
      } else {
        toast.error(response.message || "Update failed");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update user");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-primary-50 to-primary-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-primary-50 to-primary-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push("/admin/users")}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 transition mb-4 bg-transparent border-none cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Users
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Edit User</h1>
          <p className="text-gray-600 mt-1">Update user information</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Profile Picture Section */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-600 px-8 py-12 text-center">
            <div className="relative inline-block">
              <img
                src={resolveImageUrl(preview)}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
                onError={(e) => (e.currentTarget.src = "/default-avatar.svg")}
              />
              <label
                htmlFor="profilePicture"
                className="absolute bottom-0 right-0 bg-white text-primary-600 rounded-full p-3 cursor-pointer shadow-lg hover:bg-primary-50 transition"
              >
                <Camera className="w-5 h-5" />
                <input
                  id="profilePicture"
                  name="profilePicture"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleChange}
                />
              </label>
            </div>
            <p className="text-primary-100 mt-4 text-sm">Click the camera icon to change profile picture</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <User className="w-4 h-4 text-primary-600" />
                  Full Name
                </label>
                <input
                  name="fullName"
                  type="text"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 transition text-gray-900 placeholder-gray-500"
                  placeholder="Enter full name"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Mail className="w-4 h-4 text-primary-600" />
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 transition text-gray-900 placeholder-gray-500"
                  placeholder="Enter email address"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Phone className="w-4 h-4 text-primary-600" />
                  Phone Number
                </label>
                <input
                  name="phoneNumber"
                  type="text"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 transition text-gray-900 placeholder-gray-500"
                  placeholder="Enter phone number"
                />
              </div>

              {/* Role */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Shield className="w-4 h-4 text-primary-600" />
                  Role
                </label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 transition bg-white text-gray-900"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* Shopping Preference */}
              <div className="space-y-2 md:col-span-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <ShoppingBag className="w-4 h-4 text-primary-600" />
                  Shopping Preference
                </label>
                <select
                  name="shoppingPreference"
                  value={form.shoppingPreference}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 transition bg-white text-gray-900"
                >
                  <option value="">Select preference</option>
                  <option value="Mens Fashion">Men&apos;s Fashion</option>
                  <option value="Womens Fashion">Women&apos;s Fashion</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex gap-4">
              <button
                type="button"
                onClick={() => router.push(`/admin/users/${id}`)}
                className="flex-1 py-4 px-6 border-2 border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-primary-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Update User
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminUserEditPage;
