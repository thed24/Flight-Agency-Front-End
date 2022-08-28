import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';

export type Props = {
    loading?: boolean;
};

const LoadingOverlayInternal = React.memo(({ loading = false }: Props) => (
    <Backdrop
        sx={{
            color: '#fff',
            zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading ?? false}
    >
        <CircularProgress size={100} color="secondary" />
    </Backdrop>
));

LoadingOverlayInternal.displayName = 'LoadingOverlay';
export const LoadingOverlay = LoadingOverlayInternal;
