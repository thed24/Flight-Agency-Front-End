import * as React from "react";

import { Stop } from "common/types";
import { Box, Tabs, Tab } from "@mui/material";
import { List, TabPanel } from "common/components";
import { useMemo } from "react";

export interface Props {
  stops: Stop[];
  day: number;
  handleDayChange: (event: React.SyntheticEvent, newValue: number) => void;
}

function propGenerator(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export function ScrollableStops({ stops, day, handleDayChange }: Props) {
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

  return (
    <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: "background.paper" }}>
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

      {Object.entries(stopsPerDay).map(([currentDay, stopsForDay], i) => {
        const entries = stopsForDay.map((stop) => {
          return [
            {
              header: `${stop.name}`,
              content: `${stop.time.start.toLocaleTimeString()} to ${stop.time.end.toLocaleTimeString()}`,
            },
          ];
        });

        return (
          <TabPanel key={i} value={day} index={i}>
            <List title={`Stops`} entries={entries} />
          </TabPanel>
        );
      })}
    </Box>
  );
}
