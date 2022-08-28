import { AppBar, Box, Toolbar, Typography } from '@mui/material';
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
                await signOut({ redirect: false });
                router.push('/');
            };

            return (
                <Typography style={{ cursor: 'pointer' }} onClick={logOut}>
                    Log out, {session.user?.name}
                </Typography>
            );
        }

        return (
            <>
                <Link color="black" href="/auth/register" passHref>
                    <Typography style={{ cursor: 'pointer' }}>
                        Register
                    </Typography>
                </Link>
                &ensp;
                <Link color="black" href="/auth/login" passHref>
                    <Typography style={{ cursor: 'pointer' }}>Login</Typography>
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
                        sx={{ flexGrow: 1, fontWeight: 300 }}
                    >
                        <Link href={session ? '/profile' : '/'}>
                            Flight Agency
                        </Link>
                    </Typography>
                    {buttons}
                </Toolbar>
            </AppBar>
        </Box>
    );
};
