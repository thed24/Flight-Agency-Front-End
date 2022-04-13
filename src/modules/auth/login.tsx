import { TextField } from "@mui/material";
import { AlertDetails, AuthLayout, AlertBar, SC } from "common/components";
import { NextPage } from "next";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { PasswordInput } from "modules/auth/components";
import { Controller, useForm } from "react-hook-form";
import * as SSC from "./components/form.styles";

type FormData = {
  email: string;
  password: string;
};

const Login: NextPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();

  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertDetails | null>(null);

  const OnLogin = async ({ email, password }: FormData) => {
    setLoading(true);
    const response = await signIn<"credentials">("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: `${window.location.origin}`,
    });

    if (response && response.error) {
      setLoading(false);
      setAlert({ message: "Login failed.", type: "error" });
    } else {
      setLoading(false);
      window.location.href = "/";
    }
  };

  const OnCloseAlert = () => setAlert(null);

  return (
    <AuthLayout loading={loading}>
      {alert && <AlertBar callback={OnCloseAlert} details={alert} />}

      <SC.Title> Login </SC.Title>

      <SSC.FormContainer onSubmit={handleSubmit(OnLogin)}>
        <Controller
          name="email"
          render={({ field }) => (
            <TextField
              id="email"
              helperText={errors.email ? errors.email.message : null}
              label="email"
              value={field.value}
              onChange={field.onChange}
              error={errors.email ? true : false}
            />
          )}
          control={control}
          defaultValue=""
          rules={{
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email address",
            },
          }}
        />
        <Controller
          name="password"
          render={({ field }) => (
            <PasswordInput
              password={field.value}
              onPasswordChange={field.onChange}
            />
          )}
          control={control}
          rules={{
            required: true,
            minLength: {
              value: 4,
              message: "Minimum password length is 4 characters",
            },
          }}
        />
        <SSC.AuthButton type={"submit"} />
      </SSC.FormContainer>
    </AuthLayout>
  );
};

export default Login;
