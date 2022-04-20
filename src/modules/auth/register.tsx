import { TextField } from '@mui/material';
import { AlertDetails, AuthLayout, AlertBar, SC } from 'common/components';
import { IsError, IsUnitializedError, usePost } from 'common/hooks';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { RegisterRequest, User } from 'common/types';
import { RequestRegisterEndpoint } from 'common/utilities';
import { PasswordInput } from 'modules/auth/components';
import * as SSC from './components/form.styles';
import { Controller, useForm } from 'react-hook-form';

type FormData = {
    Name: string;
    Email: string;
    Password: string;
};

const Register: NextPage = () => {
    const [alert, setAlert] = useState<AlertDetails | null>(null);

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormData>();

    const {
        request: requestRegister,
        loading: registerLoading,
        payload: registerResult,
    } = usePost<RegisterRequest, User>(RequestRegisterEndpoint);

    useEffect(() => {
        if (IsError(registerResult)) {
            if (IsUnitializedError(registerResult.error)) return;
            setAlert({ message: registerResult.error, type: 'error' });
        } else {
            setAlert({
                message: 'Successfully registered! Please login.',
                type: 'success',
            });
        }
    }, [registerResult]);

    const OnRegister = async ({ Name, Email, Password }: FormData) =>
        requestRegister({ Name, Email, Password });

    const OnCloseAlert = () => setAlert(null);

    return (
        <AuthLayout
            title={'Register | Flight Agency'}
            loading={registerLoading}
        >
            {alert && <AlertBar callback={OnCloseAlert} details={alert} />}
            <SC.Title> Register </SC.Title>

            <SSC.FormContainer onSubmit={handleSubmit(OnRegister)}>
                <Controller
                    name="Name"
                    render={({ field }) => (
                        <TextField
                            id="Name"
                            helperText={
                                errors.Email ? errors.Email.message : null
                            }
                            label="Name"
                            value={field.value}
                            onChange={field.onChange}
                            error={errors.Email ? true : false}
                        />
                    )}
                    control={control}
                    defaultValue=""
                    rules={{
                        required: true,
                    }}
                />
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
                            error={errors.Email ? true : false}
                        />
                    )}
                    control={control}
                    defaultValue=""
                    rules={{
                        required: true,
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
                        />
                    )}
                    control={control}
                    rules={{ required: true, minLength: 4 }}
                />
                <SSC.AuthButton type={'submit'} />
            </SSC.FormContainer>
        </AuthLayout>
    );
};

export default Register;
