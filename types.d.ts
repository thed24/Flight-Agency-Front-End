import type { NextComponentType, NextPageContext } from 'next';
import type { Router } from 'next/router';
import type { DefaultUser, Session } from 'next-auth';

declare module 'next-auth' {
    // eslint-disable-next-line no-shadow
    interface Session {
        user?: DefaultUser & {
            id: string;
        };
    }
}

declare module 'next-auth/jwt/types' {
    interface JWT {
        uid: string;
    }
}

declare module 'google-map-react' {
    interface Props {
        children?: any;
    }
}

declare module 'next/app' {
    type AppProps<P = Record<string, unknown>> = {
        Component: NextComponentType<NextPageContext, any, P>;
        router: Router;
        __N_SSG?: boolean;
        __N_SSP?: boolean;
        pageProps: P & {
            /** Initial session passed in from `getServerSideProps` or `getInitialProps` */
            session?: Session;
        };
    };
}
