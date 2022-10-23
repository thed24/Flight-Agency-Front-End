/* eslint-disable no-empty-pattern */
import { Box, Tab, Tabs } from '@mui/material';
import { List, TabPanel } from 'common/components';
import { Button } from 'common/components/common.styles';
import { useUser } from 'common/context';
import { DayToStopMap, Trip } from 'common/types';
import { DownloadTripEndpoint, httpClient } from 'common/utilities';
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
    const { user } = useUser();
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
        const { data } = await httpClient.post<string>(
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
        <Box sx={{ height: '64vh', maxWidth: '50vw' }}>
            <Box
                sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    margin: 'auto',
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
                        subTitle={new Date(
                            trip.stops[0].time.start
                        ).toLocaleDateString()}
                        entries={entries}
                        verticle
                    />
                    <Button
                        variant="contained"
                        sx={{ marginTop: '5px' }}
                        onClick={() =>
                            downloadTrip(user?.id ?? '', trip.id.toString())
                        }
                    >
                        Save Trip
                    </Button>
                </TabPanel>
            ))}
        </Box>
    );
};
