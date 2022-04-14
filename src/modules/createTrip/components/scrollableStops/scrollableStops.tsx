import * as React from "react";

import { Stop } from "common/types";
import { Box, Tabs, Tab } from "@mui/material";
import { List, TabPanel } from "common/components";

export interface Props {
  dayToStopsMap: Record<string, Stop[]>;
  index: number;
  setIndex: (index: number) => void;
}

function propGenerator(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export function ScrollableStops({ dayToStopsMap, index, setIndex }: Props) {
  const handleIndexChange = (
    event: React.ChangeEvent<{}>,
    newValue: number
  ) => {
    setIndex(newValue);
  };

  return (
    <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: "background.paper" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={index}
          onChange={handleIndexChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="scrollable trip view"
        >
          {Object.entries(dayToStopsMap).map(([day, stopsForDay], i) => (
            <Tab key={i} label={`Day ${day}`} {...propGenerator(i)} />
          ))}
        </Tabs>
      </Box>

      {Object.entries(dayToStopsMap).map(([day, stopsForDay], i) => {
        const entries = stopsForDay.map((stop) => {
          return [
            {
              header: `${stop.name}`,
              content: `${stop.time.start.toLocaleTimeString()} to ${stop.time.end.toLocaleTimeString()}`,
            },
          ];
        });

        return (
          <TabPanel key={i} value={index} index={i}>
            <List
              title={`Stops for ${
                stopsForDay[0].time.start
                  .toLocaleTimeString([], {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })
                  .split(",")[0]
              }`}
              entries={entries}
            />
          </TabPanel>
        );
      })}
    </Box>
  );
}
