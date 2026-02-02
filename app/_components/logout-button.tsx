"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { handleLogout } from "../../lib/actions/auth-action";
import { useAuth } from "../../lib/context/auth-context";

interface LogoutButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export default function LogoutButton({ className, children }: LogoutButtonProps) {
  const router = useRouter();
  const { logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const onLogout = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await handleLogout();
    } finally {
      logout();
      router.push("/auth/login");
      router.refresh();
      setIsLoading(false);
    }
  };

  return (
    <button onClick={onLogout} disabled={isLoading} className={className}>
      {children || (isLoading ? "Signing out..." : "Logout")}
    </button>
  );
}
