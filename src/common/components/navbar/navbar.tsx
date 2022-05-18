import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { useMemo } from 'react';

export const NavBar = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const buttons = useMemo(() => {
        if (session) {
            const logOut = async () => {
                const redirectUrl = await signOut({
                    redirect: false,
                    callbackUrl: '/',
                });
                router.push(redirectUrl.url);
            };

            return (
                <Typography onClick={logOut}>
                    Log Out, {session.user?.name}
                </Typography>
            );
        }

        return (
            <>
                <Link color="black" href="/auth/register">
                    Register
                </Link>
                <Link color="black" href="/auth/login">
                    Login
                </Link>
            </>
        );
    }, [router, session]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h5"
                        sx={{ flexGrow: 1, fontWeight: 100 }}
                    >
                        <Link href="/">Flight Agency </Link>
                    </Typography>
                    {buttons}
                </Toolbar>
            </AppBar>
        </Box>
    );
};
