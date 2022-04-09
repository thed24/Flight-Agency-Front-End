import React, { useMemo } from "react";

import { useSession } from "next-auth/react";
import { AuthMessage, LoadingOverlay, NavBar } from "common/components";

export type LayoutProps = {
  children: React.ReactNode;
  loading?: boolean;
};

export function Layout({ children, loading }: LayoutProps) {
  const { data: session, status } = useSession();

  const isLoading = useMemo(
    () => loading || status === "loading",
    [loading, status]
  );

  if (isLoading) {
    return <LoadingOverlay loading={isLoading} />;
  }

  return (
    <>
      <NavBar />
      {session ? children : <AuthMessage />}
    </>
  );
}
