import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { useMemo } from 'react';

export const NavBar = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const logOut = async () => {
        const redirectUrl = await signOut({
            redirect: false,
            callbackUrl: '/',
        });
        router.push(redirectUrl.url);
    };

    const buttons = useMemo(
        () =>
            session ? (
                <Button onClick={logOut} color="inherit">
                    Log Out, {session.user?.name}
                </Button>
            ) : (
                <>
                    <Button color="inherit">
                        <Link href="/auth/register">Register</Link>
                    </Button>
                    <Button color="inherit">
                        <Link href="/auth/login">Login</Link>
                    </Button>
                </>
            ),
        [session]
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        <Link href="/">Flight Agency </Link>
                    </Typography>
                    {buttons}
                </Toolbar>
            </AppBar>
        </Box>
    );
};
