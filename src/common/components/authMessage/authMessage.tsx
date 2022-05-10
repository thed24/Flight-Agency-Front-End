import { SC } from 'common/components';
import { signIn } from 'next-auth/react';

export const AuthMessage = () => {
    const handleSignIn = async () => {
        await signIn('google');
    };

    return (
        <SC.Container>
            <SC.Title> Welcome to the Flight Agency </SC.Title>
            <SC.SubTitle onClick={handleSignIn}>
                Please login or register to continue
            </SC.SubTitle>
        </SC.Container>
    );
};
