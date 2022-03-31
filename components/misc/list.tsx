import { Box, Card, Typography } from "@mui/material";
import React from "react";
import { Entries } from "types";

export type LayoutProps = {
  title: string;
  entries: Entries[];
};

export function List({ title, entries }: LayoutProps) {
  return (
    <div>
      <Typography gutterBottom variant="h4">
        {title}
      </Typography>
      {entries.map((entry, entryIndex) => (
        <Card key={entryIndex}>
          {entry.map((subEntry, subEntryIndex) => (
            <Typography
              component={"div"}
              style={{ paddingBottom: "5px" }}
              key={subEntryIndex}
            >
              <Box fontWeight="fontWeightMedium" display="inline">
                {subEntry.header}:
              </Box>{" "}
              {subEntry.content}
            </Typography>
          ))}
        </Card>
      ))}
    </div>
  );
}
