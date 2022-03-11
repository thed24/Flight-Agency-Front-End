import React from "react";
import { NavBar } from "../../";
import styles from "./authLayout.module.css";

export type LayoutProps = {
  children: React.ReactNode;
};

export function AuthLayout({ children }: LayoutProps) {
  return (
    <>
      <NavBar />
      <div className={styles.container}>{children}</div>
    </>
  );
}
