import style from "./layout.module.css";

import React from "react";
import { User } from "types";
import { getFromStorage } from "utilities";
import { Container, NavBar, SubTitle, Title } from "components";

export type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  const loggedInUser = getFromStorage<User>("loggedInUser");

  const authMessage = (
    <Container>
      <Title> Welcome to the Flight Agency </Title>
      <SubTitle>Please login or register to continue</SubTitle>
    </Container>
  );

  return (
    <>
      <NavBar />
      {loggedInUser ? children : authMessage}
    </>
  );
}
