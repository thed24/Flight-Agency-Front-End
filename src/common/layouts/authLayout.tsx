import { LoadingOverlay, NavBar, SC } from 'common/components';
import Head from 'next/head';
import React from 'react';

type LayoutProps = {
    children: React.ReactNode;
    loading?: boolean;
    title?: string;
};

export const AuthLayout = ({ title, children, loading }: LayoutProps) => (
    <>
        <Head>
            <title> {title}</title>
        </Head>
        <NavBar />
        <LoadingOverlay loading={loading} />
        <SC.Container>{children}</SC.Container>
    </>
);
