import { Box, Typography } from "@mui/material";
import { SC } from "common/components";
import React from "react";
import { Entries } from "common/types";

export type LayoutProps = {
  title: string;
  entries: Entries[];
};

export function List({ title, entries }: LayoutProps) {
  return (
    <div style={{ height: "40vh", width: "60vh", overflowY: "scroll" }}>
      <SC.Title>{title}</SC.Title>
      {entries.map((entry, entryIndex) => (
        <div
          key={entryIndex}
          style={{ paddingBottom: "15px", marginRight: "15px" }}
        >
          {entry.map((subEntry, subEntryIndex) => (
            <Typography
              component={"div"}
              style={{ paddingBottom: "5px" }}
              key={subEntryIndex}
            >
              <Box fontWeight="fontWeightMedium" display="inline">
                {subEntry.header}:
              </Box>
              {subEntry.content}
            </Typography>
          ))}
        </div>
      ))}
    </div>
  );
}
