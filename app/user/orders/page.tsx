"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/context/auth-context";
import Link from "next/link";
import {
  Package,
  Eye,
  ArrowLeft,
  Filter,
  ShoppingBag,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  RotateCcw,
  AlertTriangle,
  Search,
  X
} from "lucide-react";
import { getMyOrders, cancelOrder, Order } from "@/lib/api/orders";
import { toast } from "react-toastify";
import { useCurrency } from "@/lib/hooks/useCurrency";

export default function UserOrdersPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const { format: formatCurrency } = useCurrency();
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Active' | 'Delivered' | 'Cancelled'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [cancellingOrderId, setCancellingOrderId] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const fetchedOrders = await getMyOrders();
        setOrders(fetchedOrders);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
        setError('Failed to load orders. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  useEffect(() => {
    let filtered = orders;

    // Apply status filter
    if (selectedFilter !== 'All') {
      filtered = orders.filter(order => {
        switch (selectedFilter) {
          case 'Active':
            return ['pending', 'confirmed', 'processing', 'shipped', 'outForDelivery'].includes(order.status);
          case 'Delivered':
            return order.status === 'delivered';
          case 'Cancelled':
            return order.status === 'cancelled' || order.status === 'refunded';
          default:
            return true;
        }
      });
    }

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(order =>
        order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.items.some(item => item.productName.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredOrders(filtered);
  }, [orders, selectedFilter, searchQuery]);

  const handleCancelOrder = async () => {
    if (!cancellingOrderId || !cancelReason.trim()) {
      toast.error("Please provide a reason for cancellation");
      return;
    }

    try {
      await cancelOrder(cancellingOrderId, cancelReason);
      toast.success("Order cancelled successfully");

      // Update local state
      setOrders(prev => prev.map(order =>
        order._id === cancellingOrderId
          ? { ...order, status: 'cancelled' as const }
          : order
      ));

      setShowCancelDialog(false);
      setCancellingOrderId(null);
      setCancelReason('');
    } catch (err) {
      console.error('Failed to cancel order:', err);
      toast.error("Failed to cancel order. Please try again.");
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

  const filterOptions = [
    { key: 'All', label: 'All Orders', count: orders.length },
    { key: 'Active', label: 'Active', count: orders.filter(o => ['pending', 'confirmed', 'processing', 'shipped', 'outForDelivery'].includes(o.status)).length },
    { key: 'Delivered', label: 'Delivered', count: orders.filter(o => o.status === 'delivered').length },
    { key: 'Cancelled', label: 'Cancelled', count: orders.filter(o => o.status === 'cancelled' || o.status === 'refunded').length },
  ] as const;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-primary-50 to-primary-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-primary-600 hover:text-primary-800 mb-4 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back 
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
              <p className="text-gray-600 mt-2">{orders.length} total orders</p>
            </div>
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-full sm:w-64"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setSelectedFilter(filter.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedFilter === filter.key
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-primary-300 hover:bg-primary-50'
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
                <div className="flex items-center justify-between mb-4">
                  <div className="space-y-2">
                    <div className="h-5 bg-gray-200 rounded w-32" />
                    <div className="h-4 bg-gray-200 rounded w-24" />
                  </div>
                  <div className="h-6 bg-gray-200 rounded-full w-20" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {searchQuery ? 'No orders found' : 'No orders yet'}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchQuery ? 'Try adjusting your search terms' : 'Start shopping to see your orders here'}
            </p>
            {!searchQuery && (
              <Link
                href="/dashboard"
                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 inline-block"
              >
                Start Shopping
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const statusConfig = getStatusConfig(order.status);
              const StatusIcon = statusConfig.icon;
              const canCancel = order.status === 'pending' || order.status === 'confirmed';

              return (
                <div key={order._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                        <Package className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Order #{order._id.slice(-6)}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {new Date(order.createdAt).toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    <div className={`inline-flex items-center px-3 py-1 rounded-lg border text-sm font-medium ${statusConfig.color}`}>
                      <StatusIcon className="w-4 h-4 mr-1.5" />
                      {statusConfig.label}
                    </div>
                  </div>

                  {/* Order Items Preview */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-700">
                        {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                      </span>
                      <span className="text-lg font-bold text-primary-600">{formatCurrency(order.total)}</span>
                    </div>
                    <div className="space-y-2">
                      {order.items.slice(0, 2).map((item, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-1 h-1 bg-gray-400 rounded-full" />
                          <span className="text-sm text-gray-700">
                            {item.quantity}x {item.productName}
                          </span>
                        </div>
                      ))}
                      {order.items.length > 2 && (
                        <div className="flex items-center space-x-3">
                          <div className="w-1 h-1 bg-primary-400 rounded-full" />
                          <span className="text-sm text-primary-600 font-medium">
                            +{order.items.length - 2} more item{order.items.length - 2 !== 1 ? 's' : ''}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      {order.trackingNumber && (
                        <span className="flex items-center">
                          <Truck className="w-4 h-4 mr-1" />
                          Tracking: {order.trackingNumber}
                        </span>
                      )}
                    </div>
                    <div className="flex space-x-3">
                      <Link
                        href={`/orders/${order._id}`}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Link>
                      {canCancel && (
                        <button
                          onClick={() => {
                            setCancellingOrderId(order._id);
                            setShowCancelDialog(true);
                          }}
                          className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
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
          onClick={() => { setShowCancelDialog(false); setCancellingOrderId(null); setCancelReason(''); }}
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
            <p style={{ color: "#4b5563", marginBottom: "1rem", fontSize: "0.875rem", lineHeight: 1.5 }}>
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
                onClick={() => {
                  setShowCancelDialog(false);
                  setCancellingOrderId(null);
                  setCancelReason('');
                }}
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
                disabled={!cancelReason.trim()}
                style={{
                  flex: 1,
                  padding: "0.625rem 1rem",
                  backgroundColor: !cancelReason.trim() ? "#fca5a5" : "#dc2626",
                  color: "#fff",
                  border: "none",
                  borderRadius: "0.5rem",
                  cursor: !cancelReason.trim() ? "not-allowed" : "pointer",
                  opacity: !cancelReason.trim() ? 0.6 : 1,
                  fontWeight: 500,
                  fontSize: "0.875rem",
                }}
              >
                Cancel Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}