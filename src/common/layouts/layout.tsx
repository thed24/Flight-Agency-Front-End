import React from "react";
import { signIn, useSession } from "next-auth/react";
import { User } from "common/types";
import { getFromStorage } from "common/utilities";
import {
  Container,
  LoadingOverlay,
  NavBar,
  SubTitle,
  Title,
} from "common/components";

export type LayoutProps = {
  children: React.ReactNode;
  loading?: boolean;
};

export function Layout({ children, loading }: LayoutProps) {
  const { data: session, status } = useSession();

  const handleSignIn = async () => {
    await signIn("google");
  };

  const authMessage = (
    <Container>
      <Title> Welcome to the Flight Agency </Title>
      <SubTitle onClick={handleSignIn}>
        Please login or register to continue
      </SubTitle>
    </Container>
  );

  return (
    <>
      <NavBar />
      <LoadingOverlay loading={loading || status === "loading"} />
      {session ? children : authMessage}
    </>
  );
}
