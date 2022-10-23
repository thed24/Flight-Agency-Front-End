import { LoadingOverlay, NavBar } from 'common/components';
import { useUser } from 'common/context';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

type LayoutProps = {
    children: React.ReactNode;
    loading?: boolean;
    title?: string;
};

const guestPaths = ['/authorization/login', '/authorization/register', '/'];

export const Layout = ({ title, children, loading }: LayoutProps) => {
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (guestPaths.includes(router.pathname) && user) {
            router.push('/');
        }
    }, [user]);

    if (loading) {
        return <LoadingOverlay loading={loading} />;
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
