import { Button, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { AlertDetails, AuthLayout, AlertBar, SC } from "common/components";
import { NextPage } from "next";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { PasswordInput } from "modules/auth/components";

const Login: NextPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertDetails | null>(null);

  const OnLogin = async () => {
    setLoading(true);
    const response = await signIn<"credentials">("credentials", {
      email,
      password,
    });

    if (response && response.error) {
      setLoading(false);
      setAlert({ message: response.error, type: "error" });
    } else {
      window.location.href = "/";
    }
  };

  const OnEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const OnPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const OnCloseAlert = () => setAlert(null);

  return (
    <AuthLayout loading={loading}>
      {alert && <AlertBar callback={OnCloseAlert} details={alert} />}
      <SC.Title> Login </SC.Title>

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
