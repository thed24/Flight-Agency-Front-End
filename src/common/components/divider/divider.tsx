import { SC } from "common/components";
import { Divider as MuiDivider } from "@mui/material";

export function Divider() {
  return (
    <SC.Container style={{ marginTop: "20px", marginBottom: "20px" }}>
      <MuiDivider />
    </SC.Container>
  );
}
