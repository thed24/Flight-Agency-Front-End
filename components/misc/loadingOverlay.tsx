import { Backdrop, CircularProgress } from "@mui/material";

export type Props = {
  loading?: boolean;
};

export const LoadingOverlay = ({ loading }: Props) => (
  <Backdrop
    sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={loading ?? false}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
);
