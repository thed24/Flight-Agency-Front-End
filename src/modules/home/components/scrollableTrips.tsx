import { Box, Tab, Tabs } from '@mui/material';
import { TabPanel } from 'common/components';
import { Trip } from 'common/types';
import { ConfirmationList } from 'modules/createTrip/components';
import * as React from 'react';

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
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}
        >
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
                    <ConfirmationList key={trip.id} trip={trip} />
                </TabPanel>
            ))}
        </Box>
    );
};
