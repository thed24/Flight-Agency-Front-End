import * as React from "react";

import { Entries, Stop } from "common/types";
import { Box, Tabs, Tab } from "@mui/material";
import { List, TabPanel } from "common/components";

export interface Props {
  dayToStopsMap: Record<string, Stop[]>;
  index: number;
  setIndex: (index: number) => void;
  entries: Entries[];
}

function propGenerator(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export function ScrollableStops({
  dayToStopsMap,
  index,
  setIndex,
  entries,
}: Props) {
  const handleIndexChange = (
    event: React.ChangeEvent<{}>,
    newValue: number
  ) => {
    setIndex(newValue);
  };

  const stopsForCurrentDay = Object.values(dayToStopsMap)[index];

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
            <Tab
              key={i}
              label={`Day ${parseInt(day) + 1}`}
              {...propGenerator(i)}
            />
          ))}
        </Tabs>
      </Box>

      <TabPanel key={index} value={index} index={index}>
        <List
          title={`Stops for ${
            stopsForCurrentDay[0].time.start
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
    </Box>
  );
}
