"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getAdminProducts, updateAdminProduct, AdminProduct } from "@/lib/api/admin";
import { toast } from "react-toastify";
import {
  Package,
  Upload,
  X,
  Save,
  ArrowLeft,
  DollarSign,
  Tag,
  Box,
  FileText,
  Loader2,
} from "lucide-react";
import Link from "next/link";

const EditProductPage = () => {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    discount: "",
  });

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await getAdminProducts();
      if (response.success) {
        const product = response.data.find((p: AdminProduct) => p._id === productId);
        if (product) {
          setFormData({
            name: product.name,
            description: product.description,
            price: product.price.toString(),
            category: product.category,
            stock: product.stock.toString(),
            discount: product.discount?.toString() || "",
          });
          setExistingImages(product.images || []);
        } else {
          toast.error("Product not found");
          router.push("/admin/products");
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch product");
      router.push("/admin/products");
    } finally {
      setFetching(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + images.length + existingImages.length > 5) {
      toast.error("Maximum 5 images allowed");
      return;
    }

    const newImages = [...images, ...files];
    setImages(newImages);

    // Create previews
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const removeNewImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);

    // Revoke the object URL to free memory
    URL.revokeObjectURL(imagePreviews[index]);

    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const removeExistingImage = (imageUrl: string) => {
    setExistingImages(prev => prev.filter(img => img !== imageUrl));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.price || !formData.category || !formData.stock) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (images.length + existingImages.length === 0) {
      toast.error("Please keep at least one product image");
      return;
    }

    setLoading(true);
    try {
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("description", formData.description);
      submitData.append("price", formData.price);
      submitData.append("category", formData.category);
      submitData.append("stock", formData.stock);
      if (formData.discount) {
        submitData.append("discount", formData.discount);
      }

      // Add existing images
      existingImages.forEach(image => {
        submitData.append("existingImages", image);
      });

      // Add new images
      images.forEach((image, index) => {
        submitData.append("images", image);
      });

      await updateAdminProduct(productId, submitData);
      toast.success("Product updated successfully");
      router.push("/admin/products");
    } catch (error: any) {
      toast.error(error.message || "Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "Electronics",
    "Clothing",
    "Home & Garden",
    "Sports & Outdoors",
    "Books",
    "Health & Beauty",
    "Toys & Games",
    "Automotive",
    "Other"
  ];

  if (fetching) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
          <span className="text-slate-600">Loading product...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/products"
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900">Edit Product</h1>
                  <p className="text-sm text-slate-600">Update product information</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Box className="w-5 h-5" />
                Basic Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900"
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Price *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900"
                    placeholder="Enter stock quantity"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    name="discount"
                    value={formData.discount}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900"
                    placeholder="Optional discount percentage"
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900"
                  placeholder="Enter product description"
                  required
                />
              </div>
            </div>

            {/* Images */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Product Images
              </h2>

              <div className="space-y-4">
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6">
                  <div className="text-center">
                    <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <div className="text-sm text-slate-600 mb-2">
                      Add more images (max 5 total)
                    </div>
                    <label className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer transition-colors">
                      <span>Choose Files</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Existing Images */}
                {existingImages.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-slate-700 mb-2">Current Images</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {existingImages.map((imageUrl, index) => (
                        <div key={`existing-${index}`} className="relative group">
                          <img
                            src={`http://localhost:4000${imageUrl}`}
                            alt={`Existing ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border border-slate-200"
                          />
                          <button
                            type="button"
                            onClick={() => removeExistingImage(imageUrl)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* New Image Previews */}
                {imagePreviews.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-slate-700 mb-2">New Images</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={`new-${index}`} className="relative group">
                          <img
                            src={preview}
                            alt={`New Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border border-slate-200"
                          />
                          <button
                            type="button"
                            onClick={() => removeNewImage(index)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-end gap-4">
                <Link
                  href="/admin/products"
                  className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {loading ? "Updating..." : "Update Product"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProductPage;