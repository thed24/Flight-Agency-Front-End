import { Button, TextField } from "@mui/material";
import { AlertDetails, AuthLayout, AlertBar, Title } from "components";
import { usePost } from "hooks";
import { IsError, IsUnitializedError } from "hooks/interfaces";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { LoginRequest, User } from "types";
import { RequestLoginEndpoint, setInStorage } from "utilities";

const Login: NextPage = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [alert, setAlert] = useState<AlertDetails | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const {
    request: requestLogin,
    loading: loginLoading,
    payload: loginResult,
  } = usePost<LoginRequest, User>(RequestLoginEndpoint);

  useEffect(() => {
    if (loggedInUser) {
      setInStorage<User>("loggedInUser", loggedInUser);
      window.location.href = "/";
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (IsError(loginResult)) {
      if (IsUnitializedError(loginResult.error)) return;
      setAlert({ message: loginResult.error, type: "error" });
    } else {
      setLoggedInUser(loginResult.data);
    }
  }, [loginResult]);

  const OnLogin = () => {
    requestLogin({ email, password });
  };

  const OnEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const OnPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <AuthLayout loading={loginLoading}>
      {alert && (
        <AlertBar callback={() => setAlert(null)} details={alert}></AlertBar>
      )}
      <Title> Login </Title>
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        value={email}
        onChange={OnEmailChange}
      />
      <TextField
        id="outlined-basic"
        label="Password"
        variant="outlined"
        value={password}
        onChange={OnPasswordChange}
      />
      <Button
        onClick={OnLogin}
        disabled={!email || !password}
        variant="contained"
      >
        Login!
      </Button>
    </AuthLayout>
  );
};

export default Login;
