"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";


const updateSchema = z.object({
  fullName: z.string().min(2, "Full Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone Number must be at least 10 digits"),
  profilePicture: z
    .instanceof(FileList)
    .refine((files) => files.length === 1, "Profile Picture is required")
    .refine(
      (files) => files[0]?.size <= 5 * 1024 * 1024,
      "Profile Picture must be less than 5MB"
    )
    .refine(
      (files) =>
        ["image/jpeg", "image/png", "image/gif"].includes(files[0]?.type),
      "Profile Picture must be a JPEG, PNG, or GIF"
    ),
});

type UpdateFormData = z.infer<typeof updateSchema>;
export default function UpdateForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateFormData>({
    resolver: zodResolver(updateSchema),
  });

  const onSubmit = async (data: UpdateFormData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("profilePicture", data.profilePicture[0]);

      const response = await fetch("/api/user/update", {
        method: "POST",
        body: formData,
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || "Failed to update profile");
        }
        setSuccess("Profile updated successfully");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block mb-1">Full Name</label>
        <input
          type="text"
          {...register("fullName")}
          className="w-full border px-3 py-2"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1">Email</label>
        <input
          type="email"
          {...register("email")}
          className="w-full border px-3 py-2"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1">Phone Number</label>
        <input
          type="text"
          {...register("phoneNumber")}
          className="w-full border px-3 py-2"
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1">Profile Picture</label>
        <input
          type="file"
          accept="image/*"
          {...register("profilePicture")}
          className="w-full"
        />
        {errors.profilePicture && (
          <p className="text-red-500 text-sm mt-1">{errors.profilePicture.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Updating..." : "Update Profile"}
      </button>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
    </form>
  );
}import { useForm } from "react-hook-form";