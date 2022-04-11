import * as React from "react";

import { Trip } from "common/types";
import { Box, Tabs, Tab } from "@mui/material";
import { ConfirmationList } from "modules/createTrip/components";
import { TabPanel } from "common/components";

export interface Props {
  trips: Trip[];
}

function propGenerator(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export function ScrollableTrips({ trips }: Props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: "background.paper" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
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
              key={i}
              label={`${trip.destination}, ${trip.stops.length} Stops`}
              {...propGenerator(i)}
            />
          ))}
        </Tabs>
      </Box>

      {trips.map((trip, i) => (
        <TabPanel key={i} value={value} index={i}>
          <ConfirmationList key={i} trip={trip} />
        </TabPanel>
      ))}
    </Box>
  );
}
