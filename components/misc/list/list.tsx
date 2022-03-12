import { Box, Card, Typography } from "@mui/material";
import React from "react";
import { Entries } from "../../../types";
import style from "./list.module.css";

export type LayoutProps = {
  title: string;
  entries: Entries[];
};

export function List({ title, entries }: LayoutProps) {
  return (
    <div className={style.list}>
      <Typography gutterBottom variant="h4">
        {title}
      </Typography>
      {entries.map((entry, entryIndex) => (
        <Card className={style.entry} key={entryIndex}>
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
