import { NextPage } from 'next';
import Login from 'modules/auth/login';

const LoginRedirect: NextPage = () => {
    // @ts-ignore
    return <Login />;
};

export default LoginRedirect;
