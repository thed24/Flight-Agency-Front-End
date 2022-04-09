import { SubTitle, Title, Container } from "common/components";
import { signIn } from "next-auth/react";

export function AuthMessage() {
  const handleSignIn = async () => {
    await signIn("google");
  };

  return (
    <Container>
      <Title> Welcome to the Flight Agency </Title>
      <SubTitle onClick={handleSignIn}>
        Please login or register to continue
      </SubTitle>
    </Container>
  );
}
