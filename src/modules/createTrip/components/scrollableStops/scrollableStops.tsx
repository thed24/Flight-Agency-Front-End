import { Box, Tab, Tabs } from '@mui/material';
import { List, TabPanel } from 'common/components';
import { Entries, Stop } from 'common/types';
import { useTrip } from 'modules/createTrip/context';
import * as React from 'react';

interface Props {
    dayToStopsMap: Record<string, Stop[]>;
    index: number;
    setIndex: (index: number) => void;
    entries: Entries[];
    deletable?: boolean | undefined;
}

function propGenerator(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const ScrollableStops = ({
    dayToStopsMap,
    index,
    setIndex,
    entries,
    deletable,
}: Props) => {
    const { removeStop } = useTrip();
    const handleIndexChange = (
        event: React.SyntheticEvent<Element, Event>,
        newValue: number
    ) => {
        setIndex(newValue);
    };

    const stopsForCurrentDay = Object.values(dayToStopsMap)[index];

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
                    value={index}
                    onChange={handleIndexChange}
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                    aria-label="scrollable trip view"
                >
                    {Object.entries(dayToStopsMap).map(([day], i) => (
                        <Tab
                            key={day.toString()}
                            label={`Day ${parseInt(day, 10) + 1}`}
                            {...propGenerator(i)}
                        />
                    ))}
                </Tabs>
            </Box>

            <TabPanel key={index} value={index} index={index}>
                <List
                    title={`Stops for ${
                        new Date(stopsForCurrentDay[0].time.start)
                            .toLocaleTimeString([], {
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric',
                            })
                            .split(',')[0]
                    }`}
                    entries={entries}
                    removeOnClick={deletable ? removeStop : undefined}
                />
            </TabPanel>
        </Box>
    );
};
