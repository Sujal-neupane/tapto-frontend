import AdminRoute from '@/lib/components/AdminRoute';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminRoute>{children}</AdminRoute>;
}
