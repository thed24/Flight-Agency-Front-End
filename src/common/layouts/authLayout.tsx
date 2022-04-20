import React from 'react';
import { SC, LoadingOverlay, NavBar } from 'common/components';
import Head from 'next/head';

export type LayoutProps = {
    children: React.ReactNode;
    loading?: boolean;
    title?: string;
};

export function AuthLayout({ title, children, loading }: LayoutProps) {
    return (
        <>
            <Head>
                <title> {title}</title>
            </Head>
            <NavBar />
            <LoadingOverlay loading={loading} />
            <SC.Container>{children}</SC.Container>
        </>
    );
}
