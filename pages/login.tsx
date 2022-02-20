import { Button, TextField } from "@mui/material";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import AlertBar, { AlertDetails } from "../components/alertBar/alertBar";
import AuthLayout from "../components/authLayout/authLayout";
import style from "../styles/auth.module.css";
import { RequestLogin } from "../utilities/api";
import { setInStorage } from "../utilities/storage";
import { User } from "../types/models";

const Login: NextPage = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [alert, setAlert] = useState<AlertDetails | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  useEffect(() => {
    if (loggedInUser) {
      setInStorage<User>("loggedInUser", loggedInUser);
      window.location.href = "/";
    }
  }, [loggedInUser]);

  async function TryAndLogin() {
    if (!email || !password) return;
    const response = await RequestLogin({ email, password });

    if (response) {
      setLoggedInUser(response);
    } else {
      setAlert({
        message: "Invalid email or password",
        type: "error",
      });
    }
  }

  return (
    <AuthLayout>
      {alert && (
        <AlertBar callback={() => setAlert(null)} details={alert}></AlertBar>
      )}
      <h1> Login </h1>
      <TextField
        className={style.authControl}
        id="outlined-basic"
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        className={style.authControl}
        id="outlined-basic"
        label="Password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        onClick={TryAndLogin}
        disabled={!email || !password}
        className={style.authControl}
        variant="contained"
      >
        Login!
      </Button>
    </AuthLayout>
  );
};

export default Login;
