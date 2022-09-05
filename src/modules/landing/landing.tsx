import { Box, Grid, Stack, Typography } from '@mui/material';
import { Button, Layout } from 'common/components';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { useMemo, useState } from 'react';

import { LandingStepper } from './components/landingStepper';

const Landing: NextPage = () => {
    const [step, setStep] = useState(0);
    const router = useRouter();
    const { data: session } = useSession();

    const content = useMemo(() => {
        switch (step) {
            case 0:
                return [
                    <Typography
                        key={`${step}-text`}
                        fontSize={35}
                        fontWeight={300}
                    >
                        Find exciting places to visit on your trip, with
                        recommendations tailored for you.
                    </Typography>,
                    <Image
                        alt="Space imagery"
                        key={`${step}-image`}
                        src="/undraw_planet.svg"
                        style={{ float: 'right' }}
                        height={800}
                        width={800}
                    />,
                ];
            case 1:
                return [
                    <Typography
                        key={`${step}-text`}
                        fontSize={35}
                        fontWeight={300}
                    >
                        Add additional stops and configure your day to day
                        schedule.
                    </Typography>,
                    <Image
                        alt="Navigation imagery"
                        key={`${step}-image`}
                        src="/undraw_navigation.svg"
                        style={{ float: 'right' }}
                        height={800}
                        width={800}
                    />,
                ];
            case 2:
                return [
                    <Typography
                        key={`${step}-text`}
                        fontSize={35}
                        fontWeight={300}
                    >
                        Save and export your trip to your favorite calendar app!
                    </Typography>,
                    <Image
                        alt="Travel imagery"
                        key={`${step}-image`}
                        src="/undraw_travel.svg"
                        style={{ float: 'right' }}
                        height={800}
                        width={800}
                    />,
                ];
            default:
                return [
                    <Typography
                        key={`${step}-text`}
                        fontSize={35}
                        fontWeight={300}
                    >
                        Oops, something went wrong.
                    </Typography>,
                    <Typography
                        key={`${step}-image`}
                        fontSize={35}
                        fontWeight={300}
                    >
                        Please try again later.
                    </Typography>,
                ];
        }
    }, [step]);

    return (
        <Layout title="Home | Agai">
            <Grid container>
                <Grid
                    textAlign="left"
                    justifyContent="center"
                    marginLeft={30}
                    xs={3}
                >
                    <Typography fontSize={47} fontWeight={400}>
                        With Agai, planning your next trip has been so easy!
                    </Typography>

                    {content[0]}

                    <Stack width="85%" marginTop={5} gap={5} direction="row">
                        {session ? (
                            <>
                                <Button
                                    onClick={() => router.push('profile')}
                                    variant="contained"
                                    fullWidth
                                >
                                    Profile
                                </Button>
                                <Button
                                    onClick={async () => {
                                        await signOut({ redirect: false });
                                        router.push('/');
                                    }}
                                    fullWidth
                                >
                                    Sign Out
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    onClick={() => router.push('auth/login')}
                                    variant="contained"
                                    fullWidth
                                >
                                    Login
                                </Button>
                                <Button
                                    onClick={() => router.push('auth/register')}
                                    fullWidth
                                >
                                    Sign Up
                                </Button>
                            </>
                        )}
                    </Stack>
                </Grid>

                <Grid
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    marginTop="-60px"
                    xs
                >
                    {content[1]}
                </Grid>

                <Grid xs={12}>
                    <LandingStepper step={step} onClick={(x) => setStep(x)} />
                </Grid>
            </Grid>
        </Layout>
    );
};

export default Landing;
