/* eslint-disable no-empty-pattern */
import { Box, Tab, Tabs } from '@mui/material';
import { List, TabPanel } from 'common/components';
import { Button } from 'common/components/common.styles';
import { DayToStopMap, Trip } from 'common/types';
import { DownloadTripEndpoint, localHttpClient } from 'common/utilities';
import { useSession } from 'next-auth/react';
import * as React from 'react';
import { useMemo, useState } from 'react';

interface Props {
    trips: Trip[];
}

function propGenerator(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const ScrollableTrips = ({ trips }: Props) => {
    const [value, setValue] = useState(0);
    const { data: session } = useSession();
    const stopsForDay = DayToStopMap(trips[value].stops);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const entries = useMemo(
        () =>
            Object.entries(stopsForDay).map(([day, stops]) => [
                {
                    header: `Day ${parseInt(day, 10) + 1}`,
                    content: '',
                    id: 0,
                },
                ...stops.map((stop) => ({
                    id: stop.id,
                    header: `${stop.name}`,
                    content: `${new Date(
                        stop.time.start
                    ).toLocaleTimeString()} to ${new Date(
                        stop.time.end
                    ).toLocaleTimeString()}`,
                })),
            ]),
        [stopsForDay]
    );

    const downloadTrip = async (userId: string, tripId: string) => {
        const { data } = await localHttpClient.post<string>(
            DownloadTripEndpoint(userId, tripId)
        );
        const element = document.createElement('a');
        const file = new Blob([data], {
            type: 'text/plain',
        });
        element.href = URL.createObjectURL(file);
        element.download = `trip-${tripId}.ics`;
        document.body.appendChild(element);
        element.click();
    };

    return (
        <Box sx={{ height: '65vh', maxWidth: '50%' }}>
            <Box
                sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    margin: 'auto',
                    width: '50%',
                }}
            >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                    aria-label="scrollable trip view"
                >
                    {trips.map((trip, i) => (
                        <Tab
                            key={trip.id}
                            label={`${trip.destination}, ${trip.stops.length} Stops`}
                            {...propGenerator(i)}
                        />
                    ))}
                </Tabs>
            </Box>

            {trips.map((trip, i) => (
                <TabPanel key={trip.id} value={value} index={i}>
                    <List
                        title={`${trip.destination}`}
                        entries={entries}
                        verticle
                    />
                    <Button
                        onClick={() =>
                            downloadTrip(
                                session?.user?.id ?? '',
                                trip.id.toString()
                            )
                        }
                        style={{ marginLeft: '32%' }}
                    >
                        Save Trip
                    </Button>
                </TabPanel>
            ))}
        </Box>
    );
};
