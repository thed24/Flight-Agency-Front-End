import { Button, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import {
  AlertDetails,
  AuthLayout,
  AlertBar,
  Title,
  PasswordInput,
} from "common/components";
import { IsError, IsUnitializedError, usePost } from "common/hooks";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { RegisterRequest, User } from "common/types";
import { RequestRegisterEndpoint } from "common/utilities";

const Register: NextPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [alert, setAlert] = useState<AlertDetails | null>(null);

  const {
    request: requestRegister,
    loading: registerLoading,
    payload: registerResult,
  } = usePost<RegisterRequest, User>(RequestRegisterEndpoint);

  useEffect(() => {
    if (IsError(registerResult)) {
      if (IsUnitializedError(registerResult.error)) return;
      setAlert({ message: registerResult.error, type: "error" });
    } else {
      setAlert({
        message: "Successfully registered! Please login.",
        type: "success",
      });
    }
  }, [registerResult]);

  const OnRegister = () => {
    requestRegister({ name, email, password });
  };

  const OnEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const OnPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const OnNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <AuthLayout loading={registerLoading}>
      {alert && <AlertBar callback={() => setAlert(null)} details={alert} />}
      <Title> Register </Title>

      <FormControl sx={{ m: 1, width: "25ch", gap: "20px" }} variant="outlined">
        <InputLabel>Email</InputLabel>
        <OutlinedInput
          id="outlined-basic"
          label="Email"
          value={email}
          onChange={OnEmailChange}
        />
      </FormControl>

      <FormControl sx={{ m: 1, width: "25ch", gap: "20px" }} variant="outlined">
        <InputLabel>User Name</InputLabel>
        <OutlinedInput
          id="outlined-basic"
          label="User Name"
          value={name}
          onChange={OnNameChange}
        />
      </FormControl>

      <PasswordInput password={password} onPasswordChange={OnPasswordChange} />

      <Button
        onClick={OnRegister}
        disabled={!email || !password || !name}
        variant="contained"
      >
        Register!
      </Button>
    </AuthLayout>
  );
};

export default Register;
