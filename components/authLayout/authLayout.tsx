import React from "react";
import NavBar from "../navbar/navbar";
import styles from "./authLayout.module.css";

export type LayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: LayoutProps) {
  return (
    <>
      <NavBar />
      <div className={styles.container}>{children}</div>
    </>
  );
}
