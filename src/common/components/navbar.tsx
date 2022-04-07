import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export function NavBar() {
  const { data: session } = useSession();

  const handleSignIn = async () => {
    await signIn("google");
  };

  const logOut = () => {
    signOut();
    window.location.href = "/";
  };

  const buttons = session ? (
    <>
      <Button onClick={logOut} color="inherit">
        Log Out, {session.user?.name}
      </Button>
    </>
  ) : (
    <>
      <Button onClick={handleSignIn} color="inherit">
        Register
      </Button>
      <Button onClick={handleSignIn} color="inherit">
        Login
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
