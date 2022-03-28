import React from "react";
import { Container, NavBar } from "components";

export type LayoutProps = {
  children: React.ReactNode;
};

export function AuthLayout({ children }: LayoutProps) {
  return (
    <>
      <NavBar />
      <Container>{children}</Container>
    </>
  );
}
