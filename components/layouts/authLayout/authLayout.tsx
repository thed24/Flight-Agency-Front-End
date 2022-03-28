import React from "react";
import { Container, NavBar } from "../../";
import styles from "./authLayout.module.css";

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
