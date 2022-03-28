import style from "./layout.module.css";

import { Typography } from "@mui/material";
import React from "react";
import { User } from "../../../types/models";
import { getFromStorage } from "../../../utilities/storage";
import { Container, NavBar, SubTitle, Title } from "../../";

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
