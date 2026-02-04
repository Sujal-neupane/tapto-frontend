"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAdminOrders, updateAdminOrderStatus, AdminOrder } from "@/lib/api/admin";
import { toast } from "react-toastify";
import {
  ShoppingBag,
  Search,
  RefreshCw,
  Eye,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Package,
  DollarSign,
  User,
  MapPin,
} from "lucide-react";
import Link from "next/link";

const AdminOrdersPage = () => {
  const router = useRouter();
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await getAdminOrders();
      if (response.success) {
        setOrders(response.data);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    setUpdatingStatus(orderId);
    try {
      await updateAdminOrderStatus(orderId, newStatus);
      toast.success("Order status updated successfully");
      fetchOrders(); // Refresh the list
    } catch (error: any) {
      toast.error(error.message || "Failed to update order status");
    } finally {
      setUpdatingStatus(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-purple-100 text-purple-800';
      case 'shipped':
        return 'bg-indigo-100 text-indigo-800';
      case 'outfordelivery':
        return 'bg-orange-100 text-orange-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'processing':
        return <RefreshCw className="w-4 h-4" />;
      case 'shipped':
        return <Truck className="w-4 h-4" />;
      case 'outfordelivery':
        return <Package className="w-4 h-4" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      case 'refunded':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userId?.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "pending", label: "Pending" },
    { value: "confirmed", label: "Confirmed" },
    { value: "processing", label: "Processing" },
    { value: "shipped", label: "Shipped" },
    { value: "outForDelivery", label: "Out for Delivery" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" },
    { value: "refunded", label: "Refunded" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900">Orders Management</h1>
                  <p className="text-sm text-slate-600">Manage customer orders and track deliveries</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={fetchOrders}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                title="Refresh"
              >
                <RefreshCw className="w-5 h-5 text-slate-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="p-6 border-b border-slate-200 bg-white">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by order ID, customer name, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-500"
              />
            </div>
          </div>
          <div className="sm:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="p-6">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order._id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
                {/* Order Header */}
                <div className="p-6 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Package className="w-5 h-5 text-slate-600" />
                        <span className="font-semibold text-slate-900">Order #{order._id.slice(-8)}</span>
                      </div>
                      <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-600">Order Date</div>
                      <div className="font-medium text-slate-900">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Content */}
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Customer Info */}
                    <div>
                      <h3 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Customer
                      </h3>
                      <div className="space-y-1 text-sm">
                        <div className="font-medium text-slate-900">{order.userId?.name || 'Unknown User'}</div>
                        <div className="text-slate-600">{order.userId?.email || 'No email'}</div>
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div>
                      <h3 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Shipping Address
                      </h3>
                      <div className="text-sm text-slate-600">
                        <div>{order.shippingAddress.fullName}</div>
                        <div>{order.shippingAddress.street}</div>
                        <div>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</div>
                        <div>{order.shippingAddress.country}</div>
                        <div className="text-xs text-slate-500 mt-1">{order.shippingAddress.phone}</div>
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div>
                      <h3 className="font-medium text-slate-900 mb-3">Order Summary</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Items:</span>
                          <span className="font-medium">{order.items.length}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Payment:</span>
                          <span className="font-medium">
                            {order.paymentMethod ? `${order.paymentMethod.type} ****${order.paymentMethod.last4}` : 'N/A'}
                          </span>
                        </div>
                        <div className="flex justify-between text-lg font-bold text-slate-900 border-t border-slate-200 pt-2">
                          <span>Total:</span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {order.total?.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Items Preview */}
                  <div className="mt-6">
                    <h3 className="font-medium text-slate-900 mb-3">Items</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {order.items.slice(0, 3).map((item, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                          <img
                            src={item.productImage ? `http://localhost:4000${item.productImage}` : '/default-avatar.svg'}
                            alt={item.productName || 'Product'}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-slate-900 truncate">{item.productName || 'Unknown Product'}</div>
                            <div className="text-sm text-slate-600">Qty: {item.quantity} × ${item.price.toFixed(2)}</div>
                          </div>
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <div className="flex items-center justify-center p-3 bg-slate-50 rounded-lg text-slate-600 text-sm">
                          +{order.items.length - 3} more items
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/orders/${order._id}`}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </Link>
                    </div>

                    {/* Status Update */}
                    <div className="flex items-center gap-2">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                        disabled={updatingStatus === order._id}
                        className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm text-slate-900 disabled:opacity-50"
                      >
                        <option value="Order Placed">Order Placed</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      {updatingStatus === order._id && (
                        <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No orders found</h3>
            <p className="text-slate-600">
              {searchTerm || statusFilter !== "all" ? 'Try adjusting your search or filter criteria.' : 'Orders will appear here when customers place them.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrdersPage;