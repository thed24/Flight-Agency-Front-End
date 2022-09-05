import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { Button } from 'common/components';
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
                <Button color="info" variant="text" onClick={logOut}>
                    Log out, {session.user?.name}
                </Button>
            );
        }

        return (
            <>
                <Button
                    color="info"
                    variant="text"
                    onClick={() => router.push('auth/register')}
                >
                    Register
                </Button>
                &ensp;&ensp;
                <Button
                    color="info"
                    variant="text"
                    onClick={() => router.push('auth/login')}
                >
                    Log In
                </Button>
            </>
        );
    }, [router, session]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                sx={{
                    paddingLeft: 3,
                    paddingTop: 2,
                    marginBottom: -2,
                }}
                elevation={0}
                position="static"
                color="transparent"
            >
                <Toolbar>
                    <Typography
                        variant="h4"
                        sx={{
                            flexGrow: 1,
                            fontWeight: 500,
                        }}
                    >
                        <Link href={session ? '/profile' : '/'}>AGAI</Link>
                    </Typography>
                    {buttons}
                </Toolbar>
            </AppBar>
        </Box>
    );
};
