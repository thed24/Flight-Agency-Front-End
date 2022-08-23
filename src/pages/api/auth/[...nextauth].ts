import { AxiosResponse } from 'axios';
import { User } from 'common/types';
import { httpClient, RequestLoginEndpoint } from 'common/utilities';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            credentials: {},
            authorize: async (
                credentials: Record<never, string> | undefined
            ) => {
                const res: User | null = await httpClient
                    .post(RequestLoginEndpoint, credentials)
                    .then((response: AxiosResponse<User>) => response.data)
                    .catch(() => null);

                return res;
            },
        }),
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                return {
                    ...token,
                    uid: user.id,
                };
            }
            return token;
        },
        session: async ({ session, token }) => {
            if (session?.user) {
                return {
                    ...session,
                    user: {
                        ...session.user,
                        id: token.uid,
                    },
                };
            }
            return session;
        },
    },
    secret: 'SECRET_HERE',
    session: {
        strategy: 'jwt',
        maxAge: 1 * 24 * 60 * 60,
    },
    jwt: {
        secret: 'SECRET_HERE',
    },
};

export default NextAuth(authOptions);
