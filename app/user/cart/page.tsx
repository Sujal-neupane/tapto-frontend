"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/auth-context";
import Link from "next/link";
import { ShoppingCart, ArrowLeft, Trash2, Plus, Minus } from "lucide-react";
import { toast } from "react-toastify";
import { getProductById, Product } from "@/lib/api/products";
import { resolveImageUrl } from "@/lib/utils/image";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  discount?: number;
}

export default function UserCartPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          const productIds: string[] = JSON.parse(savedCart);
          if (productIds.length === 0) {
            setLoading(false);
            return;
          }

          // Get unique product IDs and their quantities
          const productQuantities = productIds.reduce((acc, productId) => {
            acc[productId] = (acc[productId] || 0) + 1;
            return acc;
          }, {} as Record<string, number>);

          // Fetch product details for each unique product
          const detailedItems: CartItem[] = [];
          for (const [productId, quantity] of Object.entries(productQuantities)) {
            try {
              const product = await getProductById(productId);
              detailedItems.push({
                productId,
                name: product.name,
                price: product.price,
                image: product.images?.[0] || '',
                quantity,
                discount: product.discount,
              });
            } catch (err) {
              console.error(`Failed to fetch product ${productId}:`, err);
              // Skip this product if it can't be loaded
            }
          }

          setCartItems(detailedItems);
        }
      } catch (err) {
        console.error('Error loading cart:', err);
        toast.error('Failed to load cart');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadCart();
    } else {
      setLoading(false);
    }
  }, [user]);

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    try {
      const savedCart = localStorage.getItem('cart') || '[]';
      const cartItems: string[] = JSON.parse(savedCart);

      // Remove all instances of this product
      const filteredItems = cartItems.filter(id => id !== productId);

      // Add the new quantity
      for (let i = 0; i < newQuantity; i++) {
        filteredItems.push(productId);
      }

      localStorage.setItem('cart', JSON.stringify(filteredItems));

      setCartItems(prev =>
        prev.map(item =>
          item.productId === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } catch (err) {
      console.error('Error updating quantity:', err);
      toast.error('Failed to update quantity');
    }
  };

  const removeFromCart = (productId: string) => {
    try {
      const savedCart = localStorage.getItem('cart') || '[]';
      const cartItems: string[] = JSON.parse(savedCart);
      const updatedItems = cartItems.filter(id => id !== productId);
      localStorage.setItem('cart', JSON.stringify(updatedItems));

      setCartItems(prev => prev.filter(item => item.productId !== productId));
      toast.success('Removed from cart');
    } catch (err) {
      console.error('Error removing from cart:', err);
      toast.error('Failed to remove item');
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.discount
        ? item.price * (1 - item.discount / 100)
        : item.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-primary-50 to-primary-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-primary-50 to-primary-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-600">Please login to view your cart</h2>
          <Link href="/auth/login" className="text-primary-600 hover:underline mt-2 inline-block">
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-primary-50 to-primary-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-primary-600 hover:text-primary-800 mb-4 bg-transparent border-none cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">
            {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {/* Cart Items */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : cartItems.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-6">Add some items to get started</p>
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 inline-block"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (

                <div key={item.productId} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={resolveImageUrl(item.image) || '/api/placeholder/80/80'}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />

                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
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

                    {/* Quantity Controls */}
                    <div className="flex items-center text-black space-x-2">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="p-1 rounded-md border text-black border-gray-300 hover:bg-gray-50"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="p-1 rounded-md border border-gray-300 text-black hover:bg-gray-50"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({getTotalItems()} items)</span>
                    <span className="font-medium text-black">${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-black">
                      {getTotalPrice() > 50 ? 'Free'  : '$9.99'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium text-black">${(getTotalPrice() * 0.08).toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between text-lg font-bold text-black">
                    <span>Total</span>
                    <span>${(getTotalPrice() + (getTotalPrice() > 50 ? 0 : 9.99) + (getTotalPrice() * 0.08)).toFixed(2)}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full block text-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}