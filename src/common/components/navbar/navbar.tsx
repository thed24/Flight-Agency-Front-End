import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { Button } from 'common/components';
import { useUser } from 'common/context';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

export const NavBar = () => {
    const { user, logout } = useUser();
    const router = useRouter();

    const buttons = useMemo(() => {
        if (user) {
            const logOut = async () => {
                logout();
                router.push('/');
            };

            return (
                <Button color="info" variant="text" onClick={logOut}>
                    Log out, {user?.name}
                </Button>
            );
        }

        return (
            <>
                <Button
                    color="info"
                    variant="text"
                    onClick={() => router.push('/authorization/register')}
                >
                    Register
                </Button>
                &ensp;&ensp;
                <Button
                    color="info"
                    variant="text"
                    onClick={() => router.push('/authorization/login')}
                >
                    Log In
                </Button>
            </>
        );
    }, [user, logout]);

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
                        <Link href={user ? '/profile' : '/'}>AGAI</Link>
                    </Typography>
                    {buttons}
                </Toolbar>
            </AppBar>
        </Box>
    );
};
