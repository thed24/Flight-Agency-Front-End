import { Button, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import {
  AlertDetails,
  AuthLayout,
  AlertBar,
  Title,
  PasswordInput,
} from "components";
import { usePost } from "hooks";
import { IsError, IsUnitializedError } from "hooks/interfaces";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { LoginRequest, User } from "types";
import { RequestLoginEndpoint, setInStorage } from "utilities";

const Login: NextPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
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

      <FormControl sx={{ m: 1, width: "25ch", gap: "20px" }} variant="outlined">
        <InputLabel>Email</InputLabel>
        <OutlinedInput
          id="outlined-basic"
          label="Email"
          value={email}
          onChange={OnEmailChange}
        />
      </FormControl>

      <PasswordInput password={password} onPasswordChange={OnPasswordChange} />

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
