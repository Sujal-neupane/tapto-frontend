"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/context/auth-context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Settings, ArrowLeft, Bell, Shield, User, Palette, X, Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import axiosInstance from "@/lib/api/axios";

export default function UserSettingsPage() {
  const { user, isLoading: authLoading, logout } = useAuth();
  const router = useRouter();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: false,
    theme: 'light',
    language: 'en',
  });

  // Change password modal state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Delete account modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value,
    }));
    toast.success('Settings updated');
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
          <Settings className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-600">Please login to access settings</h2>
          <Link href="/auth/login" className="text-primary-600 hover:underline mt-2 inline-block">
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-primary-50 to-primary-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/user"
            className="inline-flex items-center text-primary-600 hover:text-primary-800 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account preferences and settings</p>
        </div>

        <div className="space-y-6">
          {/* Profile Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <User className="w-5 h-5 text-primary-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Profile Settings</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue={user.fullName}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue={user.email}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  defaultValue={user.phoneNumber}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Bell className="w-5 h-5 text-primary-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Email Notifications</h4>
                  <p className="text-sm text-gray-600">Receive order updates and important notifications</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Push Notifications</h4>
                  <p className="text-sm text-gray-600">Get notified about new products and offers</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.pushNotifications}
                    onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Marketing Emails</h4>
                  <p className="text-sm text-gray-600">Receive promotional emails and newsletters</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.marketingEmails}
                    onChange={(e) => handleSettingChange('marketingEmails', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Appearance Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Palette className="w-5 h-5 text-primary-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Appearance</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Theme
                </label>
                <select
                  value={settings.theme}
                  onChange={(e) => handleSettingChange('theme', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language
                </label>
                <select
                  value={settings.language}
                  onChange={(e) => handleSettingChange('language', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Shield className="w-5 h-5 text-primary-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Security</h3>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => setShowPasswordModal(true)}
                className="w-full text-left px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                <div className="font-medium text-gray-900">Change Password</div>
                <div className="text-sm text-gray-600">Update your account password</div>
              </button>

              <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors opacity-60 cursor-not-allowed">
                <div className="font-medium text-gray-900">Two-Factor Authentication</div>
                <div className="text-sm text-gray-600">Coming soon — Add an extra layer of security</div>
              </button>

              <button
                onClick={() => setShowDeleteModal(true)}
                className="w-full text-left px-4 py-3 border border-red-300 rounded-md hover:bg-red-50 transition-colors"
              >
                <div className="font-medium text-red-900">Delete Account</div>
                <div className="text-sm text-red-600">Permanently delete your account and data</div>
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              Save Changes
            </button>
          </div>
        </div>

        {/* Change Password Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Change Password</h2>
                <button onClick={() => setShowPasswordModal(false)} className="p-2 rounded-lg hover:bg-gray-100 transition">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
                    toast.error('Passwords do not match');
                    return;
                  }
                  if (passwordForm.newPassword.length < 6) {
                    toast.error('Password must be at least 6 characters');
                    return;
                  }
                  setPasswordLoading(true);
                  try {
                    await axiosInstance.put('/api/auth/change-password', {
                      currentPassword: passwordForm.currentPassword,
                      newPassword: passwordForm.newPassword,
                    });
                    toast.success('Password changed successfully');
                    setShowPasswordModal(false);
                    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                  } catch (err: any) {
                    toast.error(err.response?.data?.message || 'Failed to change password');
                  } finally {
                    setPasswordLoading(false);
                  }
                }}
                className="p-6 space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      required
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      required
                      minLength={6}
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    required
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(false)}
                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={passwordLoading}
                    className="flex-1 px-4 py-2.5 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition disabled:opacity-60"
                  >
                    {passwordLoading ? 'Changing...' : 'Change Password'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Account Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-red-600">Delete Account</h2>
                <button onClick={() => setShowDeleteModal(false)} className="p-2 rounded-lg hover:bg-gray-100 transition">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-sm text-red-800">
                    <strong>Warning:</strong> This action is permanent and cannot be undone. All your data, orders, and preferences will be deleted.
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type <strong>DELETE</strong> to confirm
                  </label>
                  <input
                    type="text"
                    value={deleteConfirmText}
                    onChange={(e) => setDeleteConfirmText(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                    placeholder="DELETE"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => { setShowDeleteModal(false); setDeleteConfirmText(''); }}
                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={deleteConfirmText !== 'DELETE' || deleteLoading}
                    onClick={async () => {
                      setDeleteLoading(true);
                      try {
                        await axiosInstance.delete('/api/auth/delete-account');
                        toast.success('Account deleted');
                        logout();
                        router.push('/landingpage');
                      } catch (err: any) {
                        toast.error(err.response?.data?.message || 'Failed to delete account');
                      } finally {
                        setDeleteLoading(false);
                      }
                    }}
                    className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {deleteLoading ? 'Deleting...' : 'Delete Account'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}