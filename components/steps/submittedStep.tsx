import { Typography } from "@mui/material";
import { Container } from "components";
import Link from "next/link";

export const SubmittedStep = () => {
  return (
    <Container>
      <Typography variant="h5">
        Your trip has been submitted successfully
      </Typography>
      <Typography variant="subtitle1">
        <Link href={"/"} passHref>
          Head home
        </Link>
      </Typography>
    </Container>
  );
};
