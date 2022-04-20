import axios, { AxiosError, AxiosResponse } from 'axios';
import { IsError, Result } from 'common/hooks';
import { User } from 'common/types';
import { RequestLoginEndpoint } from 'common/utilities';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const httpClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL || 'http://localhost:8080',
});

export default NextAuth({
    providers: [
        CredentialsProvider({
            credentials: {},
            authorize: async (credentials: any) => {
                var res: Result<User> = await httpClient
                    .post(RequestLoginEndpoint, credentials)
                    .then((response: AxiosResponse<User>) => {
                        return {
                            data: response.data,
                        };
                    })
                    .catch((error: AxiosError) => {
                        return {
                            error: error.response?.data,
                        };
                    });

                if (IsError(res)) {
                    return null;
                }

                return res.data;
            },
        }),
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.uid = user.id;
            }
            return token;
        },
        session: async ({ session, token, user }) => {
            if (session?.user) {
                session.user.id = token.uid;
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
});
