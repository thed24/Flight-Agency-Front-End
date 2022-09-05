import { MiddleContainer, SubTitle, Title } from 'common/components';
import { signIn } from 'next-auth/react';

export const AuthMessage = () => {
    const handleSignIn = async () => {
        await signIn('google');
    };

    return (
        <MiddleContainer>
            <Title> Welcome to the Flight Agency </Title>
            <SubTitle onClick={handleSignIn}>
                Please login or register to gain access to our fully featured
                holiday planning platform!
            </SubTitle>
        </MiddleContainer>
    );
};
