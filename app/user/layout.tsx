import UserRoute from '@/lib/components/UserRoute';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <UserRoute>{children}</UserRoute>;
}
