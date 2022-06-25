import { Box, Tab, Tabs } from '@mui/material';
import { List, TabPanel } from 'common/components';
import { DayToStopMap, Trip } from 'common/types';
import { Entry } from 'common/types/misc';
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
                </TabPanel>
            ))}
        </Box>
    );
};
