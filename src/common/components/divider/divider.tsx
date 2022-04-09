import { Container } from "common/components";
import { Divider as MuiDivider } from "@mui/material";

export function Divider() {
  return (
    <Container style={{ marginTop: "20px", marginBottom: "20px" }}>
      <MuiDivider />
    </Container>
  );
}
