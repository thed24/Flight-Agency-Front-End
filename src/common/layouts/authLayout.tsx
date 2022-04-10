import React from "react";
import { SC, LoadingOverlay, NavBar } from "common/components";

export type LayoutProps = {
  children: React.ReactNode;
  loading?: boolean;
};

export function AuthLayout({ children, loading }: LayoutProps) {
  return (
    <>
      <NavBar />
      <LoadingOverlay loading={loading} />
      <SC.Container>{children}</SC.Container>
    </>
  );
}
