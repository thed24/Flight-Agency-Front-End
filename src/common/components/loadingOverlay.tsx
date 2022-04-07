import { Backdrop, CircularProgress, Skeleton } from "@mui/material";

export type Props = {
  loading?: boolean;
};

export const LoadingOverlay = ({ loading }: Props) => (
  <Backdrop
    sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={loading ?? false}
  >
    <Skeleton variant="rectangular" width="100%" height="100%" />
    <CircularProgress color="inherit" />
  </Backdrop>
);
