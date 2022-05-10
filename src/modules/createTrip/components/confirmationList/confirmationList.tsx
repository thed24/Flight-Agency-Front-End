import { Typography } from '@mui/material';
import { Container } from 'common/components/common.styles';
import { Trip } from 'common/types';

interface Props {
    trip: Trip;
}
export const ConfirmationList = ({ trip }: Props) => (
    <Container
        style={{
            paddingTop: '20px',
            paddingBottom: '20px',
            textAlign: 'center',
        }}
    >
        {trip.stops.map((stop) => (
            <>
                <Typography variant="h5">{stop.name}</Typography>
                <Typography variant="subtitle2">
                    From {new Date(stop.time.start).toLocaleDateString()} to{' '}
                    {new Date(stop.time.end).toLocaleDateString()}
                </Typography>

                <Typography variant="subtitle2"> At {stop.address}</Typography>
            </>
        ))}
    </Container>
);
