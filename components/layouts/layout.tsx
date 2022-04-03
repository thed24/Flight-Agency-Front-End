import React from "react";
import { User } from "types";
import { getFromStorage } from "utilities";
import { Container, LoadingOverlay, NavBar, SubTitle, Title } from "components";

export type LayoutProps = {
  children: React.ReactNode;
  loading?: boolean;
};

export function Layout({ children, loading }: LayoutProps) {
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
      <LoadingOverlay loading={loading} />
      {loggedInUser ? children : authMessage}
    </>
  );
}
