import style from "./layout.module.css";

import { Typography } from "@mui/material";
import React from "react";
import { User } from "../../types/models";
import { getFromStorage } from "../../utilities/storage";
import NavBar from "../navbar/navbar";

export type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const loggedInUser = getFromStorage<User>("loggedInUser");

  const authMessage = (
    <div className={style.container}>
      <Typography variant="h4"> Welcome to the Flight Agency </Typography>

      <Typography variant="subtitle1" style={{ paddingBottom: "20px" }}>
        Please login or register to continue
      </Typography>
    </div>
  );

  return (
    <>
      <NavBar />
      {loggedInUser ? children : authMessage}
    </>
  );
}
