import * as React from "react";

import { Entries, Stop } from "common/types";
import { Box, Tabs, Tab } from "@mui/material";
import { List, TabPanel } from "common/components";
import { useMemo } from "react";

export interface Props {
  stops: Stop[];
  route: google.maps.DirectionsRoute;
  day: number;
  handleDayChange: (event: React.SyntheticEvent, newValue: number) => void;
}

function propGenerator(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export function ScrollableLegs({ stops, route, day, handleDayChange }: Props) {
  var stopsPerDay = useMemo(() => {
    return stops.reduce<Record<string, Stop[]>>((acc, curr) => {
      const day = curr.time.start.getUTCDate();
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(curr);
      return acc;
    }, {});
  }, [stops]);

  var entries =
    (route &&
      route.legs.map((leg, i) => {
        const entry: Entries = [
          {
            header: `Stop ${i + 1}`,
            content: `${leg.start_address} to ${leg.end_address}`,
          },
          {
            header: "Duration",
            content: `${leg?.duration?.text}`,
          },
          {
            header: "Distance",
            content: `${leg?.distance?.text}`,
          },
        ];

        return entry;
      })) ??
    [];

  return (
    <Box sx={{ maxWidth: { xs: 280, sm: 480 }, bgcolor: "background.paper" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={day}
          onChange={handleDayChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="scrollable trip view"
        >
          {Object.entries(stopsPerDay).map(([day, trips], i) => (
            <Tab key={i} label={`Day ${i + 1}`} {...propGenerator(i)} />
          ))}
        </Tabs>
      </Box>

      <TabPanel key={day} value={day} index={day}>
        <List title={`Stops`} entries={entries} />
      </TabPanel>
    </Box>
  );
}
