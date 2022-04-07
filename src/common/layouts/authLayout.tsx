import React from "react";
import { Container, LoadingOverlay, NavBar } from "common/components";

export type LayoutProps = {
  children: React.ReactNode;
  loading?: boolean;
};

export function AuthLayout({ children, loading }: LayoutProps) {
  return (
    <>
      <NavBar />
      <LoadingOverlay loading={loading} />
      <Container>{children}</Container>
    </>
  );
}
