import React from "react";
import { Container, LoadingOverlay, NavBar } from "components";

export type LayoutProps = {
  children: React.ReactNode;
  loading?: boolean;
};

export function AuthLayout({ children, loading }: LayoutProps) {
  return (
    <>
      <NavBar />
      <Container>{children}</Container>
      <LoadingOverlay loading={loading} />
    </>
  );
}
