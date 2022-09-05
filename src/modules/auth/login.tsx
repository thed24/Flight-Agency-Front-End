import { TextField } from '@mui/material';
import {
    AlertBar,
    AlertDetails,
    Button,
    Layout,
    Title,
} from 'common/components';
import { PasswordInput } from 'modules/auth/components/passwordInput/passwordInput';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { FormContainer } from './components/form.styles';

type FormData = {
    Email: string;
    Password: string;
};

const Login: NextPage = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormData>();
    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(false);
    const [alert, setAlert] = useState<AlertDetails | null>(null);

    const OnLogin = async ({ Email, Password }: FormData) => {
        setLoading(true);
        const response = await signIn<'credentials'>('credentials', {
            redirect: false,
            Email: Email.toLocaleLowerCase(),
            Password,
            callbackUrl: `${window.location.origin}`,
        });

        if (response && response.ok) {
            router.push('/profile');
            setLoading(false);
        } else {
            setAlert({ message: 'Login failed.', type: 'error' });
            setLoading(false);
        }
    };

    const OnCloseAlert = () => setAlert(null);

    return (
        <Layout title="Login | Agai" loading={loading}>
            {alert && <AlertBar callback={OnCloseAlert} details={alert} />}

            <Title> Login </Title>

            <FormContainer onSubmit={handleSubmit(OnLogin)}>
                <Controller
                    name="Email"
                    render={({ field }) => (
                        <TextField
                            id="Email"
                            helperText={
                                errors.Email ? errors.Email.message : null
                            }
                            label="Email"
                            value={field.value}
                            onChange={field.onChange}
                            error={!!errors.Email}
                        />
                    )}
                    control={control}
                    defaultValue=""
                    rules={{
                        required: {
                            value: true,
                            message: 'Email is required.',
                        },
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: 'Invalid email address',
                        },
                    }}
                />
                <Controller
                    name="Password"
                    render={({ field }) => (
                        <PasswordInput
                            password={field.value}
                            onPasswordChange={field.onChange}
                            error={
                                errors.Password?.message
                                    ? errors.Password.message
                                    : null
                            }
                        />
                    )}
                    defaultValue=""
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: 'Password is required',
                        },
                        minLength: {
                            value: 4,
                            message: 'Minimum password length is 4',
                        },
                    }}
                />
                <Button type="submit"> Login </Button>
            </FormContainer>
        </Layout>
    );
};

export default Login;
