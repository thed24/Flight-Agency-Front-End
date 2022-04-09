import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export function NavBar() {
  const { data: session } = useSession();

  const logOut = () => {
    signOut();
  };

  const buttons = React.useMemo(
    () =>
      session ? (
        <>
          <Button onClick={logOut} color="inherit">
            Log Out, {session.user?.name}
          </Button>
        </>
      ) : (
        <>
          <Button color="inherit">
            <Link href={"/register"}>Register</Link>
          </Button>
          <Button color="inherit">
            <Link href={"/login"}>Login</Link>
          </Button>
        </>
      ),
    [session]
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
