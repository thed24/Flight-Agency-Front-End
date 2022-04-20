import { NextPage } from 'next';
import Register from 'modules/auth/register';

const RegisterRedirect: NextPage = () => {
    // @ts-ignore
    return <Register />;
};

export default RegisterRedirect;
