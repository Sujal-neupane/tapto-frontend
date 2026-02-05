"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createOrder, CreateOrderData } from "@/lib/api/orders";
import { getProductById, Product } from "@/lib/api/products";
import { toast } from "react-toastify";

interface CartItem {
  productId: string;
  quantity: number;
}

interface CartItemWithDetails extends CartItem {
  name: string;
  price: number;
  image: string;
  discount?: number;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItemWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });
  const [paymentMethod, setPaymentMethod] = useState({
    type: 'card',
    last4: '4242',
  });

  // Load cart items from localStorage and fetch product details
  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const savedCart = localStorage.getItem('cart');
        if (!savedCart) {
          setLoading(false);
          return;
        }

        const cartProductIds: string[] = JSON.parse(savedCart);
        if (cartProductIds.length === 0) {
          setLoading(false);
          return;
        }

        // Get unique product IDs and their quantities
        const productQuantities = cartProductIds.reduce((acc, productId) => {
          acc[productId] = (acc[productId] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        // Fetch product details for each unique product
        const detailedItems: CartItemWithDetails[] = [];
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
      } catch (err) {
        console.error('Error loading cart:', err);
        toast.error('Failed to load cart items');
      } finally {
        setLoading(false);
      }
    };

    loadCartItems();
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!shippingAddress.fullName || !shippingAddress.phone || !shippingAddress.street || !shippingAddress.city || !shippingAddress.zipCode) {
      toast.error('Please fill in all required shipping fields');
      return;
    }

    setLoading(true);
    try {
      const orderData: CreateOrderData = {
        items: cartItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        shippingAddress: {
          id: 'temp-id', // Generate or use stored address ID
          ...shippingAddress,
        },
        paymentMethod: {
          id: 'temp-payment-id', // Generate or use stored payment method ID
          ...paymentMethod,
        },
      };

      const order = await createOrder(orderData);
      toast.success('Order placed successfully!');

      // Clear cart and redirect
      localStorage.removeItem('cart');
      router.push(`/user/orders/${order._id}`);
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500 mb-4">Your cart is empty</div>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Checkout</h1>
            <div className="w-16"></div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Form */}
          <div className="space-y-8">
            {/* Shipping Address */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping Address</h2>
              <div className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.fullName}
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, fullName: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={shippingAddress.phone}
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.street}
                    onChange={(e) => setShippingAddress(prev => ({ ...prev, street: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                    placeholder="123 Main St"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, city: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                      placeholder="New York"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.state}
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, state: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                      placeholder="NY"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.zipCode}
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, zipCode: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                      placeholder="10001"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.country}
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, country: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                      placeholder="United States"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Method</h2>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod.type === 'card'}
                    onChange={(e) => setPaymentMethod(prev => ({ ...prev, type: e.target.value }))}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-gray-700">Credit/Debit Card</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="paypal"
                    checked={paymentMethod.type === 'paypal'}
                    onChange={(e) => setPaymentMethod(prev => ({ ...prev, type: e.target.value }))}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-gray-700">PayPal</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod.type === 'cod'}
                    onChange={(e) => setPaymentMethod(prev => ({ ...prev, type: e.target.value }))}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-gray-700">Cash on Delivery</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            {/* Order Items */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.productId} className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Total */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : `Place Order - $${total.toFixed(2)}`}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}