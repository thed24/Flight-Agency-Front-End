import { Container, SubTitle } from 'common/components';
import { Entry } from 'common/types/misc';
import { ScrollableStops } from 'modules/createTrip/components';
import { useTrip } from 'modules/createTrip/context';
import { useMemo, useState } from 'react';

export const ConfirmationStep = () => {
    const [index, setIndex] = useState<number>(0);
    const { trip, dayToStopMap } = useTrip();

    const entries = useMemo(() => {
        const stopsForDay = Object.values(dayToStopMap)[index] ?? [];

        return stopsForDay.map((stop) => [
            {
                id: stop.id,
                header: `${stop.name}`,
                content: `${new Date(
                    stop.time.start
                ).toLocaleTimeString()} to ${new Date(
                    stop.time.end
                ).toLocaleTimeString()}`,
            } as Entry,
        ]);
    }, [dayToStopMap, index]);

    return (
        <Container>
            <SubTitle marginBottom={2}>
                Your current trip itinary for your trip to {trip.destination}
            </SubTitle>

            <ScrollableStops
                setIndex={setIndex}
                index={index}
                dayToStopsMap={dayToStopMap}
                entries={entries}
            />
        </Container>
    );
};
