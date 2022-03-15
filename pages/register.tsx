import { Button, TextField } from "@mui/material";
import type { NextPage } from "next";
import { useState } from "react";
import { AlertBar, AlertDetails } from "../components/";
import { AuthLayout } from "../components/";
import style from "../styles/auth.module.css";
import { RequestRegister } from "../utilities/api";

const Register: NextPage = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [alert, setAlert] = useState<AlertDetails | null>(null);

  async function TryAndRegister() {
    if (!email || !password || !name) return;
    const response = await RequestRegister({ email, password, name });

    if (response) {
      setAlert({
        message: "Successfully registered! Please login.",
        type: "success",
      });
    } else {
      setAlert({
        message: "The selected email was already registered.",
        type: "error",
      });
    }
  }

  return (
    <AuthLayout>
      {alert && (
        <AlertBar callback={() => setAlert(null)} details={alert}></AlertBar>
      )}
      <h1> Register</h1>
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
        label="User Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
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
        onClick={TryAndRegister}
        disabled={!email || !password || !name}
        className={style.authControl}
        variant="contained"
      >
        Register!
      </Button>
    </AuthLayout>
  );
};

export default Register;
