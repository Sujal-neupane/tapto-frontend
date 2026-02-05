"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getAdminUserById, deleteAdminUser, User } from "@/lib/api/admin";
import { toast } from "react-toastify";
import {
  ArrowLeft,
  Edit2,
  Trash2,
  Mail,
  Phone,
  Shield,
  Calendar,
  ShoppingBag,
  User as UserIcon,
} from "lucide-react";
import Link from "next/link";
import { resolveImageUrl } from "@/lib/utils/image";

const AdminUserDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const response = await getAdminUserById(id);
        if (response.success) {
          setUser(response.data);
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

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;
    setDeleting(true);
    try {
      const response = await deleteAdminUser(id);
      if (response.success) {
        toast.success("User deleted successfully");
        router.push("/admin/users");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to delete user");
    } finally {
      setDeleting(false);
    }
  };

  const normalizeImageSrc = (src: string | null | undefined) => {
    return resolveImageUrl(src);
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
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
          <UserIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-600">User not found</h2>
          <Link href="/admin/users" className="text-blue-600 hover:underline mt-2 inline-block">
            Back to Users
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin/users"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Users
          </Link>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">User Details</h1>
            <div className="flex items-center gap-3">
              <Link
                href={`/admin/users/${id}/edit`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </Link>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
              >
                {deleting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* User Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-12">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <img
                src={normalizeImageSrc(user.profilePicture)}
                alt={user.fullName}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
                onError={(e) => (e.currentTarget.src = "/default-avatar.svg")}
              />
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold text-white">{user.fullName}</h2>
                <p className="text-blue-100 mt-1">{user.email}</p>
                <div className="flex items-center justify-center md:justify-start gap-2 mt-3">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                      user.role === "admin"
                        ? "bg-red-100 text-red-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {user.role === "admin" && <Shield className="w-3 h-3" />}
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">User Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <UserIcon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-semibold text-gray-900">{user.fullName}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Mail className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="font-semibold text-gray-900">{user.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Phone className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="font-semibold text-gray-900">{user.phoneNumber || "Not provided"}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <ShoppingBag className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Shopping Preference</p>
                  <p className="font-semibold text-gray-900">{user.shoppingPreference || "Not set"}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="p-3 bg-teal-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Created At</p>
                  <p className="font-semibold text-gray-900">{formatDate(user.createdAt)}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="p-3 bg-indigo-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Updated</p>
                  <p className="font-semibold text-gray-900">{formatDate(user.updatedAt)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserDetailPage;
