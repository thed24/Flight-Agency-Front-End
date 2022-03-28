import { Button, TextField } from "@mui/material";
import { AlertDetails, AuthLayout, AlertBar } from "components";
import { NextPage } from "next";
import { useState } from "react";
import { RegisterRequest, User } from "types";

import { SendData, RequestRegisterEndpoint } from "utilities/api";

const Register: NextPage = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [alert, setAlert] = useState<AlertDetails | null>(null);

  async function TryAndRegister() {
    if (!email || !password || !name) return;
    const response = await SendData<RegisterRequest, User>(
      RequestRegisterEndpoint,
      {
        name,
        email,
        password,
      }
    );

    if (response.data) {
      setAlert({
        message: "Successfully registered! Please login.",
        type: "success",
      });
    } else {
      setAlert({
        message: response.error ?? "The selected email was already registered.",
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
        id="outlined-basic"
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="User Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        onClick={TryAndRegister}
        disabled={!email || !password || !name}
        variant="contained"
      >
        Register!
      </Button>
    </AuthLayout>
  );
};

export default Register;
