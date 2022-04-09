import { Backdrop, CircularProgress, Skeleton } from "@mui/material";
import React from "react";

export type Props = {
  loading?: boolean;
};

export const LoadingOverlay = React.memo(function LoadingOverlay({
  loading = false,
}: Props) {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading ?? false}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
});
