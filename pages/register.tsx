import { Button, TextField } from "@mui/material";
import { AlertDetails, AuthLayout, AlertBar, Title } from "components";
import { IsError, usePost } from "hooks";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { RegisterRequest, User } from "types";

import { RequestRegisterEndpoint } from "utilities/api";

const Register: NextPage = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [alert, setAlert] = useState<AlertDetails | null>(null);

  const {
    request: requestRegister,
    loading: registerLoading,
    payload: registerResult,
  } = usePost<RegisterRequest, User>(RequestRegisterEndpoint);

  useEffect(() => {
    if (IsError(registerResult)) {
      if (registerResult.error === "Undefined.") return;

      setAlert({
        message: registerResult.error,
        type: "error",
      });
    } else {
      setAlert({
        message: "Successfully registered! Please login.",
        type: "success",
      });
    }
  }, [registerResult]);

  async function TryAndRegister() {
    requestRegister({ name, email, password });
  }

  return (
    <AuthLayout loading={registerLoading}>
      {alert && (
        <AlertBar callback={() => setAlert(null)} details={alert}></AlertBar>
      )}
      <Title> Register </Title>
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
