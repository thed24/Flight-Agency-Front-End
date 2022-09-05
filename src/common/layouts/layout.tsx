import { LoadingOverlay, NavBar } from 'common/components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import React, { useEffect, useMemo } from 'react';

type LayoutProps = {
    children: React.ReactNode;
    loading?: boolean;
    title?: string;
};

const guestPaths = ['/auth/login', '/auth/register', '/'];

export const Layout = ({ title, children, loading }: LayoutProps) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const isLoading = useMemo(
        () => loading || status === 'loading',
        [loading, status]
    );

    useEffect(() => {
        if (session && guestPaths.includes(router.pathname)) {
            router.push('/');
        }
    }, [router, session]);

    if (isLoading) {
        return <LoadingOverlay loading={isLoading} />;
    }

    return (
        <>
            <Head>
                <title> {title} </title>
            </Head>
            <main>
                <NavBar />
                {children}
            </main>
        </>
    );
};
