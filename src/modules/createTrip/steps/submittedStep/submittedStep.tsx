import { Typography } from '@mui/material';
import useAxios from 'axios-hooks';
import { SC } from 'common/components';
import { LoadingOverlay } from 'common/components/loadingOverlay/loadingOverlay';
import { Trip } from 'common/types';
import { CreateTripEndpoint } from 'common/utilities';
import { useTrip } from 'modules/createTrip/context';
import Link from 'next/link';
import { useEffect } from 'react';

export interface Props {
    id: string;
}

export const SubmittedStep = ({ id }: Props) => {
    const [{ loading: createLoading }, createTrip] = useAxios<Trip>(
        CreateTripEndpoint(id),
        { manual: true }
    );

    const { trip } = useTrip();

    useEffect(() => {
        if (id) createTrip({ data: trip, method: 'post' });
    }, [id]);

    if (createLoading) {
        return <LoadingOverlay loading />;
    }

    return (
        <SC.Container style={{ textAlign: 'center' }}>
            <Typography variant="h5">
                Your trip has been submitted successfully
            </Typography>
            <Typography variant="subtitle1">
                <Link href="/" passHref>
                    Head home
                </Link>
            </Typography>
        </SC.Container>
    );
};
