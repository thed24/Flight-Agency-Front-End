import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import { User } from "../../types/models";
import { clearItemInStorage, getFromStorage } from "../../utilities/storage";

const logOut = () => {
  clearItemInStorage("loggedInUser");
  window.location.href = "/";
};

export default function NavBar() {
  const loggedInUser = getFromStorage<User>("loggedInUser");

  const buttons = loggedInUser ? (
    <>
      <Button onClick={logOut} color="inherit">
        Log Out, {loggedInUser.name}
      </Button>
    </>
  ) : (
    <>
      {" "}
      <Button color="inherit">
        <Link href={"/register"}>Register</Link>
      </Button>
      <Button color="inherit">
        <Link href={"/login"}>Login</Link>
      </Button>
    </>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href={"/"}>Flight Agency </Link>
          </Typography>
          {buttons}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
