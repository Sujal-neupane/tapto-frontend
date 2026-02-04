"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/context/auth-context";
import Link from "next/link";
import { Heart, ShoppingCart, ArrowLeft, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { getProductById, Product } from "@/lib/api/products";

interface WishlistItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  discount?: number;
}

export default function UserWishlistPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const savedWishlist = localStorage.getItem('wishlist');
        if (savedWishlist) {
          const productIds: string[] = JSON.parse(savedWishlist);
          if (productIds.length === 0) {
            setLoading(false);
            return;
          }

          // Fetch product details for each product
          const detailedItems: WishlistItem[] = [];
          for (const productId of productIds) {
            try {
              const product = await getProductById(productId);
              detailedItems.push({
                productId,
                name: product.name,
                price: product.price,
                image: product.images?.[0] || '',
                discount: product.discount,
              });
            } catch (err) {
              console.error(`Failed to fetch product ${productId}:`, err);
              // Skip this product if it can't be loaded
            }
          }

          setWishlistItems(detailedItems);
        }
      } catch (err) {
        console.error('Error loading wishlist:', err);
        toast.error('Failed to load wishlist');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadWishlist();
    } else {
      setLoading(false);
    }
  }, [user]);

  const removeFromWishlist = (productId: string) => {
    try {
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        const productIds: string[] = JSON.parse(savedWishlist);
        const updatedIds = productIds.filter(id => id !== productId);
        localStorage.setItem('wishlist', JSON.stringify(updatedIds));
        setWishlistItems(prev => prev.filter(item => item.productId !== productId));
        toast.success('Removed from wishlist');
      }
    } catch (err) {
      console.error('Error removing from wishlist:', err);
      toast.error('Failed to remove item');
    }
  };

  const addToCart = (productId: string) => {
    try {
      const savedCart = localStorage.getItem('cart') || '[]';
      const cartItems: string[] = JSON.parse(savedCart);
      cartItems.push(productId);
      localStorage.setItem('cart', JSON.stringify(cartItems));
      toast.success('Added to cart');
    } catch (err) {
      console.error('Error adding to cart:', err);
      toast.error('Failed to add to cart');
    }
  };

  if (authLoading) {
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
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-600">Please login to view your wishlist</h2>
          <Link href="/auth/login" className="text-blue-600 hover:underline mt-2 inline-block">
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/user"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          <p className="text-gray-600 mt-2">Items you've saved for later</p>
        </div>

        {/* Wishlist Items */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-500 mb-6">Start browsing and add items to your wishlist</p>
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-block"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.productId} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="aspect-square relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  {item.discount && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                      -{item.discount}%
                    </div>
                  )}
                  <button
                    onClick={() => removeFromWishlist(item.productId)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>

                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{item.name}</h3>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">
                        ${item.price.toFixed(2)}
                      </span>
                      {item.discount && (
                        <span className="text-sm text-gray-500 line-through">
                          ${(item.price / (1 - item.discount / 100)).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => addToCart(item.productId)}
                    className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}