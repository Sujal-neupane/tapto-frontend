"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/auth-context";
import Link from "next/link";
import { resolveImageUrl } from "../../../lib/utils/image";
import {
  ArrowLeft,
  Package,
  MapPin,
  CreditCard,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Download,
  Share2,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  ShoppingBag,
  AlertTriangle,
  RotateCcw
} from "lucide-react";
import { getOrderById, cancelOrder, Order } from "@/lib/api/orders";
import { toast } from "react-toastify";
import { useCurrency } from "@/lib/hooks/useCurrency";

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const { format: formatCurrency } = useCurrency();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  const orderId = params.id as string;

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const fetchedOrder = await getOrderById(orderId);
        setOrder(fetchedOrder);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch order:', err);
        setError('Failed to load order details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (user && orderId) {
      fetchOrder();
    }
  }, [user, orderId]);

  const handleCancelOrder = async () => {
    if (!cancelReason.trim()) {
      toast.error("Please provide a reason for cancellation");
      return;
    }

    try {
      setCancelling(true);
      await cancelOrder(orderId, cancelReason);
      toast.success("Order cancelled successfully");

      // Refresh order data
      const updatedOrder = await getOrderById(orderId);
      setOrder(updatedOrder);
      setShowCancelDialog(false);
      setCancelReason("");
    } catch (err) {
      console.error('Failed to cancel order:', err);
      toast.error("Failed to cancel order. Please try again.");
    } finally {
      setCancelling(false);
    }
  };

  const getStatusConfig = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return {
          color: 'bg-orange-100 text-orange-800 border-orange-200',
          icon: Clock,
          label: 'Pending'
        };
      case 'confirmed':
        return {
          color: 'bg-primary-100 text-primary-800 border-primary-200',
          icon: CheckCircle,
          label: 'Confirmed'
        };
      case 'processing':
        return {
          color: 'bg-purple-100 text-purple-800 border-purple-200',
          icon: Package,
          label: 'Processing'
        };
      case 'shipped':
        return {
          color: 'bg-primary-100 text-primary-800 border-primary-200',
          icon: Truck,
          label: 'Shipped'
        };
      case 'outForDelivery':
        return {
          color: 'bg-teal-100 text-teal-800 border-teal-200',
          icon: Truck,
          label: 'Out for Delivery'
        };
      case 'delivered':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: CheckCircle,
          label: 'Delivered'
        };
      case 'cancelled':
        return {
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: XCircle,
          label: 'Cancelled'
        };
      case 'refunded':
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: RotateCcw,
          label: 'Refunded'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: Package,
          label: 'Unknown'
        };
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-600">Please login to view order details</h2>
          <Link href="/auth/login" className="text-primary-600 hover:underline mt-2 inline-block">
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded-lg mb-6 w-1/3" />
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4" />
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/user/orders"
            className="inline-flex items-center text-primary-600 hover:text-primary-800 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Orders
          </Link>
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">{error || 'Order not found'}</p>
            <Link
              href="/user/orders"
              className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 inline-block"
            >
              Back to Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleDownloadInvoice = () => {
    // Create a simple invoice text
    const invoiceContent = `
ORDER INVOICE
=============

Order ID: ${order._id}
Order Date: ${new Date(order.createdAt).toLocaleDateString()}
Customer: ${order.shippingAddress.fullName}

SHIPPING ADDRESS
================
${order.shippingAddress.fullName}
${order.shippingAddress.street}
${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}
${order.shippingAddress.country}
Phone: ${order.shippingAddress.phone}

ORDER ITEMS
===========
${order.items.map(item => 
  `${item.productName} (x${item.quantity}) - ${formatCurrency(item.price * item.quantity)}`
).join('\n')}

ORDER SUMMARY
=============
Subtotal: ${formatCurrency(order.subtotal)}
Shipping: ${formatCurrency(order.shippingFee)}
Tax: ${formatCurrency(order.tax)}
Total: ${formatCurrency(order.total)}

Payment Method: ${order.paymentMethod.type.toUpperCase()}
${order.paymentMethod.last4 ? `Card ending in ${order.paymentMethod.last4}` : ''}

Thank you for your business!
    `.trim();

    // Create and download the file
    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${order._id.slice(-8)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Invoice downloaded successfully!');
  };

  const handleTrackPackage = () => {
    if (order.trackingNumber) {
      // Open tracking in a new tab (you can integrate with actual tracking services)
      const trackingUrl = `https://www.ups.com/track?tracknum=${order.trackingNumber}`;
      window.open(trackingUrl, '_blank');
      toast.info('Opening tracking page...');
    } else {
      toast.error('No tracking number available for this order');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/user/orders"
            className="inline-flex items-center text-primary-600 hover:text-primary-800 mb-4 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Orders
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
              <p className="text-gray-700 mt-2">Order #{order._id.slice(-8)}</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                <Share2 className="w-5 h-5" />
              </button>
              <button 
                onClick={handleDownloadInvoice}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Status Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Order Status</h2>
            {(() => {
              const statusConfig = getStatusConfig(order.status);
              return (
                <div className={`inline-flex items-center px-4 py-2 rounded-lg border ${statusConfig.color}`}>
                  <statusConfig.icon className="w-4 h-4 mr-2" />
                  <span className="font-medium">{statusConfig.label}</span>
                </div>
              );
            })()}
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <Calendar className="w-4 h-4 mr-2" />
            Ordered on {new Date(order.createdAt).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Items</h2>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <img
                      src={item.productImage ? resolveImageUrl(item.productImage) : '/api/placeholder/80/80'}
                      alt={item.productName}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.productName}</h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-700">Qty: {item.quantity}</span>
                        {item.size && <span className="text-sm text-gray-700">Size: {item.size}</span>}
                        {item.color && <span className="text-sm text-gray-700">Color: {item.color}</span>}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{formatCurrency(item.price * item.quantity)}</p>
                      <p className="text-sm text-gray-700">{formatCurrency(item.price)} each</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="font-medium text-gray-900">{formatCurrency(order.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Shipping</span>
                  <span className="font-medium text-gray-900">{formatCurrency(order.shippingFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Tax</span>
                  <span className="font-medium text-gray-900">{formatCurrency(order.tax)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-gray-900">Total</span>
                    <span className="text-primary-600">{formatCurrency(order.total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Shipping Address */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-gray-500" />
                Shipping Address
              </h3>
              <div className="space-y-2">
                <p className="font-medium text-gray-900">{order.shippingAddress.fullName}</p>
                <p className="text-gray-700">{order.shippingAddress.street}</p>
                <p className="text-gray-700">
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                </p>
                <p className="text-gray-700">{order.shippingAddress.country}</p>
                <div className="flex items-center mt-3 pt-3 border-t border-gray-200">
                  <Phone className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="text-gray-700">{order.shippingAddress.phone}</span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-gray-500" />
                Payment Method
              </h3>
              <div className="space-y-2">
                <p className="font-medium text-gray-900 capitalize">{order.paymentMethod.type}</p>
                {order.paymentMethod.last4 && (
                  <p className="text-gray-700">•••• •••• •••• {order.paymentMethod.last4}</p>
                )}
              </div>
            </div>

            {/* Delivery Driver */}
            {(order as any).deliveryPerson?.name && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Truck className="w-5 h-5 mr-2 text-teal-600" />
                  Delivery Driver
                </h3>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div
                    style={{
                      width: "3rem",
                      height: "3rem",
                      borderRadius: "9999px",
                      backgroundColor: "#0d9488",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: "1rem",
                      flexShrink: 0,
                    }}
                  >
                    {(order as any).deliveryPerson.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{(order as any).deliveryPerson.name}</p>
                    {(order as any).deliveryPerson.phone && (
                      <div className="flex items-center mt-1">
                        <Phone className="w-3.5 h-3.5 mr-1 text-gray-400" />
                        <span className="text-sm text-gray-700">{(order as any).deliveryPerson.phone}</span>
                      </div>
                    )}
                    {(order as any).deliveryPerson.vehicle && (
                      <p className="text-sm text-gray-500 mt-0.5">Vehicle: {(order as any).deliveryPerson.vehicle}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Tracking */}
            {order.trackingNumber && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Truck className="w-5 h-5 mr-2 text-gray-500" />
                  Tracking
                </h3>
                <div className="space-y-2">
                  <p className="font-medium text-gray-900">{order.trackingNumber}</p>
                  <button 
                    onClick={handleTrackPackage}
                    className="w-full mt-3 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                  >
                    Track Package
                  </button>
                </div>
              </div>
            )}

            {/* Actions */}
            {(order.status === 'pending' || order.status === 'confirmed') && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
                <button
                  onClick={() => setShowCancelDialog(true)}
                  className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
                >
                  Cancel Order
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cancel Order Dialog */}
      {showCancelDialog && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            zIndex: 50,
          }}
          onClick={() => setShowCancelDialog(false)}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "0.75rem",
              boxShadow: "0 20px 25px -5px rgba(0,0,0,.1), 0 8px 10px -6px rgba(0,0,0,.1)",
              width: "100%",
              maxWidth: "28rem",
              padding: "1.5rem",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
              <AlertTriangle style={{ width: "1.5rem", height: "1.5rem", color: "#f97316", marginRight: "0.75rem", flexShrink: 0 }} />
              <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#111827" }}>Cancel Order</h3>
            </div>
            <p style={{ color: "#374151", marginBottom: "1rem", fontSize: "0.875rem", lineHeight: 1.5 }}>
              Are you sure you want to cancel this order? This action cannot be undone.
            </p>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "#374151", marginBottom: "0.5rem" }}>
                Reason for cancellation *
              </label>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="e.g., Changed my mind, wrong item ordered..."
                rows={3}
                style={{
                  width: "100%",
                  padding: "0.625rem 0.75rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.5rem",
                  fontSize: "0.875rem",
                  resize: "none",
                  outline: "none",
                  boxSizing: "border-box",
                  color: "#111827",
                }}
              />
            </div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                onClick={() => setShowCancelDialog(false)}
                style={{
                  flex: 1,
                  padding: "0.625rem 1rem",
                  border: "1px solid #d1d5db",
                  color: "#374151",
                  borderRadius: "0.5rem",
                  backgroundColor: "#fff",
                  cursor: "pointer",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                }}
              >
                Keep Order
              </button>
              <button
                onClick={handleCancelOrder}
                disabled={cancelling || !cancelReason.trim()}
                style={{
                  flex: 1,
                  padding: "0.625rem 1rem",
                  backgroundColor: cancelling || !cancelReason.trim() ? "#fca5a5" : "#dc2626",
                  color: "#fff",
                  border: "none",
                  borderRadius: "0.5rem",
                  cursor: cancelling || !cancelReason.trim() ? "not-allowed" : "pointer",
                  opacity: cancelling || !cancelReason.trim() ? 0.6 : 1,
                  fontWeight: 500,
                  fontSize: "0.875rem",
                }}
              >
                {cancelling ? 'Cancelling...' : 'Cancel Order'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}