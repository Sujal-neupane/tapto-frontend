"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getAdminOrderById, updateAdminOrderStatus, AdminOrder } from "@/lib/api/admin";
import { toast } from "react-toastify";
import {
  ShoppingBag,
  ArrowLeft,
  User,
  MapPin,
  CreditCard,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Package,
  DollarSign,
  Calendar,
  RefreshCw,
  Eye,
} from "lucide-react";
import Link from "next/link";

const AdminOrderDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const orderId = params.id as string;

  const [order, setOrder] = useState<AdminOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      const response = await getAdminOrderById(orderId);
      if (response.success) {
        setOrder(response.data);
      } else {
        toast.error("Order not found");
        router.push("/admin/orders");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch order details");
      router.push("/admin/orders");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus: string) => {
    if (!order) return;

    setUpdatingStatus(true);
    try {
      await updateAdminOrderStatus(order._id, newStatus);
      toast.success("Order status updated successfully");
      // Update local state
      setOrder(prev => prev ? { ...prev, status: newStatus as any } : null);
    } catch (error: any) {
      toast.error(error.message || "Failed to update order status");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'order placed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'confirmed':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'shipped':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'order placed':
        return <Clock className="w-5 h-5" />;
      case 'confirmed':
        return <CheckCircle className="w-5 h-5" />;
      case 'shipped':
        return <Truck className="w-5 h-5" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <RefreshCw className="w-6 h-6 animate-spin text-indigo-600" />
          <span className="text-slate-600">Loading order details...</span>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">Order not found</h3>
          <Link
            href="/admin/orders"
            className="text-indigo-600 hover:text-indigo-700"
          >
            Back to orders
          </Link>
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
                href="/admin/orders"
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900">Order Details</h1>
                  <p className="text-sm text-slate-600">Order #{order._id.slice(-8)}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${getStatusColor(order.status)}`}>
                {getStatusIcon(order.status)}
                <span className="font-medium">{order.status}</span>
              </div>
              <select
                value={order.status}
                onChange={(e) => handleStatusUpdate(e.target.value)}
                disabled={updatingStatus}
                className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm text-slate-900 disabled:opacity-50"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="confirmed">Confirmed</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              {updatingStatus && (
                <RefreshCw className="w-5 h-5 animate-spin text-indigo-600" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Order Summary */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Order Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-slate-600" />
                <div>
                  <div className="text-sm text-slate-600">Order Date</div>
                  <div className="font-medium text-slate-900">{formatDate(order.createdAt)}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-slate-600" />
                <div>
                  <div className="text-sm text-slate-600">Payment Method</div>
                  <div className="font-medium text-slate-900">
                    {order.paymentMethod ? `${order.paymentMethod.type} ending in ****${order.paymentMethod.last4}` : 'N/A'}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-slate-600" />
                <div>
                  <div className="text-sm text-slate-600">Total Amount</div>
                  <div className="font-bold text-slate-900 text-lg">${order.total?.toFixed(2)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Customer & Shipping */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Customer Information */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                Customer Information
              </h2>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-slate-600">Full Name</div>
                  <div className="font-medium text-slate-900">{order.userId?.name || 'Unknown User'}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-600">Email</div>
                  <div className="font-medium text-slate-900">{order.userId?.email || 'No email'}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-600">User ID</div>
                  <div className="font-mono text-sm text-slate-700">{order.userId?._id || 'N/A'}</div>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Shipping Address
              </h2>
              <div className="space-y-1 text-slate-700">
                <div className="font-medium">{order.shippingAddress.fullName}</div>
                <div>{order.shippingAddress.street}</div>
                <div>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</div>
                <div>{order.shippingAddress.country}</div>
                <div className="text-sm text-slate-600 mt-2">Phone: {order.shippingAddress.phone}</div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg">
                  <img
                    src={item.productImage ? `http://localhost:4000${item.productImage}` : '/default-avatar.svg'}
                    alt={item.productName || 'Product'}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-slate-900">{item.productName || 'Unknown Product'}</h3>
                    <p className="text-sm text-slate-600">Product ID: {item.productId?.slice(-8) || 'N/A'}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-600">Quantity: {item.quantity}</div>
                    <div className="font-medium text-slate-900">${item.price.toFixed(2)} each</div>
                    <div className="font-bold text-slate-900">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Total */}
            <div className="mt-6 pt-4 border-t border-slate-200">
              <div className="flex justify-end">
                <div className="w-64">
                  <div className="flex justify-between text-sm text-slate-600 mb-2">
                    <span>Subtotal ({order.items.length} items)</span>
                    <span>${order.total?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-slate-900 pt-2 border-t border-slate-200">
                    <span>Total</span>
                    <span>${order.total?.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tracking History */}
          {order.tracking && order.tracking.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Tracking History
              </h2>
              <div className="space-y-4">
                {order.tracking.map((track, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      track.status.toLowerCase().includes('delivered') ? 'bg-green-100 text-green-600' :
                      track.status.toLowerCase().includes('shipped') ? 'bg-purple-100 text-purple-600' :
                      track.status.toLowerCase().includes('confirmed') ? 'bg-yellow-100 text-yellow-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {track.status.toLowerCase().includes('delivered') ? <CheckCircle className="w-5 h-5" /> :
                       track.status.toLowerCase().includes('shipped') ? <Truck className="w-5 h-5" /> :
                       <Clock className="w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-slate-900">{track.status}</div>
                      <div className="text-sm text-slate-600">{track.description}</div>
                      <div className="text-xs text-slate-500 mt-1">{formatDate(track.timestamp)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetailsPage;