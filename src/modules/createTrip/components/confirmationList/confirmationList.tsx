import { Typography } from '@mui/material';
import { Container } from 'common/components/common.styles';
import { DayToStopMap, Stop, Trip } from 'common/types';

interface Props {
    trip: Trip;
}

export const ConfirmationList = ({ trip }: Props) => {
    const dayToStopMap = DayToStopMap(trip.stops);

    return (
        <Container
            style={{
                paddingBottom: '20px',
                textAlign: 'center',
            }}
        >
            {Object.keys(dayToStopMap).map((day: string) => (
                <>
                    <Typography variant="h4">Day {Number(day) + 1}</Typography>
                    {dayToStopMap[day].map((stop: Stop) => (
                        <>
                            <Typography variant="h5">{stop.name}</Typography>
                            <Typography variant="subtitle2">
                                From{' '}
                                {new Date(stop.time.start).toLocaleDateString()}{' '}
                                to{' '}
                                {new Date(stop.time.end).toLocaleDateString()}
                            </Typography>

                            <Typography variant="subtitle2">
                                At {stop.address}
                            </Typography>
                        </>
                    ))}
                </>
            ))}
        </Container>
    );
};
