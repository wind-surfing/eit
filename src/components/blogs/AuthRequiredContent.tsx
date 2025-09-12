"use client";

import useUser from "@/hooks/useUser";

interface AuthRequiredContentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function AuthRequiredContent({
  children,
  fallback,
}: AuthRequiredContentProps) {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const isAuthorized = user && user.role !== "guest";

  if (!isAuthorized) {
    return (
      <div className="rounded-lg border border-primary/20 bg-primary/10 p-6 text-center">
        <h3 className="mb-2 text-lg font-semibold text-foreground">
          Authentication Required
        </h3>
        <p className="text-muted-foreground">
          You need to be logged in with member access or higher to view this
          content.
        </p>
        {fallback && <div className="mt-4">{fallback}</div>}
      </div>
    );
  }

  return <>{children}</>;
}
